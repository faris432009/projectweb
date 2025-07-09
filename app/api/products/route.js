import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { writeFile } from 'fs/promises';
import { v4 as uuid } from 'uuid';

const filePath = path.join(process.cwd(), 'public', 'products.json');
const imageDir = path.join(process.cwd(), 'public', 'images');

export async function GET(request) {
  try {
    await fs.access(filePath);
    const fileData = await fs.readFile(filePath, 'utf8');
    let products = JSON.parse(fileData);

    // تصفية المنتجات حسب الفئة إذا تم تمرير query parameter
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    if (category) {
      products = products.filter((p) => p.category === decodeURIComponent(category));
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('GET error:', error.message);
    return NextResponse.json({ error: 'Failed to read products', details: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const category = formData.get('category');
    const order = formData.get('order');
    const imageFile = formData.get('image');

    if (!name || !imageFile || typeof imageFile === 'string') {
      return NextResponse.json({ error: 'Name and image are required' }, { status: 400 });
    }

    const ext = imageFile.name.split('.').pop();
    const filename = `${uuid()}.${ext}`;
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    await fs.mkdir(imageDir, { recursive: true });
    await writeFile(path.join(imageDir, filename), buffer);

    const imageUrl = `/images/${filename}`;

    let products = [];
    try {
      await fs.access(filePath);
      const fileData = await fs.readFile(filePath, 'utf8');
      products = JSON.parse(fileData);
    } catch {
      products = [];
    }

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = {
      id: newId,
      name,
      image: imageUrl,
      description: description || '',
      category: category || '',
      order: parseInt(order) || 0,
    };

    const updatedProducts = [...products, newProduct];
    await fs.writeFile(filePath, JSON.stringify(updatedProducts, null, 2));

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('POST error:', error.message);
    return NextResponse.json({ error: 'Failed to save product', details: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    try {
      await fs.access(filePath);
    } catch {
      console.error('products.json does not exist');
      return NextResponse.json({ error: 'Product database not found' }, { status: 500 });
    }

    const data = await fs.readFile(filePath, 'utf8');
    let products;
    try {
      products = JSON.parse(data);
    } catch (error) {
      console.error('Error parsing products.json:', error.message);
      return NextResponse.json({ error: 'Invalid product database format' }, { status: 500 });
    }

    const updatedProducts = products.filter(p => p.id !== id);
    if (products.length === updatedProducts.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    try {
      await fs.writeFile(filePath, JSON.stringify(updatedProducts, null, 2));
    } catch (error) {
      console.error('Error writing to products.json:', error.message);
      return NextResponse.json({ error: 'Failed to update product database', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE error:', error.message);
    return NextResponse.json({ error: 'Failed to delete product', details: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const formData = await req.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const category = formData.get('category');
    const order = formData.get('order');
    const imageFile = formData.get('image');

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    try {
      await fs.access(filePath);
    } catch {
      console.error('products.json does not exist');
      return NextResponse.json({ error: 'Product database not found' }, { status: 500 });
    }

    const data = await fs.readFile(filePath, 'utf8');
    let products;
    try {
      products = JSON.parse(data);
    } catch (error) {
      console.error('Error parsing products.json:', error.message);
      return NextResponse.json({ error: 'Invalid product database format' }, { status: 500 });
    }

    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    let imageUrl = products[index].image;
    if (imageFile && typeof imageFile !== 'string') {
      const ext = imageFile.name.split('.').pop();
      const filename = `${uuid()}.${ext}`;
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.mkdir(imageDir, { recursive: true });
      await writeFile(path.join(imageDir, filename), buffer);
      imageUrl = `/images/${filename}`;
    }

    products[index] = {
      ...products[index],
      name,
      image: imageUrl,
      description: description || '',
      category: category || '',
      order: parseInt(order) || products[index].order,
    };

    try {
      await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    } catch (error) {
      console.error('Error writing to products.json:', error.message);
      return NextResponse.json({ error: 'Failed to update product database', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, product: products[index] });
  } catch (error) {
    console.error('PUT error:', error.message);
    return NextResponse.json({ error: 'Failed to update product', details: error.message }, { status: 500 });
  }
}