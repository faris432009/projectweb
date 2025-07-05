'use client';

import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [order, setOrder] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleteTimer, setDeleteTimer] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.details || 'Failed to fetch products');
      }
      const data = await res.json();
      setProducts(data);
      setError('');
    } catch (error) {
      console.error('Error fetching products:', error.message);
      setError(error.message);
    }
  };

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

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    if (!name) {
      setError('اسم المنتج مطلوب');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    if (image) formData.append('image', image);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('order', order);

    try {
      const url = editId ? `/api/products/${editId}` : '/api/products';
      const res = await fetch(url, {
        method: editId ? 'PUT' : 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.details || 'Failed to save product');
      }

      resetForm();
      fetchProducts();
      setError('');
      setSuccess(editId ? 'تم تحديث المنتج بنجاح' : 'تم إضافة المنتج بنجاح');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error saving product:', error.message);
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    setDeleteConfirm(id);
    setDeleteTimer(10);

    const timer = setInterval(() => {
      setDeleteTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setDeleteConfirm(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/products/${deleteConfirm}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.details || 'Failed to delete product');
      }
      fetchProducts();
      setError('');
      setSuccess('تم حذف المنتج بنجاح');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error deleting product:', error.message);
      setError(error.message);
    } finally {
      setDeleteConfirm(null);
      setDeleteTimer(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
    setDeleteTimer(null);
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setDescription(product.description || '');
    setCategory(product.category || '');
    setOrder(product.order || '');
    setImage(null);
    setError('');
    setSuccess('');
  };

  const resetForm = () => {
    setEditId(null);
    setName('');
    setImage(null);
    setDescription('');
    setCategory('');
    setOrder('');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded-md mt-8 shadow">
        <h2 className="text-2xl mb-4 text-blue-800 font-bold text-center">تسجيل الدخول</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center">
            {error}
          </div>
        )}
        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="أدخل كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
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
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-md mt-8 shadow">
      <h2 className="text-2xl mb-4 text-blue-800 font-bold text-center">إدارة المنتجات</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-2 mb-4 rounded text-center">
          {success}
        </div>
      )}

      <form onSubmit={handleAddOrUpdateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="اسم المنتج"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="p-2 border rounded"
          accept="image/*"
          required={!editId}
        />
        <textarea
          placeholder="وصف المنتج"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded col-span-full"
        ></textarea>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">اختر فئة</option>
          <optgroup label="منتجاتنا">
            <option value="كروت">كروت شخصيه</option>
            <option value="دعوات">دعوات و مناسبات افراح</option>
            <option value="المتيو">المنيوهات</option>
            <option value="البناء">البنارات</option>
            <option value="كتلوج">كتلوجات</option>
            <option value="تكريم">دروع تكريم</option>
            <option value="شهادة تقدير">شهادة تقدير</option>
            <option value="هدايا دعائية">هدايا دعائية</option>
          </optgroup>
          <optgroup label="الصفحه الرئيسيه">
            <option value="الصفحه">الصفحه الرئيسيه</option>
          </optgroup>
        </select>
        <input
          type="number"
          placeholder="ترتيب الصورة (1 للأول، 2 للثاني...)"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800 col-span-full">
          {editId ? 'تحديث المنتج' : 'إضافة المنتج'}
        </button>
      </form>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg wiite p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
            <p className="mb-4 text-lg font-semibold text-gray-800">
              هل أنت متأكد من حذف هذا المنتج؟
            </p>
            <p className="mb-4 text-sm text-gray-600">الوقت المتبقي: {deleteTimer} ثواني</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
              >
                تأكيد الحذف
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border text-right">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="p-2 border">اسم المنتج</th>
              <th className="p-2 border">الصورة</th>
              <th className="p-2 border">الوصف</th>
              <th className="p-2 border">الفئة</th>
              <th className="p-2 border">ترتيب الصورة</th>
              <th className="p-2 border">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border">
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">
                  <img src={product.image} alt={product.name} className="h-16 mx-auto" />
                </td>
                <td className="p-2 border">{product.description}</td>
                <td className="p-2 border">{product.category}</td>
                <td className="p-2 border">{product.order}</td>
                <td className="p-2 border space-y-1">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-400 text-black w-full py-1 rounded"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white w-full py-1 rounded"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 mb-8 flex justify-center">
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