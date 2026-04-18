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
    <div>
      <h2>게시글 목록</h2>
      {message && <p className="error">{message}</p>}

      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <Link to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
              </Link>
              <p>내용 : {post.content}</p>
              <p>작성자: {post.userName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PostListPage