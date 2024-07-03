import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/bilgilerim.css';
import getDistricts from './districts';
import getCities from './cities';

function Bilgilerim() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        bloodType: '',
        city: '',
        district: '',
        dateOfBirth: ''
    });

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');  

    useEffect(() => {
       
        const citiesData = getCities().cities;
        setCities(citiesData);

        const districtsData = getDistricts().districts;
        setDistricts(districtsData);
    }, []);

    useEffect(() => {
        
        const fetchUserData = async () => {
            try {
                const sessionId = localStorage.getItem('session');
                const url = 'http://localhost:5093/api/User/profile';
                const body = {
                    value: sessionId
                };
                const response = await axios.post(url, body);
                if (response.status === 200) {
                    const userData = response.data;

                    
                    const formattedDateOfBirth = formatDate(userData.dateOfBirth);

                    setFormData({
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        gender: userData.gender,
                        bloodType: userData.bloodType,
                        city: userData.city,
                        district: userData.district,
                        dateOfBirth: formattedDateOfBirth
                    });
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        
        if (formData.city) {
            const filtered = districts.filter(district => district.il_id === formData.city);
            setFilteredDistricts(filtered);
        } else {
            setFilteredDistricts([]);
        }
    }, [formData.city, districts]);

    
    const formatDate = (dateString) => {
        if (!dateString) return ''; 
        
        const parts = dateString.split('/');
        const month = parts[0];
        const day = parts[1];
        const year = parts[2];
        return `${year}-${month}-${day}`;
    };

    
    const updateChanges = async () => {
        try {
            const sessionId = localStorage.getItem('session');
            const url = 'http://localhost:5093/api/User/update-profile';
            const body = {
                sessionId: sessionId,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                gender: formData.gender,
                bloodType: formData.bloodType,
                city: formData.city,
                district: formData.district,
                dateOfBirth: formData.dateOfBirth
            };
            const response = await axios.post(url, body);
            if (response.status === 200) {
                console.log('Profile updated successfully');
                setSuccessMessage('Bilgileriniz başarıyla güncellendi.');  
            } else {
                console.error('Failed to update profile:', response.data);
                setSuccessMessage('Profil güncelleme başarısız oldu.');  
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setSuccessMessage('Profil güncelleme sırasında bir hata oluştu.');  
        }
    };

    return (
        <div className="bilgilerim">
            <div className="profile">
                <h1 className="page-title">Bilgilerim</h1>
                <form>
                    <div className="profilebox">
                        <label htmlFor="firstName">İsim</label>
                        <input
                            placeholder="İsim"
                            autoComplete="off"
                            id="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>
                    <div className="profilebox">
                        <label htmlFor="lastName">Soyisim</label>
                        <input
                            placeholder="Soyisim"
                            autoComplete="off"
                            id="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </div>
                    <div className="profilebox">
                        <label htmlFor="email">E-posta</label>
                        <input
                            placeholder="E-posta"
                            autoComplete="off"
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="profilebox">
                        <label htmlFor="gender">Cinsiyet</label>
                        <select
                            id="gender"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        >
                            <option value="">Seçiniz</option>
                            <option value="Male">Erkek</option>
                            <option value="Female">Kadın</option>
                        </select>
                    </div>
                    <div className="profilebox">
                        <label htmlFor="bloodType">Kan Grubu</label>
                        <select
                            id="bloodType"
                            value={formData.bloodType}
                            onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                        >
                            <option value="">Seçiniz</option>
                            <option value="OPositive">0 Rh +</option>
                            <option value="ONegative">0 Rh -</option>
                            <option value="APositive">A Rh +</option>
                            <option value="ANegative">A Rh -</option>
                            <option value="BPositive">B Rh +</option>
                            <option value="BNegative">B Rh -</option>
                            <option value="APositive">AB Rh +</option>
                            <option value="ABNegative">AB Rh -</option>
                        </select>
                    </div>
                    <div className="profilebox">
                        <label htmlFor="city">Şehir</label>
                        <select
                            id="city"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        >
                            <option value="">Seçiniz</option>
                            {cities.map(city => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="profilebox">
                        <label htmlFor="district">İlçe</label>
                        <select
                            id="district"
                            value={formData.district}
                            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        >
                            <option value="">Seçiniz</option>
                            {filteredDistricts.map(district => (
                                <option key={district.id} value={district.id}>{district.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="profilebox">
                        <label htmlFor="dateOfBirth">Doğum Tarihi</label>
                        <input
                            placeholder="Doğum Tarihi"
                            autoComplete="off"
                            id="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        />
                    </div>
                    <button className="update-button" type="button" onClick={updateChanges}>Değişikliklerimi Güncelle</button>
                    {successMessage && (  
                        <div className="success-message">
                            {successMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Bilgilerim;
