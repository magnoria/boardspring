import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../api/auth'

function PostListPage() {
  const [posts, setPosts] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await apiFetch('/api/posts')
        setPosts(data)
      } catch (error) {
        setMessage(error.message)
      }
    }

    fetchPosts()
  }, [])

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
              <td colSpan="5" className="empty">
                게시글이 없습니다.
              </td>
            </tr>
          ) : (
            posts.map((post, index) => (
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
        <button>{'≪'}</button>
        <button>{'‹'}</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>{'›'}</button>
        <button>{'≫'}</button>
      </div>
    </div>
  )
}

export default PostListPage