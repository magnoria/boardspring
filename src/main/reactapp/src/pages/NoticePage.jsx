function NoticePage() {
  return (
    <div className="board-wrap">
      <h2>작동방식 공지 및 안내</h2>

      <p>이 게시판은 React + Spring Boot + MySQL로 만든 포트폴리오 프로젝트입니다.</p>

      <h3>작동 방식</h3>
      <p>
        프론트엔드는 Vercel, 백엔드는 Render에 배포되어 있습니다. 배포용서버는 휘발성입니다.
        Render 무료 서버 특성상 첫 요청 시 약 30~60초 정도 지연될 수 있습니다.
      </p>

      <h3>프로젝트 링크</h3>
      <p>
        <a
          href="https://github.com/magnoria/boardspring"
          target="_blank"
          rel="noopener noreferrer"
          className="notice-link"
        >
          🚀GitHub 저장소 바로가기
        </a>
      </p>
    </div>
  )
}

export default NoticePage