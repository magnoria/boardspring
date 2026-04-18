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
}