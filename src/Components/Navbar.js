import { useRef, useState } from "react";
import { FaBars, FaTimes, FaHome, FaUser } from "react-icons/fa";
import "../Components/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
    const navRef = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('user');

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
        setIsMenuOpen(!isMenuOpen);
    };

    const closeNavbar = () => {
        navRef.current.classList.remove("responsive_nav");
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
        const url = 'http://localhost:5093/api/Authentication/logout';
        axios.get(url)
            .then(response => {
                if (response.status === 200) {
                    console.log("Successfully logged out");
                    navigate('/');
                } else {
                    console.log("Error Status : " + response.status);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <header>
            <img src="img/logo.png" alt="Logo" className="logo" />

            <nav ref={navRef}>
                <Link to="/" onClick={closeNavbar}><FaHome /></Link>
                <Link to="/bagisciol" onClick={closeNavbar}>Bağışçı Ol</Link>
                <Link to="/aliciol" onClick={closeNavbar}>Alıcı Ol</Link>
                <Link to="/bagiscilistesi" onClick={closeNavbar}>Bağışçı Listesi</Link>
                <Link to="/kanarayanlarlistesi" onClick={closeNavbar}>Kan Arayanlar Listesi</Link>
                <Link to="/nedenkanvermeliyiz" onClick={closeNavbar}>Neden Kan Vermeliyiz?</Link>
                <Link to="/bizeulasin" onClick={closeNavbar}>Bize Ulaşın</Link>
                <Link to="/sss" onClick={closeNavbar}>S.S.S.</Link>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}><FaTimes /></button>

                {/* Kullanıcı giriş yapmışsa sadece Çıkış Yap butonunu göster */}
                {isLoggedIn && (
                    <div className="header-login-register">
                        <button className="nav-link login-bg" onClick={handleLogout}>Çıkış Yap</button>
                        <Link to="/profile" className="profile-icon-container" onClick={closeNavbar}>
                            <FaUser />
                        </Link>
                    </div>
                )}

                {/* Kullanıcı giriş yapmamışsa Giriş Yap ve Kayıt Ol linklerini göster */}
                {!isLoggedIn && (
                    <div className="header-login-register">
                        <Link to="/girisyap" className="nav-link login-bg" onClick={closeNavbar}>Giriş Yap</Link>
                        <Link to="/kayitol" className="nav-link register-bg" onClick={closeNavbar}>Kayıt Ol</Link>
                    </div>
                )}
            </nav>

            <button className="nav-btn" onClick={showNavbar}><FaBars /></button>
        </header>
    );
}

export default Navbar;