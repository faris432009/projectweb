'use client';

import React, { useEffect } from 'react';
import styles from './location.module.css';

const Page = () => {
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
    <>
      {/* قسم موقعنا */}
      <div className={`${styles.locationSection} fade-in`}>
        <h1>موقعنا</h1>
        <p>نحن في برج العز، المنصورة، محافظة الدقهلية. تفضل بزيارتنا!</p>
        <div className={styles.mapContainer}>
          <a href="https://www.google.com/maps?q=31.0193605,31.4442694" target="_blank">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3427.263472687955!2d31.44169447552321!3d31.01935537440215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDAxJzA5LjciTiAzMcKwMjYnMzkuNyJF!5e0!3m2!1sar!2seg!4v1697654321!5m2!1sar!2seg"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </a>
          <a
            href="https://www.google.com/maps?q=31.0193605,31.4442694"
            target="_blank"
            className={styles.mapLink}
          >
            افتح في Google Maps
          </a>
        </div>
        <a href="http://localhost:3000/" className={styles.backToHome}>العودة للقائمة الرئيسية</a>
      </div>
    </>
  );
};

export default Page;
