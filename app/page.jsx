'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './home.module.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [lightbox, setLightbox] = useState({ active: false, src: '' });

  // جلب المنتجات عند تحميل الصفحة
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.details || 'فشل جلب المنتجات');
        }
        const data = await res.json();
        const filteredProducts = data.filter((product) => product.category === 'الصفحة');
        setProducts(filteredProducts.sort((a, b) => (a.order || 0) - (b.order || 0)));
        setError('');
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  // إعداد IntersectionObserver لتأثير fade-in
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const faders = document.querySelectorAll('.fade-in');
      if (faders && faders.length > 0) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
              }
            });
          },
          { threshold: 0.1 }
        );

        faders.forEach((fade) => observer.observe(fade));

        return () => {
          faders.forEach((fade) => observer.unobserve(fade));
        };
      }
    }
  }, []);

  const openLightbox = (src) => {
    setLightbox({ active: true, src });
  };

  const closeLightbox = () => {
    setLightbox({ active: false, src: '' });
  };

  return (
    <>
      {/* القسم الرئيسي */}
      <div className={`${styles.landing} fade-in`}>
        <div className="text-zone">
          <h1>مرحبًا بكم في وكالة ومطابع الصادق للدعايا والاعلان والطباعه الحديثه</h1>
          <h2>اكتشف الآن عالم الإبداع المذهل الذي تنتظره</h2>
        </div>
      </div>

      {/* الخدمات */}
      <div className={`${styles.services} fade-in`}>
        <div className={styles['services-content']}>
          <Image
            src="/images/1.png"
            alt="صورة الخدمات"
            width={500}
            height={400}
            className="services-img"
          />
          <div className={styles['services-text']}>
            <h3>خدماتنا المميزة</h3>
            <p>انغمس في عالم الطباعة مع مطبعة الصادق!!</p>
            <ul>
              <li>نقدم خدمات طباعة متنوعة بجودة عالية</li>
              <li>طباعة الأوفسيت الراقية</li>
              <li>كروت شخصية أنيقة</li>
              <li>دعوات مناسبات وأفراح مميزة</li>
              <li>توزيعات ورقية: فلايرات، بروشورات، منيوهات، كتالوجات</li>
              <li>شهادات تقدير ودروع تكريمات فاخرة</li>
              <li>كروت سبوع، دفاتر تسجيل، فواتير، وروشيتات</li>
              <li>هدايا دعائية، نوت بوك، ونتائج سنوية</li>
            </ul>
            <p>كما نوفر طباعة الأوت دور والإندور المبتكرة بإستخدام</p>
            <ul>
              <li>بنرات</li>
              <li>فنيل</li>
              <li>فليكس</li>
              <li>سي ثرو</li>
              <li>سكوتش</li>
              <li>برنت اند كات</li>
            </ul>
            <p>جميع الخدمات تتم بجودة عالية تجذب الأنظار. تواصل معنا الآن واكتشف تجربة طباعة لا تُنسى!</p>
          </div>
        </div>
      </div>

      {/* المنتجات */}
      <div className={`${styles.products} fade-in`}>
        <h2>منتجاتنا</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center">{error}</div>
        )}
        {products.length === 0 && !error ? (
          <p className="text-center text-gray-600">لا توجد منتجات للصفحة الرئيسية حاليًا</p>
        ) : (
          <div className={styles['products-grid']}>
            {products.map((product) => (
              <div className="product-item" key={product.id}>
                <div className="relative w-full h-[20rem]">
                  <Image
                    src={product.image || '/placeholder-image.jpg'}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-md cursor-pointer"
                    onError={(e) => (e.target.src = '/placeholder-image.jpg')}
                    onClick={() => openLightbox(product.image || '/placeholder-image.jpg')}
                  />
                </div>
                <h3 className="text-center mt-2 text-lg font-semibold text-blue-800">{product.name}</h3>
                {product.description && (
                  <p className="text-center text-gray-700 text-sm">{product.description}</p>
                )}
                {product.category && (
                  <p className="text-center text-gray-500 text-sm">الفئة: {product.category}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox.active && (
        <div className={`${styles.lightbox} active`} onClick={closeLightbox}>
          <img
            src={lightbox.src}
            alt="Zoomed Image"
            className="max-w-[95vw] max-h-[95vh] object-contain"
          />
          <span className={styles.close} onClick={closeLightbox}>×</span>
        </div>
      )}
    </>
  );
}