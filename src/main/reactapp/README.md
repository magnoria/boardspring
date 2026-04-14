📌 프로젝트 소개

JWT 기반 인증을 적용한 게시판 REST API 프로젝트입니다.
회원가입 및 로그인 기능을 통해 발급된 토큰을 기반으로 사용자 인증을 수행하며, 게시글 CRUD 기능과 작성자 권한 검증을 구현했습니다.

Laravel에서 구현했던 백엔드 구조를 Spring Boot로 재구성하면서 Controller-Service-Repository 계층 구조와 인증 흐름을 이해하는 것을 목표로 진행했습니다.

🛠️ 사용 기술
Back-End
Java
Spring Boot
Spring Security
JPA (Hibernate)
Database
MySQL
Authentication
JWT (JSON Web Token)
Tools
IntelliJ
Postman
Git / GitHub
📂 주요 기능
👤 사용자 기능
회원가입
로그인 (JWT 토큰 발급)
📝 게시글 기능
게시글 작성
게시글 목록 조회
게시글 상세 조회
게시글 수정
게시글 삭제
🔐 인증 및 권한 처리
로그인 성공 시 JWT 토큰 발급
요청 시 Authorization 헤더에 토큰 포함
토큰 검증을 통해 사용자 인증
게시글 작성자만 수정/삭제 가능
🧠 주요 구현 내용
1️⃣ 계층 구조 분리
Controller → Service → Repository → DB
Controller: 요청/응답 처리
Service: 비즈니스 로직 처리
Repository: DB 접근
2️⃣ DTO 사용
요청(Request) / 응답(Response) 분리
Entity 직접 노출 방지
API 응답 구조 관리
3️⃣ JWT 인증 흐름
로그인 요청 → 사용자 검증 → JWT 발급  
→ 요청 시 토큰 포함 → 필터에서 검증 → 사용자 정보 추출
4️⃣ 권한 검증
토큰에서 사용자 ID 추출
게시글 작성자와 비교
본인 글만 수정/삭제 가능
🔄 API 예시
로그인
POST /api/users/login
{
  "email": "test@example.com",
  "password": "1234"
}
게시글 작성
POST /api/posts
Authorization: Bearer {token}
{
  "title": "제목",
  "content": "내용"
}
⚠️ 트러블슈팅
1. JWT 헤더 오류
Authorization: bearer → 오류 발생
Authorization: Bearer → 정상

→ 대소문자 및 공백 중요

2. 토큰 null 문제
Authorization 헤더 누락 시 예외 발생
substring 처리 전 형식 검사 필요
3. Entity와 DB 컬럼 불일치
컬럼명 오류로 조회 실패
매핑 확인 필요
🎯 프로젝트 목적
Spring Boot 기반 REST API 구조 이해
JWT 인증 및 권한 처리 구현
Laravel과 Spring 구조 비교 학습
실제 서비스 흐름(요청 → 로직 → DB → 응답) 경험
