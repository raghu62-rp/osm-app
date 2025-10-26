import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }

    return stars.join('');
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <span style={{ fontSize: '4rem' }}>{product.image}</span>
      </div>
      
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">{product.name}</h3>
        <div className="product-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span>({product.rating})</span>
        </div>
        <div className="product-price">${product.price}</div>
        <button 
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
};

export default ProductCard;