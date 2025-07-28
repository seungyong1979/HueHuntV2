const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Database setup
const dbPath = process.env.NODE_ENV === 'production' 
  ? '/tmp/rankings.db' 
  : path.join(__dirname, 'rankings.db');

const db = new sqlite3.Database(dbPath);

// Create rankings table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS rankings (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    score INTEGER NOT NULL,
    level INTEGER NOT NULL,
    timestamp INTEGER NOT NULL,
    device TEXT,
    date TEXT NOT NULL
  )`);
  
  // Create index for better performance
  db.run(`CREATE INDEX IF NOT EXISTS idx_date_score ON rankings (date, score DESC)`);
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"]
    }
  }
}));
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// Helper function to get KST date
function getKSTDate() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const kst = new Date(utc + (9 * 3600000));
  return kst.toISOString().split('T')[0];
}

// Clean old records (keep only last 3 days)
function cleanOldRecords() {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  const cutoffDate = threeDaysAgo.toISOString().split('T')[0];
  
  db.run(`DELETE FROM rankings WHERE date < ?`, [cutoffDate], (err) => {
    if (err) {
      console.error('Error cleaning old records:', err);
    } else {
      console.log('Old records cleaned');
    }
  });
}

// Clean old records on startup and every hour
cleanOldRecords();
setInterval(cleanOldRecords, 60 * 60 * 1000);

// API Routes

// Get today's rankings
app.get('/api/rankings', (req, res) => {
  const today = getKSTDate();
  
  db.all(
    `SELECT * FROM rankings 
     WHERE date = ? 
     ORDER BY score DESC, level DESC, timestamp ASC 
     LIMIT 100`,
    [today],
    (err, rows) => {
      if (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      
      res.json({
        success: true,
        rankings: rows,
        total: rows.length,
        date: today
      });
    }
  );
});

// Save new score
app.post('/api/rankings', (req, res) => {
  const { name, score, level, device } = req.body;
  
  // Validation
  if (!name || typeof score !== 'number' || typeof level !== 'number') {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid data: name, score, and level are required' 
    });
  }
  
  if (name.length > 10 || name.length < 1) {
    return res.status(400).json({ 
      success: false, 
      error: 'Name must be 1-10 characters' 
    });
  }
  
  if (score < 0 || score > 100000 || level < 1 || level > 1000) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid score or level range' 
    });
  }
  
  const today = getKSTDate();
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  const timestamp = Date.now();
  
  db.run(
    `INSERT INTO rankings (id, name, score, level, timestamp, device, date) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, name, score, level, timestamp, device || 'Unknown', today],
    function(err) {
      if (err) {
        console.error('Database insert error:', err);
        res.status(500).json({ 
          success: false, 
          error: 'Failed to save score' 
        });
        return;
      }
      
      // Get rank
      db.get(
        `SELECT COUNT(*) + 1 as rank FROM rankings 
         WHERE date = ? AND (
           score > ? OR 
           (score = ? AND level > ?) OR 
           (score = ? AND level = ? AND timestamp < ?)
         )`,
        [today, score, score, level, score, level, timestamp],
        (err, row) => {
          if (err) {
            console.error('Rank calculation error:', err);
            res.status(500).json({ 
              success: false, 
              error: 'Failed to calculate rank' 
            });
            return;
          }
          
          res.json({
            success: true,
            rank: row.rank,
            id: id,
            message: 'Score saved successfully'
          });
        }
      );
    }
  );
});

// Get rankings stats
app.get('/api/stats', (req, res) => {
  const today = getKSTDate();
  
  db.all(
    `SELECT 
       COUNT(*) as total_players,
       MAX(score) as highest_score,
       MAX(level) as highest_level,
       AVG(score) as average_score
     FROM rankings 
     WHERE date = ?`,
    [today],
    (err, rows) => {
      if (err) {
        console.error('Stats error:', err);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      
      res.json({
        success: true,
        stats: rows[0],
        date: today
      });
    }
  );
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    date: getKSTDate()
  });
});

// Serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.status(404).json({ error: 'API endpoint not found' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎮 Hue Hunt v2 server running on port ${PORT}`);
  console.log(`📊 Database: ${dbPath}`);
  console.log(`🌏 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📅 Current KST date: ${getKSTDate()}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});