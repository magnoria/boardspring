# 📌 JWT 기반 게시판 API (Laravel → Spring Boot 비교 프로젝트)

## 🧾 프로젝트 소개

이 프로젝트는 **Laravel에서 구현한 게시판 API를 Spring Boot로 재구현**하며
두 프레임워크의 구조와 흐름 차이를 이해하기 위해 진행한 프로젝트입니다.

라라벨 게시판 GIT : https://github.com/magnoria/board-laravel.git

단순 CRUD 구현이 아닌,
👉 **JWT 인증 + 사용자 권한 기반 게시글 관리**를 중심으로
백엔드 구조 설계와 인증 흐름을 직접 구현했습니다.

---

## 🎯 핵심 기능

### 👤 사용자

* 회원가입
* 로그인 (JWT 토큰 발급)
* 비밀번호 암호화 (BCrypt)

### 📝 게시글

* 게시글 생성
* 게시글 목록 조회
* 게시글 상세 조회
* 게시글 수정 (작성자만 가능)
* 게시글 삭제 (작성자만 가능)

### 🔐 인증 / 인가

* JWT 기반 인증
* Authorization 헤더 (Bearer Token) 사용
* 토큰에서 사용자 정보 추출 후 권한 검증

---

## 🛠️ 기술 스택

### Backend

* Java 17
* Spring Boot
* Spring Security
* Spring Data JPA (Hibernate)
* MySQL
* JWT (jjwt)

### Frontend

* React
* Axios

---

## 🏗️ 시스템 구조

```plaintext
[ React ]
   ↓ (HTTP 요청 + JWT)
[ Controller ]
   ↓
[ Service ]
   ↓
[ Repository (JPA) ]
   ↓
[ MySQL ]
```

---

## 🔑 인증 흐름

1. 로그인 요청
2. 서버에서 사용자 검증
3. JWT 토큰 발급
4. 클라이언트 localStorage에 저장
5. 요청 시 Authorization 헤더에 포함

```http
Authorization: Bearer {token}
```

6. 서버에서 토큰 검증 후 사용자 정보 추출
7. 게시글 작성자와 비교하여 권한 체크

---

## 📂 주요 코드 구조

```
src/main/java/com/sb/boardspring
├── controller
├── service
├── repository
├── entity
├── dto
├── config
└── util (JWT)
```

---

## ⚙️ 실행 방법

### 1. DB 설정

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/board_spring
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 2. 실행

```bash
./gradlew bootRun
```

---

## 📸 화면 (예시)

* 로그인 화면
* 게시글 목록
* 게시글 상세
* 글 작성 / 수정

(👉 여기 스크린샷 추가)

---

## ⚠️ 트러블슈팅

### 1. 토큰 형식 오류

* 문제: `Bearer` 없이 토큰 전송 시 인증 실패
* 해결: `Authorization: Bearer {token}` 형식으로 통일

---

### 2. 권한 체크 문제

* 문제: 다른 사용자가 게시글 수정 가능
* 해결: 토큰에서 userId 추출 후 작성자와 비교

---

### 3. JPA 연관관계 설정

* 문제: user_id null 오류 발생
* 해결: `@ManyToOne` + `@JoinColumn`으로 관계 명확히 설정

---

## 🔍 Laravel vs Spring Boot 비교

| 항목  | Laravel  | Spring Boot     |
| --- | -------- | --------------- |
| 구조  | 간결       | 계층 구조 명확        |
| ORM | Eloquent | JPA (Hibernate) |
| 인증  | 간단한 설정   | 직접 구성 필요        |
| 코드량 | 적음       | 많음 (대신 명확함)     |

👉 Spring에서는 구조가 더 복잡하지만
**확장성과 유지보수에 유리한 설계**를 경험할 수 있었습니다.

---

## 💡 느낀 점

* 단순 CRUD를 넘어 인증 흐름까지 직접 구현하면서
  **백엔드 전체 흐름을 이해할 수 있었습니다.**
* Laravel과 비교하며
  **Spring의 구조적 장점과 설계 방식**을 체감했습니다.
* 특히 **DTO, Service 계층 분리, 인증 처리 방식**에 대한 이해도가 높아졌습니다.

---

## 🚀 개선 예정

* Spring Security + JWT Filter 기반 인증 구조 개선
* 예외 처리(Global Exception Handler) 정리
* API 응답 구조 통일
* 페이징 및 검색 기능 추가

---

## 🔗 GitHub

https://github.com/magnoria/boardspring

