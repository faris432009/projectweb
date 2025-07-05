'use client';
import React, { useState, useEffect } from 'react';
import './banners.css';

const BannersPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const openModal = (src) => {
    setModalImage(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage('');
  };

  useEffect(() => {
    const faders = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    faders.forEach((fade) => observer.observe(fade));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ paddingTop: '50px', paddingBottom: '50px' }}>
      {/* قسم البنرات */}
      <div className="banners-section fade-in">
        <div className="banners-content">
          <img src="/images/20.jpg" className="banners-img" alt="تصميم بنرات" loading="lazy" />
          <div className="banners-text">
            <h3>بنرات إعلانية مميزة</h3>
            <ul>
              <li>تصميمات مخصصة تتناسب مع هويتك التجارية</li>
              <li>خامات متينة: فينيل، قماش، أو بلاستيك</li>
              <li>بنرات للمعارض، المتاجر، والمناسبات</li>
              <li>أحجام متنوعة: صغيرة، متوسطة، أو كبيرة</li>
              <li>طباعة عالية الدقة بألوان زاهية</li>
              <li>تسليم سريع لتلبية احتياجاتك الإعلانية</li>
            </ul>
            <p>سواء كنت تخطط لمعرض أو حملة إعلانية، دعنا نساعدك في تصميم بنر يبرز رسالتك. تواصل معنا الآن!</p>
          </div>
        </div>
      </div>

      {/* المعرض */}
      <div className="gallery-section fade-in">
        <h3>معرض تصميمات البنرات</h3>
        <div className="gallery-grid">
          <div className="gallery-item" onClick={() => openModal('/images/19.jpg')}>
            <img src="/images/19.jpg" alt="تصميم بنر 1" loading="lazy" />
          </div>
          <div className="gallery-item" onClick={() => openModal('/images/21.jpg')}>
            <img src="/images/21.jpg" alt="تصميم بنر 2" loading="lazy" />
          </div>
          <div className="gallery-item" onClick={() => openModal('/images/22.jpg')}>
            <img src="/images/22.jpg" alt="تصميم بنر 3" loading="lazy" />
          </div>
        </div>
      </div>

      {/* زر العودة */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <a
          href="/"
          style={{
            display: 'inline-block',
            backgroundColor: '#ffcc00',
            color: 'black',
            padding: '0.8rem 1.5rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '1rem',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#e6b800')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#ffcc00')}
        >
          العودة للقائمة الرئيسية
        </a>
      </div>

      {/* نافذة الصورة */}
      {modalOpen && (
        <div className="modal" onClick={closeModal} style={{ display: 'flex' }}>
          <span className="close" onClick={closeModal}>×</span>
          <img className="modal-content loaded" src={modalImage} alt="معاينة" />
        </div>
      )}
    </div>
  );
};

export default BannersPage;
