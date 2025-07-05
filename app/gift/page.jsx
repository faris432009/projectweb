'use client';
import React, { useState } from 'react';
import './GiftsPage.css';

const GiftsPage = () => {
  const [modalImage, setModalImage] = useState(null);

  const openModal = (imgSrc) => {
    setModalImage(imgSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="container">
      {/* محتوى الهدايا */}
      <div className="gifts-section">
        <div className="gifts-flex">
          <img
            src="/images/35.jpg"
            alt="تصميم هدايا دعائية"
            className="gifts-image"
          />
          <div className="gifts-text">
            <h3>هدايا دعائية مبتكرة ومميزة</h3>
            <p>
              في مطبعة الصادق، نقدم هدايا دعائية مخصصة تساعدك على تعزيز علامتك التجارية وترك انطباع دائم لدى عملائك وشركائك بتصميمات عصرية وجودة عالية.
            </p>
            <ul>
              <li>تصميمات مخصصة تحمل شعارك وهوية علامتك التجارية</li>
              <li>خامات متنوعة: أقلام، أكواب، مفكرات، ومنتجات تقنية</li>
              <li>مناسبة للمعارض التجارية والفعاليات الترويجية</li>
              <li>خيارات متعددة: أحجام وألوان تناسب احتياجاتك</li>
              <li>طباعة دقيقة بتقنيات حديثة لضمان الجودة</li>
              <li>تسليم سريع لدعم حملاتك التسويقية</li>
            </ul>
            <p>
              سواء كنت تبحث عن هدايا للعملاء أو موظفيك، دعنا نساعدك في تصميم هدايا دعائية تعكس رؤيتك وتعزز حضورك في السوق. تواصل معنا الآن!
            </p>
          </div>
        </div>

        {/* المعرض */}
        <div className="gallery">
          <h3>معرض تصميمات الهدايا الدعائية</h3>
          <div className="gallery-grid">
            {['35.jpg', '36.jpg', '34.jpg'].map((img, i) => (
              <div
                className="gallery-item"
                key={i}
                onClick={() => openModal(`/images/${img}`)}
              >
                <img src={`/images/${img}`} alt={`هدية ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* زر العودة */}
      <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '30px' }}>
        <a href="/" className="return-button">العودة للصفحة الرئيسية</a>
      </div>

      {/* Modal */}
      {modalImage && (
        <div className="modal-overlay">
          <span className="modal-close" onClick={closeModal}>×</span>
          <img src={modalImage} alt="مكبر" className="modal-image" />
        </div>
      )}
    </div>
  );
};

export default GiftsPage;
