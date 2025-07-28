// API Configuration
const API_BASE_URL = window.location.origin;
let isServerAvailable = false;

// Check server availability
async function checkServerConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        const data = await response.json();
        isServerAvailable = data.success;
        console.log('Server connection:', isServerAvailable ? 'Connected' : 'Failed');
        return isServerAvailable;
    } catch (error) {
        console.log('Server not available, using localStorage fallback');
        isServerAvailable = false;
        return false;
    }
}

// Initialize server connection check
checkServerConnection();

const translations = {
    ko: {
        subtitle: "색상 구분 마스터링 게임",
        "select-language": "언어를 선택하세요",
        "start-game": "게임 시작",
        "enter-name": "플레이어 이름을 입력하세요",
        "name-placeholder": "이름을 입력하세요",
        "start": "시작하기",
        "score": "점수",
        "level": "레벨",
        "time": "시간",
        "seconds": "초",
        "instruction": "다른 색상의 사각형을 찾아 클릭하세요!",
        "restart": "다시 시작",
        "game-over": "게임 종료!",
        "result-suffix": "님의 결과",
        "final-score": "최종 점수",
        "final-level": "도달 레벨",
        "today-rank": "오늘 순위",
        "rank-suffix": "위",
        "play-again": "다시 플레이",
        "view-ranking": "순위표 보기",
        "ranking-title": "오늘의 전세계 순위표",
        "status-online": "전세계 순위표 연결됨",
        "status-offline": "오프라인 (로컬 순위표)",
        "status-local": "로컬 순위표만 사용 가능",
        "close": "닫기",
        "no-records": "아직 기록이 없습니다.",
        "enter-name-alert": "이름을 입력해주세요!",
        "name-length-alert": "이름은 10자 이하로 입력해주세요!",
        "reset-notice": "순위는 한국 시간으로 00:00 리셋 됩니다.",
        "name-help": "동일한 이름이 있을 수 있습니다. 10자까지 가능합니다.",
        "games-left": "남은 게임",
        "limit-reached-title": "일일 게임 한도 도달!",
        "limit-reached-message": "오늘 10게임을 모두 플레이했습니다.",
        "watch-ad-message": "광고를 시청하면 10게임을 더 플레이할 수 있습니다!",
        "ad-title": "광고 영상",
        "ad-timer-text": "남은 시간: ",
        "ad-skip-info": "광고를 끝까지 시청해주세요",
        "watch-ad": "광고 시청하기",
        "maybe-later": "나중에",
        "how-to-play": "게임 방법",
        "tutorial-title": "게임 방법",
        "basic-rules": "기본 규칙",
        "rule-1": "그리드에서 다른 색상의 사각형을 찾아 클릭하세요",
        "rule-2": "30초 안에 최대한 많은 레벨을 달성하세요",
        "rule-3": "틀리면 시간이 3초 감소합니다",
        "rule-4": "레벨이 올라갈수록 더 어려워집니다",
        "scoring-system": "점수 시스템",
        "score-1": "기본 점수: 레벨 × 10점",
        "score-2": "예: 레벨 5에서 정답 시 50점",
        "combo-system": "콤보 시스템",
        "combo-1": "연속으로 정답을 맞히면 콤보가 증가합니다",
        "combo-2": "콤보 보너스: 기본점수 × (콤보-1) × 0.5",
        "combo-3": "예: 3콤보 시 기본점수 + 추가 보너스점수",
        "combo-4": "틀리거나 3초간 대기하면 콤보가 리셋됩니다",
        "daily-limit": "일일 제한",
        "limit-1": "하루에 10게임까지 플레이 가능",
        "limit-2": "광고 시청으로 10게임 추가 획득",
        "limit-3": "매일 자정(KST)에 리셋됩니다",
        "example": "예시",
        "demo-instruction": "위 예시에서 오른쪽 위의 다른 색상을 클릭하세요!",
        "start-playing": "게임 시작하기",
        "level-instruction": (level, gridSize) => `레벨 ${level}: ${gridSize}x${gridSize} 그리드에서 다른 색상을 찾으세요!`
    },
    en: {
        subtitle: "Color Discrimination Mastering Game",
        "select-language": "Select Language",
        "start-game": "Start Game",
        "enter-name": "Enter Your Name",
        "name-placeholder": "Enter your name",
        "start": "Start",
        "score": "Score",
        "level": "Level",
        "time": "Time",
        "seconds": "s",
        "instruction": "Find and click the different colored square!",
        "restart": "Restart",
        "game-over": "Game Over!",
        "result-suffix": "'s Result",
        "final-score": "Final Score",
        "final-level": "Reached Level",
        "today-rank": "Today's Rank",
        "rank-suffix": "",
        "play-again": "Play Again",
        "view-ranking": "View Ranking",
        "ranking-title": "Today's Global Ranking",
        "status-online": "Global rankings connected",
        "status-offline": "Offline (Local rankings)",
        "status-local": "Local rankings only",
        "close": "Close",
        "no-records": "No records yet.",
        "enter-name-alert": "Please enter your name!",
        "name-length-alert": "Name must be 10 characters or less!",
        "reset-notice": "Rankings reset at 00:00 KST daily.",
        "name-help": "Duplicate names are allowed. Up to 10 characters.",
        "games-left": "Games Left",
        "limit-reached-title": "Daily Game Limit Reached!",
        "limit-reached-message": "You've played all 10 games today.",
        "watch-ad-message": "Watch an ad to get 10 more games!",
        "ad-title": "Advertisement",
        "ad-timer-text": "Time left: ",
        "ad-skip-info": "Please watch the ad until the end",
        "watch-ad": "Watch Ad",
        "maybe-later": "Maybe Later",
        "how-to-play": "How to Play",
        "tutorial-title": "How to Play",
        "basic-rules": "Basic Rules",
        "rule-1": "Find and click the different colored square in the grid",
        "rule-2": "Achieve as many levels as possible within 30 seconds",
        "rule-3": "Wrong answers reduce time by 3 seconds",
        "rule-4": "Difficulty increases as levels progress",
        "scoring-system": "Scoring System",
        "score-1": "Base score: Level × 10 points",
        "score-2": "Example: 50 points for correct answer at level 5",
        "combo-system": "Combo System",
        "combo-1": "Consecutive correct answers increase combo count",
        "combo-2": "Combo bonus: Base score × (Combo-1) × 0.5",
        "combo-3": "Example: 3-combo gives base score + additional bonus",
        "combo-4": "Combo resets on wrong answer or 3-second delay",
        "daily-limit": "Daily Limit",
        "limit-1": "Play up to 10 games per day",
        "limit-2": "Watch ads to get 10 additional games",
        "limit-3": "Resets daily at midnight KST",
        "example": "Example",
        "demo-instruction": "Click the different colored square in the top right!",
        "start-playing": "Start Playing",
        "level-instruction": (level, gridSize) => `Level ${level}: Find the different color in ${gridSize}x${gridSize} grid!`
    }
};

