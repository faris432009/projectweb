"use client";
import Image from "next/image";
import styles from './home.module.css'
import { useEffect } from "react";

const products = [
  { id: 1, name: "كروت شخصية", image: "/images/7.jpg" },
  { id: 2, name: "دعوات أفراح", image: "/images/12.jpg" },
  { id: 3, name: "بنر إعلاني", image: "/images/20.jpg" },
  { id: 4, name: "كتالوج", image: "/images/24.jpg" },
];

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const faders = document.querySelectorAll<HTMLElement>(".fade-in");
      if (faders && faders.length > 0) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        }, { threshold: 0.1 });

        faders.forEach((fade) => observer.observe(fade));
      }
    }
  }, []);

  return (
    <>
      {/* القسم الرئيسي */}
      <div className={`${styles.landing} fade-in`}>
        <div className="text-zone">
          <h1>مرحبًا بكم في وكالة ومطابع الصادق للدعايا والاعلان والطباعه الحديثه</h1>
          <h2>اكتشف الآن عالم الإبداع المذهل الذي تنتظره</h2>
        </div>
   
      </div>

      {/* الخدمات */}
      <div className={`${styles.services} fade-in`}>
        <div className={styles["services-content"]}>
          <Image
            src="/images/1.png"
            alt="صورة الخدمات"
            width={500}
            height={400}
            className="services-img"
          />
          <div className={styles["services-text"]}>
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
        <div className={styles["products-grid"]}>
          {products.map((product) => (
            <div className="product-item" key={product.id}>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-96 h-96"
              />
              <h3>{product.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
