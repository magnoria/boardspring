# 🖥️ boardspring

>JWT 기반 게시판 서비스입니다.
>Spring Boot와 React를 활용하여 REST API 구조로 개발했으며, 사용자 인증/인가 및 게시글 CRUD 기능을 구현했습니다.
>프론트엔드와 백엔드를 분리하여 배포하고 CORS 및 API 통신 문제를 해결하며 실제 서비스 환경을 경험했습니다.

---

# 🔗 Deploy

## 🌐 Frontend (Vercel)

👉 https://boardspring.vercel.app/

회원가입 -> 로그인 -> 글작성 순서로 기능 확인 가능하며 백엔드 서버 연결시 1분정도 지연시간이 있을 수 있습니다.

## ⚙ Backend (Render)

👉 https://boardspring.onrender.com

---

# 📌 Project Overview

Spring Boot와 React를 분리하여 구성한 게시판 프로젝트입니다.

단순 CRUD 구현이 아니라 다음과 같은 실제 서비스 흐름을 직접 구현하는 것을 목표로 했습니다.

* JWT 기반 로그인 인증
* 사용자 권한 처리
* Pageable 기반 페이징 처리
* React API 연동
* Render / Vercel 배포
* CORS 및 Spring Security 설정

---

# 🛠 Tech Stack

## Backend

* Java 17
* Spring Boot 3
* Spring Security
* Spring Data JPA
* JWT (jjwt)
* Gradle

## Frontend

* React
* Vite
* React Router

## Database

* H2 (배포 테스트용)
* MySQL (로컬 개발용)

## Deploy

* Docker
* Render
* Vercel

---

# ✨ Main Features

## 👤 User

* 회원가입
* 로그인
* JWT 토큰 발급
* localStorage 기반 로그인 상태 유지

---

## 📝 Post

* 게시글 목록 조회
* 게시글 상세 조회
* 게시글 작성
* 게시글 수정
* 게시글 삭제

---

## 🔐 Authorization

* JWT 토큰 기반 사용자 인증
* 본인 게시글만 수정/삭제 가능

---

## 📄 Pagination

Spring Pageable을 사용하여 게시글 목록 페이징 처리 구현

```text
/api/posts?page=0&size=10
```

---

# 🔑 Authentication Flow

```text
로그인 성공
→ JWT 토큰 발급
→ localStorage 저장
→ Authorization: Bearer 토큰 전송
→ JwtFilter에서 토큰 검증
→ 인증 사용자 처리
```

---

# 🌐 Deploy & CORS

## Frontend

* Vercel 배포
* 환경변수(VITE_API_BASE_URL) 설정

## Backend

* Render 배포
* Dockerfile 기반 Java 환경 구성

## CORS

```java
.allowedOriginPatterns(
    "http://localhost:5173",
    "https://*.vercel.app"
)
```

---

# 📂 Project Structure

```text
src
 └ main
    ├ java
    │   └ com.sb.boardspring
    │       ├ controller
    │       ├ service
    │       ├ repository
    │       ├ entity
    │       ├ dto
    │       ├ config
    │       └ util
    └ reactapp
```

---

# ⚙ Local Run

## Backend

```bash
./gradlew bootRun
```

---

## Frontend

```bash
npm install
npm run dev
```

---

# 🚀 Future Improvements

* 댓글 기능
* Redis 적용
* 결제 API 연동
* 파일 업로드 기능
* Refresh Token 적용
* AWS 배포

---

# 📖 What I Learned

* Spring Security와 JWT 인증 흐름 이해
* CORS 및 preflight 요청 처리 경험
* React와 Spring Boot API 통신 구조 이해
* Docker 기반 배포 경험
* Render / Vercel 환경 변수 및 배포 경험
* Pageable 기반 페이징 처리 경험

---

# 💡 Project Goal

이 프로젝트는 단순 CRUD 구현이 아닌
실제 서비스 구조와 인증 흐름, 배포 과정을 경험하는 것을 목표로 제작했습니다.