class LanguageManager {
    constructor() {
        this.currentLanguage = 'ko';
        this.translations = translations;
    }
    
    setLanguage(lang) {
        this.currentLanguage = lang;
        this.updateAllTexts();
    }
    
    getText(key, ...args) {
        const text = this.translations[this.currentLanguage][key];
        if (typeof text === 'function') {
            return text(...args);
        }
        return text || key;
    }
    
    updateAllTexts() {
        document.querySelectorAll('[data-text]').forEach(element => {
            const key = element.getAttribute('data-text');
            element.textContent = this.getText(key);
        });
        
        document.querySelectorAll('[data-placeholder]').forEach(element => {
            const key = element.getAttribute('data-placeholder');
            element.placeholder = this.getText(key);
        });
    }
}

class GameLimitManager {
    constructor() {
        this.GAMES_KEY = 'hueHuntGamesPlayed';
        this.DATE_KEY = 'hueHuntGameDate';
        this.DAILY_LIMIT = 10;
    }
    
    getKSTDate() {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const kst = new Date(utc + (9 * 3600000));
        return kst.toISOString().split('T')[0];
    }
    
    checkAndResetDaily() {
        const today = this.getKSTDate();
        const lastDate = localStorage.getItem(this.DATE_KEY);
        
        if (lastDate !== today) {
            localStorage.setItem(this.GAMES_KEY, '0');
            localStorage.setItem(this.DATE_KEY, today);
        }
    }
    
