import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

const filePath = path.join(process.cwd(), 'public', 'content.json');

export async function GET(request) {
  try {
    await fs.access(filePath);
    const fileData = await fs.readFile(filePath, 'utf8');
    const content = JSON.parse(fileData);
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    if (category) {
      return NextResponse.json(content.categories[decodeURIComponent(category)] || {});
    }
    return NextResponse.json(content);
  } catch (error) {
    console.error('GET content error:', error.message);
    return NextResponse.json({ error: 'Failed to read content', details: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { category, data } = await request.json();
    if (!category || !data) {
      return NextResponse.json({ error: 'Category and data are required' }, { status: 400 });
    }
    await fs.access(filePath);
    const fileData = await fs.readFile(filePath, 'utf8');
    const content = JSON.parse(fileData);
    content.categories[decodeURIComponent(category)] = data;
    await fs.writeFile(filePath, JSON.stringify(content, null, 2));
    return NextResponse.json({ success: true, category, content: content.categories[decodeURIComponent(category)] });
  } catch (error) {
    console.error('PUT content error:', error.message);
    return NextResponse.json({ error: 'Failed to update content', details: error.message }, { status: 500 });
  }
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products?category=الصفحة');
      if (!res.ok) throw new Error('فشل جلب المنتجات');
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('الاستجابة مش JSON');
      }
      const data = await res.json();
      setProducts(data.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0)));
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, []);
}