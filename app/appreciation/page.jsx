'use client';
import React, { useEffect, useState } from 'react';
import './certificates.css';

const CertificatesPage = () => {
  const [modalImage, setModalImage] = useState(null);
  const [certificates, setCertificates] = useState([]);

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
    return () => faders.forEach((fade) => observer.unobserve(fade));
  }, []);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const filtered = data.filter(item => item.category === 'شهادة تقدير');
        setCertificates(filtered);
      } catch (error) {
        console.error('فشل في تحميل بيانات الشهادات:', error);
      }
    };

    fetchCertificates();
  }, []);

  const openModal = (src) => {
    setModalImage(src);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div>
      {/* قسم شهادات التقدير */}
      <div className="certificates-section fade-in">
        <div className="certificates-content">
          <img src="/images/29.jpg" alt="شهادة تقدير" loading="lazy" />
          <div className="certificates-text">
            <h3>شهادات تقدير أنيقة ومميزة</h3>
            <p>
              في مطبعة الصادق، نقدم تصميمات شهادات تقدير احترافية تكرّم إنجازات
              الموظفين، الطلاب، أو المشاركين في المناسبات بأسلوب راقٍ وجودة
              عالية.
            </p>
            <ul>
              <li>تصميمات مخصصة تتماشى مع هوية مؤسستك</li>
              <li>خامات فاخرة: ورق مقوى أو لامع</li>
              <li>شهادات للشركات، المدارس، والمناسبات</li>
              <li>خيارات متنوعة: ألوان، خطوط، وإطارات أنيقة</li>
              <li>طباعة عالية الدقة بتفاصيل واضحة</li>
              <li>تسليم سريع لتلبية احتياجاتك</li>
            </ul>
            <p>
              سواء كنت تكرم موظفًا مميزًا أو طالبًا متفوقًا، دعنا نساعدك في
              تصميم شهادة تعكس التقدير بأفضل صورة. تواصل معنا الآن!
            </p>
          </div>
        </div>
      </div>

      {/* المعرض */}
      <div className="gallery-section fade-in">
        <h3>معرض تصميمات شهادات التقدير</h3>
        <div className="gallery-grid">
          {certificates.length === 0 ? (
            <p className="no-data">لا توجد شهادات متاحة حالياً.</p>
          ) : (
            certificates.map((cert, index) => (
              <div className="gallery-item" key={cert.id || index} onClick={() => openModal(cert.image)}>
                <img src={cert.image} alt={cert.name ||` شهادة ${index + 1}`} loading="lazy" />
              </div>
            ))
          )}
        </div>
      </div>

      {/* زر العودة */}
      <div style={{ textAlign: 'center', margin: '3rem 0' }}>
        <a href="/" className="back-button">العودة للصفحة الرئيسية</a>
      </div>

      {/* المودال */}
      {modalImage && (
        <div className="modal" onClick={closeModal}>
          <span className="close" onClick={closeModal}>×</span>
          <img src={modalImage} alt="عرض مكبر" className="modal-content loaded" />
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;