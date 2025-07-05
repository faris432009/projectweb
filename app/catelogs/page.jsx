'use client';
import React, { useEffect, useRef, useState } from 'react';
import './catalogs.css';

const CatalogsPage = () => {
  const [modalSrc, setModalSrc] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const modalClick = (e) => {
      if (e.target === modalRef.current) {
        closeModal();
      }
    };

    const modalElement = modalRef.current;
    modalElement?.addEventListener("click", modalClick);

    return () => {
      modalElement?.removeEventListener("click", modalClick);
    };
  }, []);

  const openModal = (src) => {
    if (modalRef.current) {
      modalRef.current.style.display = "flex";
      setModalSrc(src);
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.style.display = "none";
      setModalSrc(null);
    }
  };

  return (
    <div className="catalogs-section fade-in">
      <div className="catalogs-content">
        <img src="/images/24.jpg" alt="تصميم كتالوجات" className="catalogs-img" />
        <div className="catalogs-text">
          <h3>كتالوجات احترافية للمنتجات والخدمات</h3>
          <p>في مطبعة الصادق، نقدم تصميمات كتالوجات احترافية تعرض منتجاتك وخدماتك بأسلوب جذاب ومنظم يعزز علامتك التجارية.</p>
          <ul>
            <li>تصميمات مخصصة تتماشى مع هويتك التجارية</li>
            <li>خامات عالية الجودة: ورق لامع أو مطفي</li>
            <li>كتالوجات للشركات، المعارض، والمنتجات</li>
            <li>خيارات متنوعة: صفحة واحدة أو متعددة الصفحات</li>
            <li>طباعة بألوان زاهية وتفاصيل واضحة</li>
            <li>تسليم سريع لتلبية احتياجات عملك</li>
          </ul>
          <p>سواء كنت تحتاج كتالوجًا لمنتجاتك أو خدماتك، دعنا نساعدك في تقديمها بأفضل صورة. تواصل معنا الآن!</p>
        </div>
      </div>

      {/* المعرض */}
      <div className="gallery-section">
        <h3>معرض تصميمات الكتالوجات</h3>
        <div className="gallery-grid">
          {["23", "25", "26"].map((img, i) => (
            <div key={i} className="gallery-item" onClick={() => openModal(`/images/${img}.jpg`)}>
              <img src={`/images/${img}.jpg`} alt={`تصميم كتالوج ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* الزر في الأسفل */}
      <div className="back-button-container">
        <a href="/" className="back-to-main">العودة للقائمة الرئيسية</a>
      </div>

      {/* نافذة الصورة */}
      <div className="modal" ref={modalRef}>
        <span className="close" onClick={closeModal}>×</span>
        {modalSrc && (
          <img
            src={modalSrc}
            className="modal-content loaded"
            alt="معاينة"
          />
        )}
      </div>
    </div>
  );
};

export default CatalogsPage;
