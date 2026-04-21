import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/auth";

function PostCreatePage(){
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        content: '',
    })

    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await apiFetch('/api/posts', {
                method: 'POST',
                body: JSON.stringify(form)
            });
            alert('생성되었습니다.');
            navigate('/posts');
        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
    <div>
      <h2>글 작성</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="title" placeholder="제목" value={form.title} onChange={handleChange} />
        <textarea
          name="content"
          placeholder="내용"
          value={form.content}
          onChange={handleChange}
          rows="10"
        />
        <button type="submit" className="action-button">작성</button>
      </form>
      {message && <p className="error">{message}</p>}
    </div>
  )
}

export default PostCreatePage