'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
  const [category, setCategory] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === '432009') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('كلمة المرور غير صحيحة');
      setPassword('');
    }
  };

  const handleCategorySelect = (e) => {
    e.preventDefault();
    if (!category) {
      setError('يرجى اختيار فئة');
      return;
    }
    // الانتقال إلى صفحة الفئة المختارة
    router.push(`/admin/${encodeURIComponent(category)}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded-md mt-8 shadow">
        <h2 className="text-2xl mb-4 text-blue-800 font-bold text-center">تسجيل الدخول</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center">{error}</div>
        )}
        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="أدخل كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded text-right"
            required
          />
          <button type="submit" className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
            تسجيل الدخول
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md mt-8 shadow">
      <h2 className="text-2xl mb-4 text-blue-800 font-bold text-center">اختيار فئة المنتجات</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center">{error}</div>
      )}
      <form onSubmit={handleCategorySelect} className="flex flex-col gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded text-right"
        >
          <option value="">اختر فئة</option>
          <optgroup label="منتجاتنا">
            <option value="كروت">كروت شخصية</option>
            <option value="دعوات">دعوات ومناسبات أفراح</option>
            <option value="المتيو">المنيوهات</option>
            <option value="البناء">البنرات</option>
            <option value="كتلوج">كتلوجات</option>
            <option value="تكريم">دروع تكريم</option>
            <option value="شهادة تقدير">شهادة تقدير</option>
            <option value="هدايا دعائية">هدايا دعائية</option>
          </optgroup>
          <optgroup label="الصفحة الرئيسية">
            <option value="الصفحة">منتجاتنا</option>
          </optgroup>
        </select>
        <button type="submit" className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
          الذهاب إلى الفئة
        </button>
      </form>
      <div className="mt-8 flex justify-center">
        <a
          href="/"
          className="bg-yellow-400 text-black py-2 px-6 rounded hover:bg-yellow-500 transition-colors"
        >
          العودة إلى الصفحة الرئيسية
        </a>
      </div>
    </div>
  );
};

export default AdminPage;