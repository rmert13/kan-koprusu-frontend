import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '../Components/Slideshow.css';

const Slideshow = () => {
  const images = [
    "/img/anasayfa.png",
    "/img/anasayfa2.png",
    "/img/anasayfa4.png",
  ];

  return (
    <div className="slideshow-container">
      <Slide
        autoplay={true} // Otomatik oynatma
        duration={3000} // Her slaytın gösterim süresi
      >
        {images.map((image, index) => (
          <div className="each-slide-effect" key={index}>
            <div className="each-slide-effect-inner">
              <img src={image} alt={`slide-${index}`} />
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
