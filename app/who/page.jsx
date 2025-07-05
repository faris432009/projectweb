'use client'
import React, { useEffect } from 'react'
import './who.css'

const Who = () => {
  useEffect(() => {
    const faders = document.querySelectorAll('.fade-in')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.1 })

    faders.forEach(fade => observer.observe(fade))
  }, [])

  return (
    <div className="who-wrapper">
      <div className="about-section fade-in">
        <img src="images/2.png" className="logo" alt="الشعار" />
        <h1>من نحن</h1>
        <h2>نبذة عن مطبعة الصادق</h2>
        <p>تقع مطبعة الصادق في قلب برج العز بمركز المنصورة، محافظة الدقهلية، لتكون وجهة رائدة لكل من يبحث عن الجودة والإبداع في عالم الطباعة...</p>

        <h2>خدمات الطباعة المتنوعة</h2>
        <p>تتخصص مطبعة الصادق في تقديم مجموعة شاملة من خدمات الطباعة تشمل:</p>

        <h3>1. طباعة الأوفست</h3>
        <ul>
          <li>كروت شخصية: تصميمات أنيقة تعكس هويتك المهنية بأسلوب عصري.</li>
          <li>دعوات المناسبات والأفراح...</li>
          <li>توزيعات ورقية، كتالوجات، شهادات، دروع، دفاتر، نوت بوك، هدايا دعائية...</li>
        </ul>

        <h3>2. طباعة الأوت دور والإن دور</h3>
        <ul>
          <li>بنرات، فينيل، فليكس، برنت آند كات...</li>
        </ul>

        <h2>لماذا مطبعة الصادق؟</h2>
        <p>مطبعة الصادق ليست مجرد مطبعة، بل هي شريك إبداعي...</p>

        <a href="http://192.168.1.7:3000/" className="back-to-home">العودة إلى الرئيسية</a>
      </div>
    </div>
  )
}

export default Who
