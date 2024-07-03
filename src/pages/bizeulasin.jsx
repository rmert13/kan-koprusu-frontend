import React, { useState } from "react";
import '../styles/bizeulasin.css';
import emailjs from 'emailjs-com'; 

function BizeUlasin() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        message: ''
    });

    const [isSent, setIsSent] = useState(false); 
    const [formErrors, setFormErrors] = useState({
        name: false,
        surname: false,
        email: false,
        message: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        setFormErrors({
            ...formErrors,
            [name]: false
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        
        let hasErrors = false;
        const newFormErrors = {
            name: formData.name === '',
            surname: formData.surname === '',
            email: formData.email === '',
            message: formData.message === ''
        };

        
        setFormErrors(newFormErrors);

        
        for (const error in newFormErrors) {
            if (newFormErrors[error]) {
                hasErrors = true;
            }
        }

        if (hasErrors) {
            return;
        }

        
        emailjs.sendForm('service_v3nmt8c', 'template_hhi8x3l', e.target, 'lQrPGNEevARC_jAnN')
            .then((result) => {
                console.log(result.text);
                setIsSent(true); 
            }, (error) => {
                console.error(error.text);
                alert('Bir hata oluştu, lütfen tekrar deneyin.');
            });
    };

    const handleCloseMessage = () => {
        setIsSent(false); 
    };

    return (
        <div className="iletisim">
            <div className="left-section">
                <h2><strong> Bize Ulaşın</strong></h2>
                <p>Kan Köprüsü ile ilgili öneri, istek ve görüşlerinizi dinlemeye hazırız.<br />
                    Eğer sorunuzun cevabını Sıkça Sorulan Sorular bölümünde bulamadıysanız bizimle iletişime geçmek için aşağıdaki iletişim formunu doldurabilirsiniz.<br />
                    En kısa sürede sizinle iletişime geçilecektir.<br />
                    İlginiz için teşekkür ederiz.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="bold-label">Adınız:</label><br />
                        <input type="text" name="name" className={`form-control ${formErrors.name ? 'error' : ''}`} onChange={handleChange} />
                        {formErrors.name && <span className="error-text">*</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="surname" className="bold-label">Soyadınız:</label><br />
                        <input type="text" name="surname" className={`form-control ${formErrors.surname ? 'error' : ''}`} onChange={handleChange} />
                        {formErrors.surname && <span className="error-text">*</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email" className="bold-label">E-posta:</label><br />
                        <input type="email" name="email" className={`form-control ${formErrors.email ? 'error' : ''}`} onChange={handleChange} />
                        {formErrors.email && <span className="error-text">*</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="message" className="bold-label">Mesajınız:</label><br />
                        <textarea name="message" rows="4" className={`form-control ${formErrors.message ? 'error' : ''}`} onChange={handleChange}></textarea>
                        {formErrors.message && <span className="error-text">*</span>}
                    </div>
                    
                    <button type="submit" className="btn btn-danger">
                        Gönder
                    </button>
                </form>
                
                {isSent && (
                    <div className="success-message">
                        <p>Mesajınız başarıyla gönderildi!</p>
                        <button className="close-btn" onClick={handleCloseMessage}>
                            Kapat
                        </button>
                    </div>
                )}

                {formErrors.name || formErrors.surname || formErrors.email || formErrors.message ? (
                    <div className="error-box">
                        <p>Lütfen tüm alanları doldurun.</p>
                    </div>
                ) : null}
            </div>

            <div className="right-section">
                <h3><strong>İletişim Bilgileri</strong></h3>
                <p><strong>Adres:</strong> Alanya/ANTALYA</p>
                <p><strong>Telefon:</strong> 0538 055 8504 / 0532 494 2906</p>
                <p><strong>E-posta:</strong> <a href="mailto:kankoprusu@gmail.com">kankoprusu@gmail.com</a></p>
            </div>
        </div>
    );
}

export default BizeUlasin;
