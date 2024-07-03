import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Anasayfa from './pages/anasayfa';
import NedenKanVermeliyiz from './pages/nedenkanvermeliyiz';
import BagisciListesi from './pages/bagiscilistesi';
import BagisciOl from "./pages/bagisciol";
import KanArayanlarListesi from "./pages/kanarayanlarlistesi";
import BizeUlasin from "./pages/bizeulasin";
import SSS from "./pages/sss";
import GirisYap from "./pages/girisyap";
import KayitOl from "./pages/kayitol";
import Profile from "./pages/profile";
import SifremiDegistir from "./pages/sifremidegistir";
import Oduller from "./pages/oduller";
import KanBagislarim from "./pages/kanbagislarim";
import AliciOl from "./pages/aliciol";
import Bilgilerim from "./pages/bilgilerim";
import Footer from "./Components/footer";
import Logout from './pages/logout';


function App() {
    return (
        <Router>
            <div className="app-container">
                <div className="content-wrap">
                    <Routes>
                        {/* KayitOl ve Giriş yap sayfalarında Navbar'ı gizledik */}
                        <Route path="/kayitol" element={<KayitOl />} />
                        <Route path="/girisyap" element={<GirisYap />} />
                        <Route path="/" element={<div><Navbar /><Anasayfa /></div>} />
                        <Route path="/bagisciol" element={<div><Navbar /><BagisciOl /></div>} />
                        <Route path="/aliciol" element={<div><Navbar /><AliciOl /></div>} />
                        <Route path="/bagiscilistesi" element={<div><Navbar /><BagisciListesi /></div>} />
                        <Route path="/kanarayanlarlistesi" element={<div><Navbar /><KanArayanlarListesi /></div>} />
                        <Route path="/nedenkanvermeliyiz" element={<div><Navbar /><NedenKanVermeliyiz /></div>} />
                        <Route path="/bizeulasin" element={<div><Navbar /><BizeUlasin /></div>} />
                        <Route path="/sss" element={<div><Navbar /><SSS /></div>} />
                        <Route path="/logout" element={<div><Navbar /><Logout /></div>} />


                        {/* Profil */}
                        <Route path="/profile" element={<div><Navbar /><Profile /></div>} />
                        <Route path="/bilgilerim" element={<div><Navbar /><Bilgilerim /></div>} />
                        <Route path="/kanbagislarim" element={<div><Navbar /><KanBagislarim /></div>} />
                        <Route path="/oduller" element={<div><Navbar /><Oduller /></div>} />
                        <Route path="/sifremidegistir" element={<div><Navbar /><SifremiDegistir /></div>} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}
 
export default App;
