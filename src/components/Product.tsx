import React, { useEffect, useState } from 'react';
// import './App.css';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
  images: string[];
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://api.escuelajs.co/api/v1/products');
  const data = await response.json();
  return data;
};

function ProductComponent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productList = await fetchProducts();
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.images[0]} alt={product.title} className="product-image" />
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductComponent;
