'use client';

import { useState, useEffect } from 'react';

// Definisikan tipe untuk produk
interface Product {
  id: string;
  name: string;
  category: string;
  code: string;
  quantity: number;
  unit: string;
  price: string;
  description: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

const ProductViews = () => {
  // Definisikan state sebagai array Product
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then((res) => res.json())
      .then((data) => {
        // Akses array produk di dalam `data.data`
        if (data.success && Array.isArray(data.data.data)) {
          setProducts(data.data.data);
        } else {
          console.error('Produk yang diterima bukan array:', data.data);
          setProducts([]); // Berikan nilai default jika data bukan array
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setProducts([]); // Jika terjadi error, berikan nilai array kosong
      });
  }, []);

  return (
    <>
      <h1>Daftar Produk</h1>
      {products.length > 0 ? (
        products.map((product) => <p key={product.id}>{product.name}</p>)
      ) : (
        <p>Produk tidak tersedia.</p>
      )}
    </>
  );
};

export default ProductViews;
