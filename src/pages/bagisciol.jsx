import React, { useState } from "react";
import '../styles/bagisciol.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function BagisciOl() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('user');

    const [confirmVisible, setConfirmVisible] = useState(false);
    const [showLoginWarning, setShowLoginWarning] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); 

    const handleConfirmClick = () => {
        if (!isLoggedIn) {
            setShowLoginWarning(true);
        } else {
            setConfirmVisible(true);
        }
    };

    const handleClose = () => {
        setConfirmVisible(false);
        setShowLoginWarning(false);
        setShowSuccessMessage(false); 

        navigate('/bagiscilistesi');
    };

    const handleConfirm = () => {
        const url = 'http://localhost:5093/api/Role/become-donor';
        const sessionId = localStorage.getItem('session');

        const body = {
            "value": sessionId
        }
    
        axios.post(url, body)
        .then(response => {
            if (response.status === 200) {
                console.log("Success");
                setShowSuccessMessage(true); 
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="bagisci-ol-container">
            <h2>Kan Bağışçısı Ol</h2>
            <p>Kan bağışçısı olarak hayat kurtarmak ister misiniz? <br/>"Hayat Kurtar!" butonuna tıklayarak, Bağışçı Listesine eklenebilirsiniz.</p>
            <p><strong>Not:</strong> Bağışçı Listesinde görüntülenecek bilgiler, Profil kısmınızda yer alan "Bilgilerim" menüsündeki bilgilerinizden alınacaktır. Eğer bir hata varsa, lütfen "Bilgilerim" menüsünden bilgilerinizi güncelleyiniz.</p>
            
            {}
            {!isLoggedIn && showLoginWarning && (
                <p style={{ color: 'red', textAlign: 'center' }}>Lütfen önce giriş yapınız.</p>
            )}

            <button className="start-button" onClick={handleConfirmClick}>Hayat Kurtar!</button>

            {confirmVisible && (
                <div className="confirm-box">
                    <h3>Emin misiniz?</h3>
                    <p>Bu işlemi gerçekleştirmek istediğinize emin misiniz?</p>
                    <button className="confirm-button" onClick={handleConfirm}>Evet</button>
                    <button className="cancel-button" onClick={handleClose}>Hayır</button>
                </div>
            )}

            {}
            {showSuccessMessage && (
                <div className="success-message">
                    <p>Talebiniz Başarıyla Bağışçı Listesine Gönderilmiştir!</p>
                    <button className="close-button" onClick={handleClose}>Kapat</button>
                </div>
            )}
        </div>
    );
}

export default BagisciOl;
