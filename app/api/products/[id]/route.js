import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { writeFile } from 'fs/promises';
import { v4 as uuid } from 'uuid';

const filePath = path.join(process.cwd(), 'public', 'products.json');
const imageDir = path.join(process.cwd(), 'public', 'images');

// DELETE product by ID
export async function DELETE(req, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    await fs.access(filePath);
    const data = await fs.readFile(filePath, 'utf8');
    const products = JSON.parse(data);

    const updatedProducts = products.filter((product) => product.id !== id);
    if (updatedProducts.length === products.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await fs.writeFile(filePath, JSON.stringify(updatedProducts, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE error:', error.message);
    return NextResponse.json({ error: 'Failed to delete product', details: error.message }, { status: 500 });
  }
}

// PUT (update) product by ID
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

    await fs.access(filePath);
    const data = await fs.readFile(filePath, 'utf8');
    let products = JSON.parse(data);

    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    let imageUrl = products[index].image;

    // If image is uploaded, save it
    if (imageFile && typeof imageFile !== 'string') {
      const ext = imageFile.name.split('.').pop();
      const filename = `${uuid()}.${ext}`;
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.mkdir(imageDir, { recursive: true });
      await writeFile(path.join(imageDir, filename), buffer);
      imageUrl = `/images/${filename}`;
    }

    // Update product data
    products[index] = {
      ...products[index],
      name,
      image: imageUrl,
      description: description || '',
      category: category || '',
      order: parseInt(order) || products[index].order,
    };

    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return NextResponse.json({ success: true, product: products[index] });
  } catch (error) {
    console.error('PUT error:', error.message);
    return NextResponse.json({ error: 'Failed to update product', details: error.message }, { status: 500 });
  }
}
