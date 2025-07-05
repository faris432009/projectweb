'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Nav.css'; // Adjust path if you move this file

const Nav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    let timer;
    if (clickCount === 3) {
      window.location.href = '/admin';
      setClickCount(0);
    } else if (clickCount > 0) {
      timer = setTimeout(() => setClickCount(0), 500);
    }
    return () => clearTimeout(timer);
  }, [clickCount]);

  return (
    <>
      <div className="header">
        <Image
          src="/images/2.png"
          alt="شعار مطبعة الصادق"
          className="header-logo"
          width={96}
          height={96}
          onClick={() => setClickCount(prev => prev + 1)}
        />
       
        <button
          className="hamburger"
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(!sidebarOpen);
          }}
        >
          {sidebarOpen ? '✖' : '☰'}
        </button>
      </div>

      <div
        className={`sidebar ${sidebarOpen ? 'active' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul>
          <li><Link href="/who">من نحن</Link></li>
          <li><Link href="/oursite">موقعنا</Link></li>
          <li><Link href="/contact">تواصل معنا</Link></li>
          <li><Link href="/cards">كروت شخصيه</Link></li>
          <li><Link href="/honor">دعوات مناسبات وأفراح</Link></li>
          <li><Link href="/menu">المنيوهات</Link></li>
          <li><Link href="/panner">البنرات</Link></li>
          <li><Link href="/catelogs">كتالوجات </Link></li>
          <li><Link href="/invitaion">دروع تكريم</Link></li>
          <li><Link href="/appreciation">شهادات تقدير</Link></li>
          <li><Link href="/gift">هدايا دعائية</Link></li>
        </ul>
        <Link href="/" className="back-to-main">العودة للقائمة الرئيسية</Link>
      </div>

      {/* Click outside to close sidebar */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{
          position: 'fixed',
          inset: 0,
          zIndex: 998
        }} />
      )}
    </>
  );
};

export default Nav;
