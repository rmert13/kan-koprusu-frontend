import '../styles/sifremidegistir.css';
import React, { useState } from 'react';

function SifremiDegistir() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (newPassword.length < 6) {
            setErrorMessage('Şifreniz en az 6 karakter olmalıdır.');
            return;
        }
        if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/.test(newPassword)) {
            setErrorMessage('Şifreniz en az bir büyük harf, bir küçük harf ve bir sayı içermelidir.');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setErrorMessage('Yeni şifreniz tekrarıyla eşleşmiyor.');
            return;
        }
        
    };

    return (
        <div className="col-lg-8">
            <form id="sifreYenileForm" onSubmit={handleSubmit} noValidate>
                <div>
                    <div className="row mb-3">
                        <div className="col-lg-3 d-flex align-items-center justify-content-end fw-semibold text-body">
                            Mevcut Şifre <i className="fa fa-lock mx-1 fs-5 mt-1"></i>:
                        </div>
                        <div className="col-lg-7">
                            <input
                                type="password"
                                name="eskiSifre"
                                className="form-control"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-lg-3 d-flex align-items-center justify-content-end fw-semibold text-body">
                            Yeni Şifre <i className="fa fa-lock mx-1 fs-5 mt-1"></i>:
                        </div>
                        <div className="col-lg-7">
                            <input
                                type="password"
                                name="yeniSifre"
                                className="form-control"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-lg-3 d-flex align-items-center justify-content-end fw-semibold text-body">
                            Yeni Şifre Tekrar <i className="fa fa-lock mx-1 fs-5 mt-1"></i>:
                        </div>
                        <div className="col-lg-7">
                            <input
                                type="password"
                                name="yeniSifreTekrar"
                                className="form-control"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <p className="description">
                        Şifreniz en az 6 karakter, en az bir büyük harf, bir küçük harf ve bir sayı veya özel karakter içermelidir.
                    </p>
                    {errorMessage && <div className="error">{errorMessage}</div>}
                    <div className="row d-flex justify-content-center mt-5">
                        <div className="col-lg-5">
                            <button className="btn btn-danger custom-button">Şifremi Değiştir</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SifremiDegistir;