    getGamesPlayed() {
        this.checkAndResetDaily();
        return parseInt(localStorage.getItem(this.GAMES_KEY) || '0');
    }
    
    getRemainingGames() {
        return Math.max(0, this.DAILY_LIMIT - this.getGamesPlayed());
    }
    
    canPlayGame() {
        return this.getRemainingGames() > 0;
    }
    
    recordGamePlayed() {
        if (this.canPlayGame()) {
            const currentGames = this.getGamesPlayed();
            localStorage.setItem(this.GAMES_KEY, (currentGames + 1).toString());
            return true;
        }
        return false;
    }
    
    resetDailyLimit() {
        localStorage.setItem(this.GAMES_KEY, '0');
    }
}

class GlobalRankingManager {
    constructor() {
        this.STORAGE_KEY = 'hueHuntRankings_v2';
        this.DATE_KEY = 'hueHuntDate_v2';
        this.isOnline = navigator.onLine;
        
        // Listen for online/offline events
        window.addEventListener('online', () => {
            this.isOnline = true;
            checkServerConnection();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }
    
    async saveScore(playerName, score, level) {
        const newRecord = {
            name: playerName,
            score: score,
            level: level,
            device: this.getDeviceInfo()
        };
        
        // Try to save to server first
        if (isServerAvailable && this.isOnline) {
            try {
                const response = await fetch(`${API_BASE_URL}/api/rankings`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newRecord)
                });
                
                const data = await response.json();
                
                if (data.success) {
                    console.log('Score saved to server successfully');
                    return data.rank;
                } else {
                    throw new Error(data.error || 'Server save failed');
                }
            } catch (error) {
                console.log('Server save failed, using local storage:', error.message);
                return this.saveToLocal(newRecord);
            }
        } else {
            // Fallback to local storage
            return this.saveToLocal(newRecord);
        }
    }
    
    saveToLocal(newRecord) {
        newRecord.id = this.generateUniqueId();
        newRecord.timestamp = new Date().getTime();
        
        const rankings = this.getLocalRankings();
        rankings.push(newRecord);
        
        rankings.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (b.level !== a.level) return b.level - a.level;
            return a.timestamp - b.timestamp;
        });
        
        if (rankings.length > 100) {
            rankings.splice(100);
        }
        
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(rankings));
        return rankings.findIndex(r => r.id === newRecord.id) + 1;
    }
    
    async getRankings() {
        // Try to get from server first
        if (isServerAvailable && this.isOnline) {
            try {
                const response = await fetch(`${API_BASE_URL}/api/rankings`);
                const data = await response.json();
                
                if (data.success && data.rankings) {
                    console.log(`Loaded ${data.rankings.length} rankings from server`);
                    return data.rankings;
                }
            } catch (error) {
                console.log('Server fetch failed, using local storage:', error.message);
            }
        }
        
        // Fallback to local storage
        return this.getLocalRankings();
    }
    
    getLocalRankings() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }
    
    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    getDeviceInfo() {
        const ua = navigator.userAgent;
        if (ua.includes('Mobile')) return 'Mobile';
        if (ua.includes('Tablet')) return 'Tablet';
        return 'Desktop';
    }
}

class ColorGame {
    constructor() {
        this.score = 0;
        this.level = 1;
        this.timeLeft = 30;
        this.gameActive = false;
        this.timer = null;
        this.currentCorrectTile = null;
        this.playerName = '';
        this.rankingManager = new GlobalRankingManager();
        this.languageManager = new LanguageManager();
        this.gameLimitManager = new GameLimitManager();
        this.adTimer = null;
        this.adTimeLeft = 30;
        this.combo = 0;
        this.comboTimer = null;
        this.startTime = null;
        this.initialTimeLeft = 30;
        this.currentGameId = null;
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateConnectionStatus();
        this.showIntroScreen();
    }
    
