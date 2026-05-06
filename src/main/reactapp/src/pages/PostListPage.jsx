import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../api/auth'


function PostListPage() {
  const [posts, setPosts] = useState([])
  const [message, setMessage] = useState('')

  //페이징 처리 추가
  const[page, setPage] = useState(0)
  const[totalPages, setTotalPages] = useState(0)

  const size = 10

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await apiFetch(`/api/posts?page=${page}&size=10`)

        setPosts(data.content)
        setTotalPages(data.totalPages)
      } catch (error) {
        setMessage(error.message)
      }
    }

    fetchPosts()
  }, [page])


   const goFist = () => setPage(0)

   const goPrev = () => {
       if(page > 0){
           setPage(page - 1)
           }
       }

   const goNext = () => {
       if(page < totalPages - 1) {
           setPage(page + 1)
           }
       }

   const goLast = () => {
       setPage(totalPages - 1)
       }

  return (
    <div className="board-wrap">
      <h2>자유게시판</h2>

      {message && <p className="error">{message}</p>}

      <table className="board-table">
        <thead>
          <tr>
            <th className="col-no">번호</th>
            <th>제목</th>
            <th className="col-writer">작성자</th>
          </tr>
        </thead>

        <tbody>
          {posts.length === 0 ? (
            <tr>
              <td colSpan="3" className="empty">
                게시글이 없습니다.
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td className="title-cell">
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </td>
                <td className='title-cell'>{post.userName}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={goFist} disabled={page === 0}>{'≪'}</button>
        <button onClick={goPrev} disabled={page === 0}>{'‹'}</button>
        {Array.from({ length : totalPages}, (_, index) => (
            <button
             key={index}
             onClick={() => setPage(index)}
             className={page === index ? 'active' : ''}>
             {index + 1}
            </button>
            ))}


        <button onClick={goNext} disabled={page >= totalPages - 1}>{'›'}</button>
        <button onClick={goLast} disabled={page >= totalPages - 1}>{'≫'}</button>
      </div>
    </div>
  )
}

export default PostListPage