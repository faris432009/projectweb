'use client'
import React, { useEffect, useState, useRef } from 'react'
import './honor.css'

const Page = () => {
  const [modalSrc, setModalSrc] = useState('')
  const [products, setProducts] = useState([])
  const modalRef = useRef(null)

  const openModal = (src) => {
    setModalSrc(src)
    document.getElementById("modal").style.display = "flex"
  }

  const closeModal = () => {
    setModalSrc('')
    document.getElementById("modal").style.display = "none"
  }

  useEffect(() => {
    // أنيميشن عند الظهور
    const faders = document.querySelectorAll('.fade-in')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.1 })

    faders.forEach((fade) => observer.observe(fade))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // جلب بيانات الدعوات من API
    const fetchInvitations = async () => {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        const invitations = data.filter(item => item.category === "دعوات")
        setProducts(invitations)
      } catch (err) {
        console.error("فشل في جلب بيانات الدعوات:", err)
      }
    }

    fetchInvitations()
  }, [])

  return (
    <div>
      {/* عنوان كبير في المنتصف */}
      <div className="big-title-wrapper">
        <h1 className="big-title">دعوات أفراح ومناسبات فاخرة</h1>
      </div>

      {/* قسم دعوات الأفراح */}
      <div className="invitations-section fade-in">
        <div className="invitations-content">
          <img src="/images/11.jpg" className="invitations-img" alt="تصميم دعوات أفراح" loading="lazy" />
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

      {/* عنوان المعرض */}
      <h2 className="gallery-title-text">معرض تصميمات دعوات الأفراح</h2>

      {/* قسم المعرض */}
      <div className="gallery-section fade-in">
        <div className="gallery-grid">
          {products.length === 0 ? (
            <p className="no-data">لا توجد تصميمات حالياً.</p>
          ) : (
            products.map((product, index) => (
              <div
                key={product.id || index}
                className="gallery-item"
                onClick={() => openModal(product.image)}
              >
                <img
                  src={product.image}
                  alt={product.name ||` دعوة ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* زر العودة */}
      <div className="back-button-wrapper">
        <a href="/" className="back-to-main">العودة للقائمة الرئيسية</a>
      </div>

      {/* النافذة المنبثقة */}
      <div className="modal" id="modal" onClick={(e) => e.target.id === "modal" && closeModal()}>
        <span className="close" onClick={closeModal}>×</span>
        {modalSrc && (
          <img className="modal-content loaded" ref={modalRef} src={modalSrc} alt="عرض مكبر" />
        )}
      </div>
    </div>
  )
}

export default Page