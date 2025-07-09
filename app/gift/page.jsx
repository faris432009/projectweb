'use client';
import React, { useEffect, useState } from 'react';
import './GiftsPage.css';

const GiftsPage = () => {
  const [modalImage, setModalImage] = useState(null);
  const [gifts, setGifts] = useState([]);

  const openModal = (imgSrc) => {
    setModalImage(imgSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const filtered = data.filter(item => item.category === 'هدايا دعائية');
        setGifts(filtered);
      } catch (err) {
        console.error('خطأ أثناء جلب بيانات الهدايا:', err);
      }
    };

    fetchGifts();
  }, []);

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
            {gifts.length === 0 ? (
              <p className="no-data">لا توجد هدايا دعائية حالياً.</p>
            ) : (
              gifts.map((gift, i) => (
                <div
                  className="gallery-item"
                  key={gift.id || i}
                  onClick={() => openModal(gift.image)}
                >
                  <img src={gift.image} alt={gift.name ||` هدية ${i + 1}`} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* زر العودة */}
      <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '30px' }}>
        <a href="/" className="return-button">العودة للصفحة الرئيسية</a>
      </div>

      {/* Modal */}
      {modalImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <span className="modal-close" onClick={closeModal}>×</span>
          <img src={modalImage} alt="مكبر" className="modal-image" />
        </div>
      )}
    </div>
  );
};

export default GiftsPage;