import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MapComponent from '../Components/Map';
import '../styles/kanarayanlarlistesi.css';
import getCities from './cities';
import getDistricts from './districts';

function KanArayanlarListesi() {
    const [kanArayanlar, setKanArayanlar] = useState([]);
    const [filteredKanArayanlar, setFilteredKanArayanlar] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedBloodType, setSelectedBloodType] = useState('');
    const [userSessionId, setUserSessionId] = useState('');
    const [showAlert, setShowAlert] = useState(false); 
    const isLoggedIn = localStorage.getItem('user');

    useEffect(() => {
        const fetchBeneficiaries = async (sessionId) => {
            try {
                const url = 'http://localhost:5093/api/User/get-beneficiaries';
                const turkeyApiUrl = 'https://turkiyeapi.dev/api/v1/provinces/';
                const body = { value: sessionId };

                const response = await axios.post(url, body);
                if (response.status === 200) {
                    const beneficiariesWithCoords = await Promise.all(response.data.map(async (kanArayan) => {
                        try {
                            const cityCode = kanArayan.city;
                            const provinceResponse = await axios.get(`${turkeyApiUrl}${cityCode}`);
                            const { latitude, longitude } = provinceResponse.data.data.coordinates;
                            return {
                                ...kanArayan,
                                lat: latitude,
                                lng: longitude
                            };
                        } catch (error) {
                            console.error(`Error fetching coordinates for city code ${kanArayan.city}:`, error);
                            return {
                                ...kanArayan,
                                lat: Math.random() * (42 - 36) + 36,
                                lng: Math.random() * (45 - 26) + 26
                            };
                        }
                    }));

                    setKanArayanlar(beneficiariesWithCoords);
                    setFilteredKanArayanlar(beneficiariesWithCoords);
                } else {
                    console.log('Unexpected status code:', response.status);
                }
            } catch (error) {
                console.error('Error fetching beneficiaries:', error);
            }
        };

        const sessionId = localStorage.getItem('session');
        setUserSessionId(sessionId);
        fetchBeneficiaries(sessionId);
    }, []);

    useEffect(() => {
        filterBeneficiaries();
    }, [selectedCity, selectedBloodType, kanArayanlar]);

    const filterBeneficiaries = () => {
        let filtered = kanArayanlar;

        if (selectedCity) {
            const selectedCityObj = getCities().cities.find(city => city.name.trim().toLowerCase() === selectedCity.trim().toLowerCase());
            if (selectedCityObj) {
                filtered = filtered.filter(kanArayan => kanArayan.city.trim() === selectedCityObj.id.trim());
            }
        }

        if (selectedBloodType && selectedBloodType !== 'Hepsi') {
            filtered = filtered.filter(kanArayan => kanArayan.bloodType === selectedBloodType);
        }

        setFilteredKanArayanlar(filtered);
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

    const handleFinishRequest = async () => {
        try {
            const url = 'http://localhost:5093/api/Role/drop-beneficiary';
            const body = {
                value: userSessionId
            };

            const response = await axios.post(url, body);
            if (response.status === 200) {
                setFilteredKanArayanlar(filteredKanArayanlar);
                setShowAlert(true); 
            } else {
                console.log('Beklenmeyen durum kodu:', response.status);
            }
        } catch (error) {
            console.error('Kan arayanı kaldırırken hata oluştu:', error);
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
        window.location.reload();
    };

    return (
        <div className="container">
            <div className="row justify-content-center" style={{ paddingTop: '50px' }}>
                <div className="col-lg-12">
                    <div className="title-container">
                        <h2 className="title">Kan Arayanlar Listesi</h2>
                    </div>

                    <div className="map-container" style={{ height: '400px', marginBottom: '20px' }}>
                        <MapComponent kanArayanlar={filteredKanArayanlar} getCityName={getCityName} getDistrictName={getDistrictName} />
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
                                    <th>Açıklama</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredKanArayanlar.map((kanArayan, index) => (
                                    <tr key={index}>
                                        <td>{kanArayan.firstName} {kanArayan.lastName}</td>
                                        <td>{kanArayan.email}</td>
                                        <td>{getCityName(kanArayan.city)}</td>
                                        <td>{getDistrictName(kanArayan.district)}</td>
                                        <td>{getFriendlyBloodType(kanArayan.bloodType)}</td>
                                        <td>{kanArayan.donationDescription}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {isLoggedIn && (
                        <div className="finish-request-container">
                            <button className="btn btn-danger" onClick={handleFinishRequest}>
                                Kan alma işlemimi tamamladım. Kan arayanlar listesinden çıkmak istiyorum.
                            </button>
                        </div>
                    )}

                    {showAlert && (
                        <div className="alert-container">
                            <div className="alert-box">
                                <p>Kan arayanlar listesinden kaldırıldınız.</p>
                                <button onClick={closeAlert} className="btn btn-primary">Tamam</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default KanArayanlarListesi;
