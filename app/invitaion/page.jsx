'use client';
import React, { useEffect, useState } from 'react';
import './shields.css';

const ShieldsPage = () => {
  const [modalSrc, setModalSrc] = useState('');
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    const fetchShields = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const shields = data.filter(item => item.category === 'تكريم');
        setProducts(shields);
      } catch (error) {
        console.error('خطأ أثناء جلب بيانات الدروع:', error);
      }
    };

    fetchShields();
  }, []);

  const openModal = (src) => {
    setModalSrc(src);
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    modal.style.display = 'flex';
    modalImage.src = src;
    modalImage.classList.remove('loaded');
    modalImage.onload = () => modalImage.classList.add('loaded');
  };

  const closeModal = () => {
    setModalSrc('');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    modal.style.display = 'none';
    modalImage.src = '';
    modalImage.classList.remove('loaded');
  };

  return (
    <div>
      {/* دروع التكريم */}
      <div className="shields-section fade-in">
        <div className="shields-content">
          <img src="/images/31.jpg" alt="تصميم دروع تكريم" loading="lazy" />
          <div className="shields-text">
            <h3>دروع تكريم فاخرة ومميزة</h3>
            <p>
              في مطبعة الصادق، نقدم تصميمات دروع تكريم احترافية تعكس التميز والتقدير للأفراد والمؤسسات
              في المناسبات المختلفة بجودة عالية وأناقة لا مثيل لها.
            </p>
            <ul>
              <li>تصميمات مخصصة تتماشى مع هوية مؤسستك</li>
              <li>خامات فاخرة: أكريليك، خشب، أو معدن</li>
              <li>دروع للشركات، الجامعات، والمناسبات الرسمية</li>
              <li>خيارات متنوعة: أشكال، أحجام، ونقوش مميزة</li>
              <li>طباعة وتفاصيل دقيقة بأعلى معايير الجودة</li>
              <li>تسليم سريع لتلبية احتياجاتك</li>
            </ul>
            <p>
              سواء كنت تحتفل بإنجاز كبير أو تكرم شريكًا مميزًا، دعنا نساعدك في تصميم درع تكريم يترك انطباعًا لا يُنسى.
              تواصل معنا الآن!
            </p>
          </div>
        </div>
      </div>

      {/* المعرض */}
      <div className="gallery-section fade-in">
        <h3>معرض تصميمات دروع التكريم</h3>
        <div className="gallery-grid">
          {products.length === 0 ? (
            <p className="no-data">لا توجد تصميمات متاحة حالياً.</p>
          ) : (
            products.map((product, index) => (
              <div key={product.id || index} className="gallery-item" onClick={() => openModal(product.image)}>
                <img src={product.image} alt={product.name || ` درع ${index + 1}`} loading="lazy" />
              </div>
            ))
          )}
        </div>
      </div>

      {/* نافذة المعاينة */}
      <div className="modal" id="modal" onClick={(e) => { if (e.target.id === 'modal') closeModal(); }}>
        <span className="close" onClick={closeModal}>×</span>
        <img className="modal-content" id="modal-image" alt="عرض مكبر" />
      </div>

      {/* زر العودة */}
      <div style={{ margin: '40px 0', textAlign: 'center' }}>
        <a href="/" className="return-button">
          العودة للقائمة الرئيسية
        </a>
      </div>
    </div>
  );
};

export default ShieldsPage;