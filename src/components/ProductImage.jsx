import React from 'react';

const ProductImage = ({ product }) => {
  return (
    <div className="product-image-container">
      <img
        src={product.imgUrl || product.image || 'https://via.placeholder.com/400?text=Product+Image'}
        alt={product.model || product.name || 'Producto'}
        className="product-image"
      />
      <div className="availability-badge">
        <span className="in-stock">✓ En stock</span>
      </div>
    </div>
  );
};

export default ProductImage;
