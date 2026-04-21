import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/auth";

function LoginPage(){
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await apiFetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify(form),
            })

            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.id)
            localStorage.setItem('userName', data.name)
            localStorage.setItem('email', data.email)

            alert('로그인 성공')
            navigate('/')
            window.location.reload()
        } catch (error) {
            setMessage(error.message)
        }
    }
    
    return(
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit} className="form">
                <input name="email" placeholder="이메일" value={form.email} onChange={handleChange} />
                <input name="password" type="password" placeholder="비밀번호" value={form.password} onChange={handleChange} />
                <button type="submit" className="action-button">
                    로그인
                </button>
            </form>
            {message && <p className="error">{message}</p>}
        </div>
    )
}

export default LoginPage