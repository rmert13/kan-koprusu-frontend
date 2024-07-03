import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/bagiscilistesi.css';
import getCities from './cities';
import getDistricts from './districts';

function BagisciListesi() {
    const [bagiscilar, setBagiscilar] = useState([]);
    const [filteredBagiscilar, setFilteredBagiscilar] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedBloodType, setSelectedBloodType] = useState('');
    const [userSessionId, setUserSessionId] = useState('');
    const [showAlert, setShowAlert] = useState(false); 
    const isLoggedIn = localStorage.getItem('user'); 

    useEffect(() => {
        const sessionId = localStorage.getItem('session');
        setUserSessionId(sessionId);
        fetchDonors(sessionId);
    }, []);

    const fetchDonors = async (sessionId) => {
        try {
            const url = 'http://localhost:5093/api/User/get-donors';
            const body = {
                value: sessionId
            };

            const response = await axios.post(url, body);
            if (response.status === 200) {
                setBagiscilar(response.data);
                setFilteredBagiscilar(response.data);
            } else {
                console.log('Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error('Error fetching donors:', error);
        }
    };

    useEffect(() => {
        filterDonors();
    }, [selectedCity, selectedBloodType, bagiscilar]);

    const filterDonors = () => {
        let filtered = bagiscilar;

        if (selectedCity) {
            const cityId = getCities().cities.find(city => city.name.trim().toLowerCase() === selectedCity.trim().toLowerCase())?.id;
            if (cityId) {
                filtered = filtered.filter(bagisci => bagisci.city.trim() === cityId.trim());
            }
        }

        if (selectedBloodType && selectedBloodType !== 'Hepsi') {
            filtered = filtered.filter(bagisci => bagisci.bloodType === selectedBloodType);
        }

        setFilteredBagiscilar(filtered);
    };

    const getCityName = (cityId) => {
        const city = getCities().cities.find(city => city.id === cityId);
        return city ? city.name : '';
    };

    const getDistrictName = (districtId) => {
        const district = getDistricts().districts.find(district => district.id === districtId);
        return district ? district.name : '';
    };

    const getFriendlyBloodType = (backendBloodType) => {
        switch (backendBloodType) {
            case "OPositive":
                return "0 Rh+";
            case "ONegative":
                return "0 Rh-";
            case "APositive":
                return "A Rh+";
            case "ANegative":
                return "A Rh-";
            case "BPositive":
                return "B Rh+";
            case "BNegative":
                return "B Rh-";
            case "ABPositive":
                return "AB Rh+";
            case "ABNegative":
                return "AB Rh-";
            default:
                return backendBloodType;
        }
    };

    const handleFinishDonation = async () => {
        try {
            const url = 'http://localhost:5093/api/Role/drop-donor';
            const body = {
                value: userSessionId
            };

            const response = await axios.post(url, body);
            if (response.status === 200) {
                console.log(response.data.message);
                setFilteredBagiscilar(filteredBagiscilar);
                setShowAlert(true); 
            } else {
                console.log('Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error('Error dropping donor:', error);
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
        window.location.reload();
    };

    return (
        <div className="container">
            <div className="row justify-content-center" style={{ paddingTop: '50px' }}>
                <div className="col-lg-8">
                    <div className="title-container">
                        <h2 className="title">Bağışçı Listesi</h2>
                    </div>

                    <div className="filter-container">
                        <div className="filter-select">
                            <label htmlFor="ilIlceFilter">Şehre Göre Filtrele:</label>
                            <select
                                className="form-select"
                                id="ilIlceFilter"
                                value={selectedCity}
                                onChange={e => setSelectedCity(e.target.value)}
                            >
                                <option value="">Tüm Şehirler</option>
                                {getCities().cities.sort((a, b) => a.id - b.id).map((city, index) => (
                                    <option key={index} value={city.name}>{city.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-select">
                            <label htmlFor="kanGrubuFilter">Kan Grubuna Göre Filtrele:</label>
                            <select
                                className="form-select"
                                id="kanGrubuFilter"
                                value={selectedBloodType}
                                onChange={e => setSelectedBloodType(e.target.value)}
                            >
                                <option value="Hepsi">Tüm Kan Grupları</option>
                                <option value="APositive">A+</option>
                                <option value="ANegative">A-</option>
                                <option value="BPositive">B+</option>
                                <option value="BNegative">B-</option>
                                <option value="ABPositive">AB+</option>
                                <option value="ABNegative">AB-</option>
                                <option value="OPositive">0+</option>
                                <option value="ONegative">0-</option>
                            </select>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>İsim Soyisim</th>
                                    <th>Email</th>
                                    <th>İl</th>
                                    <th>İlçe</th>
                                    <th>Kan Grubu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBagiscilar.map((bagisci, index) => (
                                    <tr key={index}>
                                        <td>{bagisci.firstName} {bagisci.lastName}</td>
                                        <td>{bagisci.email}</td>
                                        <td>{getCityName(bagisci.city)}</td>
                                        <td>{getDistrictName(bagisci.district)}</td>
                                        <td>{getFriendlyBloodType(bagisci.bloodType)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {}
                    {isLoggedIn && (
                        <div className="finish-donation">
                            <button className="btn btn-danger" onClick={handleFinishDonation}>
                                Kan Verme İşlemimi Tamamladım. Bağışçı Listesinden Çıkmak İstiyorum.
                            </button>
                        </div>
                    )}

                    {showAlert && (
                        <div className="alert-container">
                            <div className="alert-box">
                                <p>Bağışçı Listesinden Kaldırıldınız.</p>
                                <button onClick={closeAlert} className="btn btn-primary">Tamam</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BagisciListesi;
