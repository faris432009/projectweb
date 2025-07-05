'use client'
import React, { useEffect } from 'react'
import './honor.css'

const Page = () => {
  useEffect(() => {
    const faders = document.querySelectorAll('.fade-in')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.1 })

    faders.forEach((fade) => observer.observe(fade))
  }, [])

  const openModal = (src) => {
    const modal = document.getElementById("modal")
    const modalImage = document.getElementById("modal-image")
    modal.style.display = "flex"
    modalImage.src = src
    modalImage.classList.remove("loaded")
    modalImage.onload = () => {
      modalImage.classList.add("loaded")
    }
  }

  const closeModal = () => {
    const modal = document.getElementById("modal")
    const modalImage = document.getElementById("modal-image")
    modal.style.display = "none"
    modalImage.src = ""
    modalImage.classList.remove("loaded")
  }

  return (
    <div>
      {/* عنوان كبير في المنتصف */}
      <div className="big-title-wrapper">
        <h1 className="big-title">دعوات أفراح ومناسبات فاخرة</h1>
      </div>

      {/* قسم دعوات الأفراح */}
      <div className="invitations-section fade-in">
        <div className="invitations-content">
          <img src="images/11.jpg" className="invitations-img" alt="تصميم دعوات أفراح" loading="lazy" />
          <div className="invitations-text">
            <h3>دعوات أفراح ومناسبات فاخرة</h3>
            <p>في مطبعة الصادق، نقدم تصميمات دعوات أفراح أنيقة ومميزة تجمع بين الفخامة والإبداع لتجعل يومك الخاص لا يُنسى.</p>
            <ul>
              <li>تصميمات مخصصة تناسب ذوقك الخاص</li>
              <li>خامات فاخرة: ورق عالي الجودة وتشطيبات مميزة</li>
              <li>دعوات للأفراح، الخطوبة، والمناسبات الخاصة</li>
              <li>خيارات متنوعة: كلاسيكية، مودرن، أو بتفاصيل يدوية</li>
              <li>طباعة دقيقة بألوان زاهية وواضحة</li>
              <li>تسليم سريع لضمان وصول دعواتك في الوقت المناسب</li>
            </ul>
            <p>دعنا نساعدك في تصميم دعوة تعكس فرحتك وتضيف لمسة سحرية لمناسبتك. تواصل معنا الآن!</p>
          </div>
        </div>
      </div>

      {/* عنوان المعرض فوق الصور */}
      <h2 className="gallery-title-text">معرض تصميمات دعوات الأفراح</h2>

      {/* قسم المعرض */}
      <div className="gallery-section fade-in">
        <div className="gallery-grid">
          <div className="gallery-item" onClick={() => openModal('images/12.jpg')}>
            <img src="images/12.jpg" alt="تصميم دعوة 1" loading="lazy" />
          </div>
          <div className="gallery-item" onClick={() => openModal('images/13.jpg')}>
            <img src="images/13.jpg" alt="تصميم دعوة 2" loading="lazy" />
          </div>
        </div>
      </div>

      {/* زر العودة */}
      <div className="back-button-wrapper">
        <a href="http://192.168.1.7:3000/" className="back-to-main">العودة للقائمة الرئيسية</a>
      </div>

      {/* النافذة المنبثقة */}
      <div className="modal" id="modal" onClick={(e) => e.target.id === "modal" && closeModal()}>
        <span className="close" onClick={closeModal}>×</span>
        <img className="modal-content" id="modal-image" />
      </div>
    </div>
  )
}

export default Page
