import React, { useState } from 'react';
import './Album.css'; // Stil dosyanızı ekleyin

function Album() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const openModal = (image) => {
    setModalOpen(true);
    setModalImage(image);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage('');
  };

  const handleModalClick = (e) => {
    if (e.target.id === 'modal') {
      closeModal();
    }
  };

  return (
    <div className="Album">
      <div className="album-title-wrapper">
        <h2 className="album-title">Dünyada Ve Türkiye'de Kan Bağışı ile İlgili İstatistiksel Veriler</h2>
      </div>
      <div className="stats-wrapper">
        <div className="stats-container">
        <div className="stat-card" onClick={() => openModal("/img/dunyagenel.png")}>
            <img src="/img/dunyagenel.png" alt="Stat 1" className="stat-img" />
          </div>
          <div className="stat-card" onClick={() => openModal("/img/baziulkeler.jpg")}>
            <img src="/img/baziulkeler.jpg" alt="Stat 2" className="stat-img" />
          </div>
          <div className="stat-card" onClick={() => openModal("/img/DunyadaCinsiyete.png")}>
            <img src="/img/DunyadaCinsiyete.png" alt="Stat 3" className="stat-img" />
          </div>
          <div className="stat-card" onClick={() => openModal("/img/DunyadaGonullu.png")}>
            <img src="/img/DunyadaGonullu.png" alt="Stat 4" className="stat-img" />
          </div>
          <div className="stat-card" onClick={() => openModal("/img/CinsiyetTR.png")}>
            <img src="/img/CinsiyetTR.png" alt="Stat 5" className="stat-img" />
          </div>
          <div className="stat-card" onClick={() => openModal("/img/Slide.jpg")}>
            <img src="/img/Slide.jpg" alt="Stat 6" className="stat-img" />
          </div>
        </div>
      </div>
      {modalOpen && (
        <div id="modal" className="modal" style={{ display: modalOpen ? 'block' : 'none' }} onClick={handleModalClick}>
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="modal-content" src={modalImage} alt="Modal" />
        </div>
      )}
    </div>
  );
}

export default Album;