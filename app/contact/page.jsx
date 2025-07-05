'use client';

import React, { useEffect } from 'react';
import './contact.css';

const ContactPage = () => {
  useEffect(() => {
    const faders = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    faders.forEach(fade => observer.observe(fade));
  }, []);

  return (
    <div className="contact-section fade-in" dir="rtl" lang="ar">
      <h1>تواصل معنا</h1>
      <p>نحن هنا لخدمتك! تواصلوا معنا عبر الوسائل التالية:</p>
      <div className="contact-info">
        <div className="contact-item">
          <span className="emoji">📞</span>
          <a href="tel:01011445796">01011445796 (اتصال)</a>
        </div>
        <div className="contact-item">
          <span className="emoji">📱</span>
          <a href="https://wa.me/+201011445796">01011445796 (واتساب)</a>
        </div>
        <div className="contact-item">
          <span className="emoji">✉️</span>
          <a href="mailto:Elsadekprint@gmail.com">Elsadekprint@gmail.com</a>
        </div>
        <div className="contact-item">
          <span className="emoji">📘</span>
          <a href="https://www.facebook.com/share/1C4NkxaYx9/?mibextid=wwXIfr" target="_blank">صفحتنا على فيسبوك</a>
        </div>
      </div>
      <a href="  http://localhost:3000" className="back-to-home">العودة للقائمة الرئيسية</a>
    </div>
  );
};

export default ContactPage;
