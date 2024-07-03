import React, { useState } from 'react';
import '../styles/sss.css'; 

function AccordionItem({ id, question, answer, isOpen, toggleAccordion }) {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading${id}`}>
        <button
          className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
          type="button"
          onClick={toggleAccordion}
          aria-expanded={isOpen ? "true" : "false"}
          aria-controls={`collapse${id}`}
        >
          {question}
        </button>
      </h2>
      <div
        id={`collapse${id}`}
        className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
        aria-labelledby={`heading${id}`}
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          {answer}
        </div>
      </div>
    </div>
  );
}

function SSS() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      id: 1,
      question: "Kimler kan bağışında bulunabilir?",
      answer: "18-65 yaş aralığında 50 kilogramın üzerindeki her sağlıklı birey kan bağışçısı adayı olabilir. (19 yaşından gün almak, 65’ini doldurmamak gerekir.) ..."
    },
    {
      id: 2,
      question: 'Kan Bağışı İşlemi Nasıl Gerçekleşir?',
      answer: 'Kan bağışı, bir sağlık merkezinde eğitimli bir sağlık uzmanı tarafından yapılır. Kan bağışı süreci genellikle kayıt, tıbbi geçmişin değerlendirilmesi, kan bağışı işlemi ve sonrasındadinlenme aşamalarını içerir.'
    },
    {
      id: 3,
      question: 'Kan Bağışı Yapmanın Riskleri Var mı?',
      answer: 'Kan bağışı genellikle güvenlidir ve düşük riskler taşır. Ancak,bazı kişilerde hafif baş dönmesi veya halsizlik gibi yan etkiler görülebilir.'
    },
    {
        id: 4,
          question: 'Kimler Kan Bağışında Bulunamaz?',
          answer: (
              <ul>
                  <li>Hemofili gibi kan pıhtılaşma bozukluklarına sahip olanlar kan bağışında bulunamazlar.</li>
                  <li>Aktif kanser tedavisi gören veya son altı ay içinde kanser tedavisi görmüş olanlar kan bağışı yapamazlar. Ancak, kanser tedavisi tamamlandıktan sonra ve doktorun onayı ile kan bağışı yapılabilir.</li>
                  <li>Kalp hastalığı, böbrek hastalığı, karaciğer hastalığı gibi belirli kronik hastalıkları olanlar kan bağışı yapamazlar.</li>
                  <li>Bazı ilaçlar kan bağışı yapmayı engelleyebilir veya kanın kullanımını sınırlayabilir. Özellikle kan pıhtılaşmasını etkileyen ilaçlar kan bağışı için geçici veya kalıcı bir engel teşkil edebilir.</li>
                  <li>Belirli riskli davranışlar, özellikle cinsel yolla bulaşan hastalıkların (HIV gibi) riskini artırabilir ve kan bağışı yapmayı engelleyebilir.</li>
                  <li>Belirli bir kilonun altında veya üzerinde olan kişiler kan bağışında bulunamayabilir.</li>
              </ul>
          )
      },
      
    
      {
        id: 5,
        question: 'Dövme Yaptıran Kişi Neden Kan Veremez?',
          answer: 'Dövme yaptıran kişiler, bulaşıcı hastalık sebebiyle 1 yıl sürece kan veremezler.'
      },
    
      {
        id:6,
          question:'Kan Bağışı Sonrası Ne Yapmalıyım?',
          answer: 'Kan bağışı sonrasında, hafif atıştırmalıklar tüketmek, bol su içmek ve bir süre dinlenmek önemlidir. Ayrıca, kan bağışı  sonrası belirtiler yaşarsanız (örneğin, baş dönmesi), sağlık  personeline başvurmalısınız.'
      },
    
      {
        id: 7,
          question:'Hangi aralıklarla kan bağışında bulunabilirim?',
          answer:'Tam kan bağışında;Erkekler 90 günde bir  Kadınlar 120 gün de bir kan bağışında bulunabilirler.'          
      },
    
      {
        id: 8,
          question:'Kan bağışı ne kadar sürer?',
          answer:'Yaklaşık 30-35 dakika. Süre boyunca zamanımızın çoğunu kayıt işlemleri, doktor muayenesi, kan bağışı ve ikram işlemleri almaktadır'
      },
    
      {
        id: 9,
          question:' İlaç Kullananlar Kan Bağışı Yapabilir mi?',
          answer:' Farklı şartlar altında bu sorunun cevabı değişir. Kan bağışı süreci Sağlık Bakanlığı tarafından yayınlanan rehber doğrultusunda gerçekleşmektedir. Her ilacın kullanım nedeni ve şekli için farklı karar verilir.'
      },
    
      {
        id: 10,
          question:'Kan Bağışı Sonrasında Kolum Morarır Mı?',
          answer:'Kan bağışı işlemi sona erdiğinde iğnenin çıktığı noktaya bası yapmak gerekir. Bası erken kaldırıldığında cilt yüzeyi kapansa bile damar içerisinde sızmalar devam edebilir. Sağlık personelinin belirtiği süre boyunca kola bası uygulamak olası morlukları engelleyecektir.'
      },
    
      {
        id: 11,
          question:'Kan bağışı sırasında hastalık bulaşma riski var mı?',
          answer:'Hayır bulaşmaz.Kan bağışı işlemi boyunca kullanılan tüm malzemeler tek kullanımlık ve sterildir. Sizler için kullanılan  malzemeler işlem sonunda yasal yükümlülüklere uygun şekilde imha edilirler. Bu süreç içerisinde herhangi bir hastalık bulaşması söz konusu değildir.'
      },
    
      {
        id: 12,
          question:'Kan Vermenin Yan Etkisi Var Mı?',
          answer:' Kan bağışı basit bir işlemdir. Sıvı kaybına bağlı hafif veya geçici süreli etki yaşanabilir.'
      },
      {
        id: 13,
        question:' Sarılık geçirenler kan bağışında bulunabilir mi?',
        answer:'Hepatit A ve Hepatit E enfeksiyonu geçirenler tedavi sürecini tamamlanmasının ardından 12 ay geçtikten sonra kan bağışında bulunabilir. Hepatit B ve C geçirenler ise tedavilerini tamamlamış olsalar dahi maalesef hiçbir zaman kan bağışında bulunamazlar.'
    }
    
    // Diğer sorular buraya eklenecek
  ];

  return (
    <div className="container mt-5 mb-5">
         <h2 className="custom-heading" > Sıkça Sorulan Sorular</h2>
      <div className="custom-div" >
        <div className="accordion" id="accordionExample">
          {faqData.map((item, index) => (
            <AccordionItem 
              key={item.id} 
              id={item.id} 
              question={item.question} 
              answer={item.answer} 
              isOpen={activeIndex === index} 
              toggleAccordion={() => toggleAccordion(index)} 
            />
          ))}
        </div>
        <div className="toggle">
          <label className="heading-title heading-border heading-color"></label>
          <div className="toggle-content">
            <p className="clearfix"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SSS;
