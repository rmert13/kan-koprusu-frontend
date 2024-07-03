import React, { useState } from "react";
import '../styles/aliciol.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AliciOl() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('user');

    const [confirmVisible, setConfirmVisible] = useState(false);
    const [showLoginWarning, setShowLoginWarning] = useState(false);
    const [donationDescription, setDonationDescription] = useState("");
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

        
        navigate('/kanarayanlarlistesi');
    };

    const handleConfirm = async () => {
        const sessionId = localStorage.getItem('session');

        
        const becomeBeneficiaryUrl = 'http://localhost:5093/api/Role/become-beneficiary';
        const becomeBeneficiaryBody = { value: sessionId };

        try {
            const becomeBeneficiaryResponse = await axios.post(becomeBeneficiaryUrl, becomeBeneficiaryBody);
            if (becomeBeneficiaryResponse.status === 200) {
                console.log("Beneficiary request success");

                
                const donationDescriptionUrl = 'http://localhost:5093/api/User/set-donation-description';
                const donationDescriptionBody = {
                    donationDescription: donationDescription,
                    sessionId: sessionId
                };

                const donationDescriptionResponse = await axios.post(donationDescriptionUrl, donationDescriptionBody);
                if (donationDescriptionResponse.status === 200) {
                    console.log("Donation description set successfully");
                    setShowSuccessMessage(true); 
                } else {
                    console.error('Error setting donation description:', donationDescriptionResponse);
                }
            } else {
                console.error('Unexpected status code:', becomeBeneficiaryResponse.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="alici-ol-container">
            <h2>Kan Arıyorum</h2>
            <p>"Kan İhtiyacını Paylaş" butonuna tıklayarak, Kan Arayanlar Listesine eklenebilirsiniz.</p>
            <p><strong>Not:</strong> Kan Arayanlar Listesinde görüntülenecek bilgiler, Profil kısmınızda yer alan "Bilgilerim" menüsündeki bilgilerinizden alınacaktır. Eğer bir hata varsa, lütfen "Bilgilerim" menüsünden bilgilerinizi güncelleyiniz.</p>

            {!isLoggedIn && showLoginWarning && (
                <p style={{ color: 'red', textAlign: 'center' }}>Lütfen önce giriş yapınız.</p>
            )}

            {isLoggedIn && (
                <div className="donation-description-container">
                    <label htmlFor="donationDescription" className="bold-label">Kan talebi ihtiyacınızı açıklayınız:</label>
                    <textarea
                        id="donationDescription"
                        value={donationDescription}
                        onChange={e => setDonationDescription(e.target.value)}
                        className="form-control"
                        rows="4"
                        placeholder="Açıklamanızı buraya yazınız."
                    />
                </div>
            )}

            <button className="start-button" onClick={handleConfirmClick}>Kan İhtiyacını Paylaş!</button>

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
                    <p>Talebiniz Başarıyla Kan Arayanlar Listesine Gönderilmiştir!</p>
                    <button className="close-button" onClick={handleClose}>Kapat</button>
                </div>
            )}
        </div>
    );
}

export default AliciOl;
