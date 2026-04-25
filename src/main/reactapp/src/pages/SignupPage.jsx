import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/auth";

function SignupPage(){
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
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
            await apiFetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify(form),
            })
            
            alert('회원가입 성공')
            navigate('/login')
        } catch (error) {
            setMessage(error.message)
        }
}

    return(
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit} className="form">
                <input name="name" placeholder="이름" value={form.name} onChange={handleChange} />
                <input name="email" placeholder="이메일" value={form.email} onChange={handleChange} />
                <input name="password" type="password" placeholder="비밀번호" value={form.password} onChange={handleChange} />
                <button type="submit" className="write-button">
                    회원가입
                </button>
            </form>
            {message && <p className="error">{message}</p>}
        </div>
    )
}

export default SignupPage