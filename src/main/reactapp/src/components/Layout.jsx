import { Link, useNavigate } from "react-router-dom";

function Layout({ children }){
    const navigate = useNavigate();

    const token = localStorage.getItem('token')
    const userName = localStorage.getItem('userName')

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('userName')
        localStorage.removeItem('email')
        navigate('/login')
    }

   return (
    <div className="container">
       <h2><a href="/">magnoria 게시판</a></h2>
      <header className="header">
        <nav className="nav">
          <Link to="/">게시글 목록</Link>
          {!token && <Link to="/signup">회원가입</Link>}
          {!token && <Link to="/login">로그인</Link>}
          {token && <Link to="/posts/new">글 작성</Link>}
        </nav>

        <div>
          {token ? (
            <>
              <span>{userName} 님 </span>
              <button onClick={handleLogout} className="write-button">
                로그아웃
              </button>
            </>
          ) : (
            <span style={{color: "black" }}>비로그인</span>
          )}
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}

export default Layout
