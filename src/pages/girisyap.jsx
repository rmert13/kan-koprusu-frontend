import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/girisyap.css';

function Girisyap() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState(""); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Gönderilen veri:', formData);
        try {
            const response = await axios.post('http://localhost:5093/api/Authentication/login', formData);
            console.log("Sunucudan gelen yanıt:", response.data);
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('session', response.data.sessionId)
                navigate('/'); 
            } else {
                setErrorMessage("Hatalı e-posta veya şifre girdiniz. Lütfen tekrar deneyiniz."); 
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
            if (error.response) {
                console.log('Hata yanıtı:', error.response.data);
                setErrorMessage("Hatalı e-posta veya şifre girdiniz. Lütfen tekrar deneyiniz."); 
            } else {
                setErrorMessage("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
            }
        }
    };

    return (
        <div className="girisyap">
            <div className="login">
                <h1>Giriş Yap</h1>
                <form onSubmit={handleSubmit}>
                    <div className="loginbox">
                        <label htmlFor="email">E-posta</label>
                        <input 
                            placeholder="example@example.com" 
                            autoComplete="off" 
                            id="email" 
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="loginbox">
                        <label htmlFor="password">Şifre</label>
                        <input 
                            id="password" 
                            type="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {errorMessage && (
                        <div className="error-message">
                            {errorMessage}
                        </div>
                    )}
                    <div className="loginforgot">
                        <a href="/kayitol">Şifremi unuttum?</a>
                    </div>
                    <div className="loginbox">
                        <input className="btn" id="submit" type="submit" value="Giriş Yap" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Girisyap;
