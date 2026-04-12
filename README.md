# Vite + JavaScript + Tailwind CSS 게시판

JavaScript, Tailwind CSS, HTML로 만든 게시판 웹 애플리케이션입니다.

## 기능

- 회원가입 / 로그인 / 로그아웃 (JWT 인증)
- 게시글 작성, 수정, 삭제, 상세 조회
- 게시글 목록 페이지네이션
- 댓글 작성, 수정, 삭제
- 해시 기반 SPA 라우팅

## 기술 스택

- **Vite** — 빌드 도구
- **JavaScript (ES Modules)** — 프로그래밍 언어
- **Tailwind CSS** — 스타일링
- **REST API** — fullstackfamily.com Education Practice API

## 프로젝트 구조

```
src/
├── main.js              # 라우트 등록 + 진입점
├── style.css            # Tailwind CSS
├── utils/
│   ├── api.js           # API 클라이언트 (fetch 래퍼, 인증, CRUD)
│   └── router.js        # 해시 기반 라우터
└── pages/
    ├── login.js          # 로그인 페이지
    ├── signup.js         # 회원가입 페이지
    ├── postList.js       # 글 목록 + 페이지네이션
    ├── postDetail.js     # 상세 조회 + 댓글
    ├── postWrite.js      # 글쓰기
    └── postEdit.js       # 글 수정
```

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

브라우저에서 `http://localhost:5173`을 열면 게시판이 실행됩니다.

## API 프록시

개발 환경에서 CORS 문제를 해결하기 위해 Vite 프록시를 사용합니다. `vite.config.js`에 설정되어 있으며, API 요청은 `/api/edu/ws-283fc1` 경로로 보내면 `https://api.fullstackfamily.com`으로 프록시됩니다.

## 상세 튜토리얼

이 프로젝트를 처음부터 단계별로 만드는 방법은 아래 블로그 글에서 확인할 수 있습니다.

- [Vite + JavaScript + Tailwind CSS로 게시판 만들기](https://www.fullstackfamily.com/@urstory/posts/14398)

## TypeScript 버전

같은 기능을 TypeScript로 구현한 버전도 있습니다.

- 저장소: [board-app-ts](https://github.com/urstory/board-app-ts)
- 튜토리얼: [Vite + TypeScript + Tailwind CSS로 게시판 만들기](https://www.fullstackfamily.com/@urstory/posts/14399)
