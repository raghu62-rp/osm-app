import React from 'react';
import ProductCard from './ProductCard.jsx';

const ProductGrid = ({ products, onAddToCart, isLoading }) => {
  if (isLoading) {
    return (
      <div className="products-section">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="products-section">
        <div className="loading">
          <p>No products found. Try adjusting your search or category filter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-section">
      <h2>Featured Products ({products.length})</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;