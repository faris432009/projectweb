'use client';
import React, { useEffect, useState } from 'react';
import './page.css';

const Page = () => {
  const [modalSrc, setModalSrc] = useState('');
  const [showModal, setShowModal] = useState(false);

  const openModal = (src) => {
    setModalSrc(src);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalSrc('');
  };

  useEffect(() => {
    const faders = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    faders.forEach(fade => observer.observe(fade));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* قسم المنيوهات */}
      <div className="menus-section fade-in">
        <div className="menus-content">
          <img src="/images/16.jpg" className="menus-img" alt="تصميم منيوهات" loading="lazy" />
          <div className="menus-text">
            <h3>منيوهات أنيقة للمطاعم والكافيهات</h3>
            <p>
              في مطبعة الصادق، نقدم تصميمات منيوهات احترافية وجذابة تلبي احتياجات المطاعم والكافيهات بجودة عالية وتصميمات مبتكرة.
            </p>
            <ul>
              <li>تصميمات مخصصة تعكس هوية مطعمك</li>
              <li>خامات متينة: ورق مقاوم أو بلاستيك مغلف</li>
              <li>منيوهات للمطاعم، الكافيهات، والمناسبات</li>
              <li>خيارات متنوعة: مطوية، مفردة، أو متعددة الصفحات</li>
              <li>طباعة بألوان زاهية وتفاصيل دقيقة</li>
              <li>تسليم سريع لتجهيز منيوهاتك في الوقت المناسب</li>
            </ul>
            <p>سواء كنت تدير مطعمًا أو كافيه، دعنا نساعدك في تصميم منيو يجذب زبائنك. تواصل معنا الآن!</p>
          </div>
        </div>
      </div>

      {/* المعرض */}
      <div className="gallery-section fade-in">
        <h3>معرض تصميمات المنيوهات</h3>
        <div className="gallery-grid">
          {['15.jpg', '17.jpg', '18.jpg'].map((img, idx) => (
            <div key={idx} className="gallery-item" onClick={() => openModal(`/images/${img}`)}>
              <img src={`/images/${img}`} alt={`تصميم منيو ${idx + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* زر العودة للقائمة الرئيسية */}
      <div className="back-button-wrapper">
        <a href="/" className="back-button">العودة للقائمة الرئيسية</a>
      </div>

      {/* المودال */}
      {showModal && (
        <div className="modal" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <span className="close" onClick={closeModal}>×</span>
          <img className="modal-content loaded" src={modalSrc} alt="عرض موسع" />
        </div>
      )}
    </div>
  );
};

export default Page;
