import React, { useState, useEffect } from 'react';
import '../styles/kayitol.css'; 
import axios from "axios";
import getDistricts from './districts';
import getCities from './cities';
import { useNavigate } from 'react-router-dom';
import SuccessMessage from './SuccessMessage'; 

function KayitOl() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        socialSecurityNumber: '',
        gender: '',
        bloodType: '',
        city: '',
        district: '',
        dateOfBirth: '',
        phoneNumber: ''
    });

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const citiesData = getCities().cities;
        setCities(citiesData);
    }, []);

    useEffect(() => {
        const districtsData = getDistricts().districts;
        setDistricts(districtsData);
    }, []);

    useEffect(() => {
        if (formData.city) {
            const filtered = districts.filter(district => district.il_id === formData.city);
            setFilteredDistricts(filtered);
        } else {
            setFilteredDistricts([]);
        }
    }, [formData.city, districts]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = "http://localhost:5093/api/Authentication/register";
        axios.post(url, formData)
            .then(response => {
                if (response.status === 200) {
                    setShowSuccessMessage(true);
                }
            })
            .catch(error => console.log('error', error));
        console.log('Form gönderildi!', formData);
    };

    const handleCloseSuccessMessage = () => {
        setShowSuccessMessage(false);
        navigate('/girisyap');
    };

    return (
        <div className="kayit">
            {showSuccessMessage && (
                <SuccessMessage 
                    message="Başarıyla kayıt oldunuz" 
                    onClose={handleCloseSuccessMessage}
                />
            )}
            <div className="register">
                <h1>Kayıt Ol</h1>
                <form onSubmit={handleSubmit}>
                    <div className="registerbox">
                        <label htmlFor="firstName">İsim</label>
                        <input
                            placeholder="İsim"
                            autoComplete="off"
                            id="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="registerbox">
                        <label htmlFor="lastName">Soyisim</label>
                        <input
                            placeholder="Soyisim"
                            autoComplete="off"
                            id="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="registerbox">
                        <label htmlFor="socialSecurityNumber">TC Kimlik Numarası</label>
                        <input
                            placeholder="TC Kimlik Numarası"
                            autoComplete="off"
                            id="socialSecurityNumber"
                            type="text"
                            maxLength="11"
                            value={formData.socialSecurityNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="registerbox">
                        <label htmlFor="email">E-posta</label>
                        <input
                            placeholder="E-posta"
                            autoComplete="off"
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="registerbox">
                        <label htmlFor="password">Şifre</label>
                        <input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="registerbox">
                        <label htmlFor="gender">Cinsiyet</label>
                        <select id="gender" value={formData.gender} onChange={handleChange}>
                            <option value="">Seçiniz</option>
                            <option value="male">Erkek</option>
                            <option value="female">Kadın</option>
                        </select>
                    </div>
                    <div className="registerbox">
                        <label htmlFor="bloodType">Kan Grubu</label>
                        <select id="bloodType" value={formData.bloodType} onChange={handleChange}>
                            <option value="">Seçiniz</option>
                            <option value="opositive">0 Rh +</option>
                            <option value="onegative">0 Rh -</option>
                            <option value="apositive">A Rh +</option>
                            <option value="anegative">A Rh -</option>
                            <option value="bpositive">B Rh +</option>
                            <option value="bnegative">B Rh -</option>
                            <option value="abpositive">AB Rh +</option>
                            <option value="abnegative">AB Rh -</option>
                        </select>
                    </div>
                    <div className="registerbox">
                        <label htmlFor="city">Şehir</label>
                        <select id="city" value={formData.city} onChange={handleChange}>
                            <option value="">Seçiniz</option>
                            {cities.map(city => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="registerbox">
                        <label htmlFor="district">İlçe</label>
                        <select id="district" value={formData.district} onChange={handleChange}>
                            <option value="">Seçiniz</option>
                            {filteredDistricts.map(district => (
                                <option key={district.id} value={district.id}>{district.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="registerbox">
                        <label htmlFor="dateOfBirth">Doğum Tarihi</label>
                        <input
                            id="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="registerbox">
                        <label htmlFor="phoneNumber">Telefon Numarası</label>
                        <input
                            placeholder="Telefon Numarası"
                            autoComplete="off"
                            id="phoneNumber"
                            type="text"
                            maxLength="10"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="registerbox">
                        <input className="btn" id="submit" type="submit" value="Kayıt Ol" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default KayitOl;
