# Hue Hunt v2 - Global Color Game

🎮 **실시간 전세계 순위 경쟁이 가능한 색상 구분 게임**

## 🌟 주요 기능

- **전세계 실시간 순위표**: 다른 플레이어들과 실시간으로 경쟁
- **다국어 지원**: 한국어/English 완벽 지원
- **콤보 시스템**: 연속 정답 시 보너스 점수
- **적응형 난이도**: 쉬운 시작에서 점진적 어려움 증가
- **일일 제한**: 10게임 + 광고 시청으로 추가 게임
- **크로스 플랫폼**: 모든 기기에서 동일한 순위표 공유

## 🚀 Render 배포 방법

### 1. GitHub Repository 준비
```bash
# 프로젝트를 GitHub에 업로드
git init
git add .
git commit -m "Initial commit - Hue Hunt v2"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Render에서 배포
1. [Render.com](https://render.com)에 로그인
2. "New +" 클릭 → "Web Service" 선택
3. GitHub repository 연결
4. 설정:
   - **Name**: `hue-hunt-v2`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free` (또는 원하는 플랜)

### 3. 환경 변수 설정 (선택사항)
- `NODE_ENV`: `production`

## 🛠️ 로컬 개발

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 📊 API 엔드포인트

- `GET /api/rankings` - 오늘의 순위표 조회
- `POST /api/rankings` - 새 점수 저장
- `GET /api/stats` - 통계 정보
- `GET /api/health` - 서버 상태 확인

## 🏗️ 기술 스택

### Backend
- **Node.js** + **Express**: 웹 서버
- **SQLite**: 경량 데이터베이스
- **Helmet**: 보안 미들웨어
- **CORS**: 크로스 오리진 요청 허용

### Frontend
- **Vanilla JavaScript**: 프레임워크 없이 순수 JS
- **HTML5 Canvas**: 게임 그래픽
- **CSS3**: 반응형 디자인 + 애니메이션

## 🎯 게임 규칙

1. **목표**: 30초 안에 다른 색상의 사각형 찾기
2. **점수**: 레벨 × 10점 (기본) + 콤보 보너스
3. **콤보**: 연속 정답 시 추가 점수 (기본점수 × (콤보-1) × 0.5)
4. **패널티**: 오답 시 시간 3초 감소
5. **난이도**: 레벨업 시 색상 차이 감소

## 🏆 순위 시스템

- **일일 리셋**: 한국 시간 자정(00:00 KST)에 순위 초기화
- **정렬 기준**: 점수 → 레벨 → 시간순
- **글로벌**: 전세계 모든 플레이어와 경쟁
- **실시간**: 즉시 순위 반영

## 🔧 배포 후 확인사항

1. **서버 상태**: `/api/health` 엔드포인트 확인
2. **순위표 연결**: 게임 내 연결 상태 인디케이터 확인
3. **데이터베이스**: 점수 저장/조회 정상 작동 확인

## 📈 모니터링

- **로그**: Render 대시보드에서 서버 로그 확인
- **성능**: 응답 시간 및 에러율 모니터링
- **데이터**: 일일 플레이어 수 및 점수 통계

## 🔒 보안

- **Helmet.js**: HTTP 헤더 보안
- **입력 검증**: 모든 사용자 입력 유효성 검사
- **SQL 방지**: Prepared Statements 사용
- **Rate Limiting**: 과도한 요청 방지 (향후 추가 예정)

## 📝 라이센스

MIT License - 자유롭게 사용, 수정, 배포 가능

---

🎮 **Happy Gaming!** 전세계 플레이어들과 색상 감별 능력을 겨뤄보세요!