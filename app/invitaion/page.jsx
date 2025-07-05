'use client'
import React, { useEffect } from 'react'
import './shields.css'

const ShieldsPage = () => {
  useEffect(() => {
    const faders = document.querySelectorAll('.fade-in')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.1 })
    faders.forEach(fade => observer.observe(fade))
  }, [])

  const openModal = (src) => {
    const modal = document.getElementById("modal")
    const modalImage = document.getElementById("modal-image")
    modal.style.display = "flex"
    modalImage.src = src
    modalImage.classList.remove('loaded')
    modalImage.onload = () => modalImage.classList.add('loaded')
  }

  const closeModal = () => {
    const modal = document.getElementById("modal")
    const modalImage = document.getElementById("modal-image")
    modal.style.display = "none"
    modalImage.src = ""
    modalImage.classList.remove('loaded')
  }

  return (
    <div>
      {/* دروع التكريم */}
      <div className="shields-section fade-in">
        <div className="shields-content">
          <img src="images/31.jpg" alt="تصميم دروع تكريم" loading="lazy" />
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
            <p>سواء كنت تحتفل بإنجاز كبير أو تكرم شريكًا مميزًا، دعنا نساعدك في تصميم درع تكريم يترك انطباعًا لا يُنسى. تواصل معنا الآن!</p>
          </div>
        </div>
      </div>

      {/* معرض الصور */}
      <div className="gallery-section fade-in">
        <h3>معرض تصميمات دروع التكريم</h3>
        <div className="gallery-grid">
          <div className="gallery-item" onClick={() => openModal('images/31.jpg')}>
            <img src="images/31.jpg" alt="تصميم درع تكريم 1" loading="lazy" />
          </div>
          <div className="gallery-item" onClick={() => openModal('images/32.jpg')}>
            <img src="images/32.jpg" alt="تصميم درع تكريم 2" loading="lazy" />
          </div>
          <div className="gallery-item" onClick={() => openModal('images/33.jpg')}>
            <img src="images/33.jpg" alt="تصميم درع تكريم 3" loading="lazy" />
          </div>
        </div>
      </div>

      {/* النافذة المنبثقة */}
      <div className="modal" id="modal" onClick={(e) => { if (e.target.id === "modal") closeModal() }}>
        <span className="close" onClick={closeModal}>×</span>
        <img className="modal-content" id="modal-image" alt="عرض مكبر" />
      </div>

      {/* زر العودة */}
      <div style={{ margin: '40px 0', textAlign: 'center' }}>
        <a href="http://192.168.1.7:3000/" className="return-button">
          العودة للقائمة الرئيسية
        </a>
      </div>
    </div>
  )
}

export default ShieldsPage
