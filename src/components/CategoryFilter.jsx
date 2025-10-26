import React from 'react';
import { categories } from '../mockData.jsx';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <div className="container">
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category === 'all' ? 'All Products' : category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;