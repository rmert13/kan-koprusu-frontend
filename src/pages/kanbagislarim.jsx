import React from "react";
import '../styles/kanbagislarim.css';

function KanBagislarim() {
    return(
        <div className="custom-container">
            <h2 className="custom-heading">Kan Bağışlarım</h2>
            <p>Merhaba,</p>
            <p>
                Kan bağışı yaparak insan hayatına değerli bir katkıda bulundunuz, bu çok değerli bir adımdır. Bağışladığınız kanın insanlara umut olması için önemli bir adım attınız.
            </p>
            <p>
                Kan bağışı yapmanızı sağlıklı bir şekilde gerçekleştirdiğiniz için tebrik ederiz. Bağışladığınız kanın hayat kurtaran yolculuğunu merak ediyorsanız, Türk Kızılayı'nın resmi internet sitesinden kan bağışı süreci hakkında detaylı bilgi alabilirsiniz.
            </p>
            <p>
                Bilgilerinizi görmek istiyorsanız, lütfen <a href="https://bagis.kizilay.org.tr/tr/bagis/kanbagis" target="_blank" rel="noopener noreferrer">Türk Kızılayı Resmi Kan Bağışı Sayfası</a> linkini ziyaret edin.
            </p>
            <p>
                Yaptığınız bağışla umut ışığını daha fazla insanla paylaştığınız için teşekkür ederiz.
            </p>
            <p>
                Sağlıklı günler dileriz.
            </p>
        </div>
    );
}

export default KanBagislarim;