    initializeElements() {
        this.introScreen = document.getElementById('introScreen');
        this.gameContainer = document.getElementById('gameContainer');
        this.introStartBtn = document.getElementById('introStartBtn');
        
        this.scoreElement = document.getElementById('score');
        this.levelElement = document.getElementById('level');
        this.timerElement = document.getElementById('timer');
        this.gameGrid = document.getElementById('gameGrid');
        this.startBtn = document.getElementById('startBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.gameOverModal = document.getElementById('gameOver');
        this.finalScoreElement = document.getElementById('finalScore');
        this.finalLevelElement = document.getElementById('finalLevel');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        this.instructionElement = document.getElementById('instruction');
        
        this.nameInputModal = document.getElementById('nameInput');
        this.playerNameInput = document.getElementById('playerName');
        this.nameSubmitBtn = document.getElementById('nameSubmitBtn');
        this.gameMain = document.getElementById('gameMain');
        this.playerDisplayName = document.getElementById('playerDisplayName');
        this.todayRankElement = document.getElementById('todayRank');
        this.viewRankingBtn = document.getElementById('viewRankingBtn');
        this.rankingModal = document.getElementById('rankingModal');
        this.rankingList = document.getElementById('rankingList');
        this.closeRankingBtn = document.getElementById('closeRankingBtn');
        
        this.gamesLeftElement = document.getElementById('gamesLeft');
        this.limitReachedModal = document.getElementById('limitReachedModal');
        this.watchAdBtn = document.getElementById('watchAdBtn');
        this.closeAdBtn = document.getElementById('closeAdBtn');
        this.closeLimitModalBtn = document.getElementById('closeLimitModalBtn');
        this.adVideo = document.getElementById('adVideo');
        this.adTimerElement = document.getElementById('adTimer');
        
        this.comboIndicator = document.getElementById('comboIndicator');
        this.comboCountElement = document.getElementById('comboCount');
        
        this.howToPlayBtn = document.getElementById('howToPlayBtn');
        this.tutorialModal = document.getElementById('tutorialModal');
        this.startGameFromTutorial = document.getElementById('startGameFromTutorial');
        this.closeTutorialBtn = document.getElementById('closeTutorialBtn');
        
        this.connectionStatus = document.getElementById('connectionStatus');
        this.statusIndicator = document.getElementById('statusIndicator');
        this.statusText = document.getElementById('statusText');
    }
    
    setupEventListeners() {
        this.introStartBtn.addEventListener('click', () => this.showNameInput());
        this.startBtn.addEventListener('click', () => this.startGame());
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.playAgainBtn.addEventListener('click', () => this.playAgain());
        this.nameSubmitBtn.addEventListener('click', () => this.submitName());
        this.viewRankingBtn.addEventListener('click', () => this.showRanking());
        this.closeRankingBtn.addEventListener('click', () => this.hideRanking());
        this.watchAdBtn.addEventListener('click', () => this.startAdVideo());
        this.closeAdBtn.addEventListener('click', () => this.closeAdVideo());
        this.closeLimitModalBtn.addEventListener('click', () => this.closeLimitModal());
        this.howToPlayBtn.addEventListener('click', () => this.showTutorial());
        this.startGameFromTutorial.addEventListener('click', () => this.startGameFromTutorialModal());
        this.closeTutorialBtn.addEventListener('click', () => this.hideTutorial());
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.languageManager.setLanguage(e.target.getAttribute('data-lang'));
            });
        });
        
        this.playerNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitName();
            }
        });
    }
    
    showIntroScreen() {
        this.introScreen.style.display = 'block';
        this.gameContainer.style.display = 'none';
        document.body.classList.add('intro-active');
    }
    
    showNameInput() {
        this.introScreen.style.display = 'none';
        this.gameContainer.style.display = 'block';
        this.nameInputModal.style.display = 'flex';
        this.gameMain.style.display = 'none';
        this.playerNameInput.focus();
        document.body.classList.remove('intro-active');
    }
    
    submitName() {
        const name = this.playerNameInput.value.trim();
        if (name.length < 1) {
            alert(this.languageManager.getText('enter-name-alert'));
            return;
        }
        if (name.length > 10) {
            alert(this.languageManager.getText('name-length-alert'));
            return;
        }
        
        this.playerName = name;
        this.nameInputModal.style.display = 'none';
        this.gameMain.style.display = 'block';
        this.playerDisplayName.textContent = this.playerName;
        this.updateGamesLeftDisplay();
    }
    
    startGame() {
        if (!this.gameLimitManager.canPlayGame()) {
            this.showLimitReachedModal();
            return;
        }
        
        this.gameLimitManager.recordGamePlayed();
        this.updateGamesLeftDisplay();
        
        this.gameActive = true;
        this.score = 0;
        this.level = 1;
        this.timeLeft = 30;
        this.combo = 0;
        this.hideComboIndicator();
        
        this.updateDisplay();
        this.generateLevel();
        this.startTimer();
        
        // 게임 중에는 모든 버튼 숨김
        this.startBtn.style.display = 'none';
        this.restartBtn.style.display = 'none';
        this.howToPlayBtn.style.display = 'none';
    }
    
    restartGame() {
        this.endGame();
        this.startGame();
    }
    
    playAgain() {
        this.gameOverModal.style.display = 'none';
        this.startGame();
    }
    
    generateLevel() {
        const gridSize = Math.min(3 + Math.floor(this.level / 3), 6);
        const totalTiles = gridSize * gridSize;
        
        this.gameGrid.innerHTML = '';
        this.gameGrid.className = `game-grid grid-${gridSize}x${gridSize}`;
        
        const baseColor = this.generateRandomColor();
        const differentColor = this.generateSimilarColor(baseColor, this.level);
        
        const correctTileIndex = Math.floor(Math.random() * totalTiles);
        this.currentCorrectTile = null;
        
        for (let i = 0; i < totalTiles; i++) {
            const tile = document.createElement('div');
            tile.className = 'color-tile';
            
            if (i === correctTileIndex) {
                tile.style.backgroundColor = differentColor;
                tile.addEventListener('click', () => this.handleCorrectClick(tile));
                this.currentCorrectTile = tile;
            } else {
                tile.style.backgroundColor = baseColor;
                tile.addEventListener('click', () => this.handleWrongClick(tile));
            }
            
            this.gameGrid.appendChild(tile);
        }
    }
    
    generateRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 50 + Math.floor(Math.random() * 50);
        const lightness = 40 + Math.floor(Math.random() * 40);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    
    generateSimilarColor(baseColor, level) {
        const hslMatch = baseColor.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);
        if (!hslMatch) return baseColor;
        
        let [, hue, saturation, lightness] = hslMatch.map(Number);
        
        // 더 쉬운 시작을 위한 난이도 조정
        let difficulty;
        if (level <= 3) {
            difficulty = 30 - (level * 5); // 레벨 1-3: 25, 20, 15
        } else if (level <= 10) {
            difficulty = 20 - ((level - 3) * 2); // 레벨 4-10: 18, 16, 14, 12, 10, 8, 6
        } else {
            difficulty = Math.max(3, 8 - (level - 10)); // 레벨 11+: 점점 더 어려워짐
        }
        
        const changeAmount = Math.floor(Math.random() * difficulty) + 3;
        
        const changeType = Math.floor(Math.random() * 3);
        switch (changeType) {
            case 0:
                hue = (hue + changeAmount) % 360;
                break;
            case 1:
                saturation = Math.max(10, Math.min(90, saturation + (Math.random() > 0.5 ? changeAmount : -changeAmount)));
                break;
            case 2:
                lightness = Math.max(20, Math.min(80, lightness + (Math.random() > 0.5 ? changeAmount : -changeAmount)));
                break;
        }
        
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    
    handleCorrectClick(tile) {
        if (!this.gameActive) return;
        
        tile.classList.add('correct');
        
        // 콤보 시스템
        this.combo++;
        let baseScore = this.level * 10;
        let comboBonus = 0;
        
        if (this.combo >= 2) {
            comboBonus = Math.floor(baseScore * (this.combo - 1) * 0.5);
            this.showComboIndicator();
        }
        
        this.score += baseScore + comboBonus;
        this.level++;
        
        // 콤보 타이머 리셋
        if (this.comboTimer) {
            clearTimeout(this.comboTimer);
        }
        this.comboTimer = setTimeout(() => {
            this.resetCombo();
        }, 3000);
        
        this.updateDisplay();
        
        setTimeout(() => {
            this.generateLevel();
        }, 600);
    }
    
    handleWrongClick(tile) {
        if (!this.gameActive) return;
        
        tile.classList.add('wrong');
        
        // 시작 시간을 조정해서 3초 감소 효과
        this.startTime -= 3000;
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        this.timeLeft = Math.max(0, this.initialTimeLeft - elapsed);
        
        // 틀렸을 때 콤보 리셋
        this.resetCombo();
        
        this.updateDisplay();
        
        setTimeout(() => {
            tile.classList.remove('wrong');
        }, 400);
        
        if (this.timeLeft <= 0) {
            this.endGame();
        }
    }
    
    startTimer() {
        // 정확한 1초 간격을 위해 실제 시간 기반으로 타이머 구현
        this.startTime = Date.now();
        this.initialTimeLeft = this.timeLeft;
        
        this.timer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            this.timeLeft = Math.max(0, this.initialTimeLeft - elapsed);
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 100); // 더 정확한 업데이트를 위해 100ms마다 체크
    }
    
    async endGame() {
        this.gameActive = false;
        
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        const playerRank = await this.rankingManager.saveScore(this.playerName, this.score, this.level);
        this.currentGameId = this.rankingManager.generateUniqueId();
        
        this.finalScoreElement.textContent = this.score;
        this.finalLevelElement.textContent = this.level;
        this.todayRankElement.textContent = playerRank;
        this.gameOverModal.style.display = 'flex';
        
        // 게임 종료 후 버튼들 다시 표시
        this.startBtn.style.display = 'inline-block';
        this.restartBtn.style.display = 'inline-block';
        this.howToPlayBtn.style.display = 'inline-block';
        
        this.gameGrid.innerHTML = '';
    }
    
    async showRanking() {
        const rankings = await this.rankingManager.getRankings();
        this.rankingList.innerHTML = '';
        
        if (rankings.length === 0) {
            this.rankingList.innerHTML = `<p style="text-align: center; color: #666;">${this.languageManager.getText('no-records')}</p>`;
        } else {
            rankings.forEach((ranking, index) => {
                const rankItem = document.createElement('div');
                rankItem.className = 'ranking-item';
                
                if (index < 3) {
                    rankItem.classList.add('top-3');
                }
                
                // 방금 플레이한 게임 결과만 하이라이트 (최근 30초 이내)
                if (ranking.name === this.playerName && 
                    Math.abs(ranking.timestamp - new Date().getTime()) < 30000) {
                    rankItem.classList.add('current-player');
                }
                
                rankItem.innerHTML = `
                    <span class="rank">${index + 1}</span>
                    <span class="name">${ranking.name}</span>
                    <span class="score">${ranking.score}${this.languageManager.currentLanguage === 'ko' ? '점' : ' pts'}</span>
                `;
                
                this.rankingList.appendChild(rankItem);
            });
        }
        
        this.rankingModal.style.display = 'flex';
    }
    
    hideRanking() {
        this.rankingModal.style.display = 'none';
    }
    
    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.levelElement.textContent = this.level;
        this.timerElement.textContent = this.timeLeft;
        
        if (this.timeLeft <= 10) {
            this.timerElement.style.color = '#ff4757';
        } else {
            this.timerElement.style.color = '#495057';
        }
        
        const gridSize = Math.min(3 + Math.floor(this.level / 3), 6);
        this.instructionElement.textContent = this.languageManager.getText('level-instruction', this.level, gridSize);
    }
    
    updateGamesLeftDisplay() {
        const remaining = this.gameLimitManager.getRemainingGames();
        this.gamesLeftElement.textContent = remaining;
        
        if (remaining <= 3) {
            this.gamesLeftElement.style.color = '#ff4757';
        } else {
            this.gamesLeftElement.style.color = '#495057';
        }
    }
    
    showLimitReachedModal() {
        this.limitReachedModal.style.display = 'flex';
    }
    
    closeLimitModal() {
        this.limitReachedModal.style.display = 'none';
    }
    
    startAdVideo() {
        this.adTimeLeft = 30;
        this.adTimerElement.textContent = this.adTimeLeft;
        this.watchAdBtn.style.display = 'none';
        this.closeAdBtn.style.display = 'none';
        this.adVideo.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        
        this.adTimer = setInterval(() => {
            this.adTimeLeft--;
            this.adTimerElement.textContent = this.adTimeLeft;
            
            if (this.adTimeLeft <= 0) {
                this.completeAdVideo();
            }
        }, 1000);
    }
    
    completeAdVideo() {
        clearInterval(this.adTimer);
        this.adTimer = null;
        
        this.gameLimitManager.resetDailyLimit();
        this.updateGamesLeftDisplay();
        
        this.adVideo.style.background = '#4CAF50';
        this.adTimerElement.textContent = '완료!';
        this.closeAdBtn.style.display = 'inline-block';
        this.closeAdBtn.textContent = this.languageManager.getText('close');
    }
    
    closeAdVideo() {
        this.limitReachedModal.style.display = 'none';
        this.watchAdBtn.style.display = 'inline-block';
        this.closeAdBtn.style.display = 'none';
        this.adVideo.style.background = '#f8f9fa';
        this.adTimeLeft = 30;
        this.adTimerElement.textContent = this.adTimeLeft;
        
        if (this.adTimer) {
            clearInterval(this.adTimer);
            this.adTimer = null;
        }
    }
    
    showComboIndicator() {
        this.comboCountElement.textContent = this.combo;
        this.comboIndicator.style.display = 'block';
        
        // 애니메이션 효과
        this.comboIndicator.classList.remove('combo-animate');
        setTimeout(() => {
            this.comboIndicator.classList.add('combo-animate');
        }, 10);
    }
    
    hideComboIndicator() {
        this.comboIndicator.style.display = 'none';
        this.comboIndicator.classList.remove('combo-animate');
    }
    
    resetCombo() {
        this.combo = 0;
        this.hideComboIndicator();
        
        if (this.comboTimer) {
            clearTimeout(this.comboTimer);
            this.comboTimer = null;
        }
    }
    
    showTutorial() {
        this.tutorialModal.style.display = 'flex';
    }
    
    hideTutorial() {
        this.tutorialModal.style.display = 'none';
    }
    
    startGameFromTutorialModal() {
        this.hideTutorial();
        this.startGame();
    }
    
    async updateConnectionStatus() {
        if (!this.statusIndicator || !this.statusText) return;
        
        // Check server connection
        await checkServerConnection();
        
        if (isServerAvailable && navigator.onLine) {
            this.statusIndicator.className = 'status-indicator online';
            this.statusText.textContent = this.languageManager.getText('status-online') || '전세계 순위표 연결됨';
        } else if (!navigator.onLine) {
            this.statusIndicator.className = 'status-indicator offline';
            this.statusText.textContent = this.languageManager.getText('status-offline') || '오프라인 (로컬 순위표)';
        } else {
            this.statusIndicator.className = 'status-indicator offline';
            this.statusText.textContent = this.languageManager.getText('status-local') || '서버 연결 실패 (로컬 순위표)';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ColorGame();
});