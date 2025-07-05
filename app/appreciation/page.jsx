'use client'
import React, { useEffect, useState } from 'react'
import './certificates.css'

const Page = () => {
  const [modalImage, setModalImage] = useState(null)

  const openModal = (src) => {
    setModalImage(src)
  }

  const closeModal = () => {
    setModalImage(null)
  }

  useEffect(() => {
    const faders = document.querySelectorAll('.fade-in')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.1 })

    faders.forEach((fade) => observer.observe(fade))
    return () => {
      faders.forEach((fade) => observer.unobserve(fade))
    }
  }, [])

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

      {/* قسم المعرض */}
      <div className="gallery-section fade-in">
        <h3>معرض تصميمات شهادات التقدير</h3>
        <div className="gallery-grid">
          {['28.jpg', '27.jpg', '30.jpg'].map((img, index) => (
            <div className="gallery-item" key={index} onClick={() => openModal(`/images/${img}`)}>
              <img src={`/images/${img}`} alt={`شهادة ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* زر العودة للصفحة الرئيسية */}
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
  )
}

export default Page
