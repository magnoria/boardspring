import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiFetch } from '../api/auth'

function PostEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    content: '',
  })

  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await apiFetch(`/api/posts/${id}`)
        setForm({
          title: data.title,
          content: data.content,
        })
      } catch (error) {
        setMessage(error.message)
      }
    }

    fetchPost()
  }, [id])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await apiFetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(form),
      })

      alert('수정 완료')
      navigate(`/posts/${id}`)
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div>
      <h2>글 수정</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="title" value={form.title} onChange={handleChange} />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows="10"
        />
        <button type="submit">수정</button>
      </form>
      {message && <p className="error">{message}</p>}
    </div>
  )
}

export default PostEditPage