"use client";

import React, { useEffect, useRef, useState } from "react";
import './cards.css';

const Page = () => {
  const [modalSrc, setModalSrc] = useState(null);
  const [products, setProducts] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    // Animate on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Fetch images from API
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const filtered = data.filter(product => product.category === "كروت");
        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const openModal = (src) => {
    setModalSrc(src);
    document.getElementById("modal").style.display = "flex";
  };

  const closeModal = () => {
    setModalSrc(null);
    document.getElementById("modal").style.display = "none";
  };

  return (
    <div>
      {/* قسم الكروت */}
      <section className="cards-section fade-in">
        <div className="cards-content">
          <img src="/images/7.jpg" alt="تصميم كروت" loading="lazy" />
          <div className="cards-text">
            <h3>كروت شخصية وتجارية مميزة</h3>
            <p>نقدم في مطبعة الصادق تصاميم كروت أنيقة تلبي جميع احتياجاتك الشخصية والتجارية بجودة عالية وإبداع لا مثيل له.</p>
            <ul>
              <li>كروت شخصية بتصميمات عصرية</li>
              <li>كروت تجارية تعكس هوية علامتك</li>
              <li>طباعة بجودة عالية مع تشطيبات فاخرة</li>
              <li>خيارات متنوعة: لامع، مطفي، أو بطبقة حماية</li>
              <li>تصاميم مخصصة حسب طلب العميل</li>
              <li>تسليم سريع وخدمة موثوقة</li>
            </ul>
            <p>سواء كنت تبحث عن كرت يعبر عن شخصيتك أو يروج لعملك، نحن هنا لنحول رؤيتك إلى واقع. تواصل معنا الآن!</p>
          </div>
        </div>
      </section>

      {/* قسم المعرض */}
      <section className="gallery-section fade-in">
        <h3>معرض تصميمات الكروت</h3>
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
                  alt={product.name ||` تصميم كرت ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))
          )}
        </div>
      </section>

      {/* زر العودة */}
      <a href="/" className="back-to-main">العودة للقائمة الرئيسية</a>

      {/* المودال */}
      <div className="modal" id="modal" onClick={(e) => e.target.id === "modal" && closeModal()}>
        <span className="close" onClick={closeModal}>×</span>
        {modalSrc && (
          <img
            ref={modalRef}
            src={modalSrc}
            className="modal-content loaded"
            alt="صورة مكبرة"
          />
        )}
      </div>
    </div>
  );
};

export default Page;