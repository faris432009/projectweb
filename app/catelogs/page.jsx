'use client';
import React, { useEffect, useRef, useState } from 'react';
import './catalogs.css';

const CatalogsPage = () => {
  const [modalSrc, setModalSrc] = useState(null);
  const [products, setProducts] = useState([]);
  const modalRef = useRef(null);

  const openModal = (src) => {
    if (modalRef.current) {
      modalRef.current.style.display = 'flex';
      setModalSrc(src);
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.style.display = 'none';
      setModalSrc(null);
    }
  };

  useEffect(() => {
    const modalClick = (e) => {
      if (e.target === modalRef.current) {
        closeModal();
      }
    };

    const modalElement = modalRef.current;
    modalElement?.addEventListener("click", modalClick);
    return () => modalElement?.removeEventListener("click", modalClick);
  }, []);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const catalogs = data.filter(item => item.category === "كتلوج");
        setProducts(catalogs);
      } catch (error) {
        console.error("خطأ في جلب بيانات الكتالوجات:", error);
      }
    };

    fetchCatalogs();
  }, []);

  return (
    <div className="catalogs-section fade-in">
      {/* وصف القسم */}
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
          {products.length === 0 ? (
            <p className="no-data">لا توجد تصميمات متاحة حالياً.</p>
          ) : (
            products.map((product, index) => (
              <div
                key={product.id || index}
                className="gallery-item"
                onClick={() => openModal(product.image)}
              >
                <img
                  src={product.image}
                  alt={product.name ||` كتالوج ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* زر العودة */}
      <div className="back-button-container">
        <a href="/" className="back-to-main">العودة للقائمة الرئيسية</a>
      </div>

      {/* نافذة المعاينة */}
      <div className="modal" ref={modalRef}>
        <span className="close" onClick={closeModal}>×</span>
        {modalSrc && (
          <img src={modalSrc} className="modal-content loaded" alt="معاينة" />
        )}
      </div>
    </div>
  );
};

export default CatalogsPage;