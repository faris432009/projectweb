import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <img src="/images/2.png" className="footer-logo" alt="شعار مطبعة الصادق" />
          <h3>مطبعة الصادق</h3>
          <p>
            نقدم خدمات طباعة متنوعة بجودة عالية تشمل كروت شخصية، دعوات مناسبات، بنرات، وأكثر.
            تواصلوا معنا لاكتشاف تجربة طباعة مميزة!
          </p>
        </div>
        <div className="footer-section">
          <h3>روابط سريعة</h3>
          <ul>
            <li><Link href="/">الرئيسية</Link></li>
            <li><Link href="/about">من نحن</Link></li>
            <li><Link href="/contact">تواصل معنا</Link></li>
            <li><Link href="/cards">كروت شخصية</Link></li>
            <li><Link href="/panner">البنرات</Link></li>
          </ul>
        </div>
        <div className="footer-section contact-info">
          <h3>تواصلوا معنا</h3>
          <p><i className="fas fa-phone"></i> +201011445796</p>
          <p><i className="fas fa-envelope"></i> Elsadekprint@gmail.com</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://wa.me/+201011445796" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>جميع الحقوق محفوظة © 2025 مطبعة الصادق</p>
      </div>
    </footer>
  );
};

export default Footer;
