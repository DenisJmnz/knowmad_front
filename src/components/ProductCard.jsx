import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`, {
      state: { productName: product.model || product.name || product.brand }
    });
  };

  const formatPrice = (price) => {
    if (!price && price !== 0) return 'N/A';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numPrice) ? 'N/A' : `$${numPrice.toFixed(2)}`;
  };

  return (
    <div className="product-card" onClick={handleClick} role="button" tabIndex={0}>
      <div className="product-image">
        <img 
          src={product.imgUrl || `https://via.placeholder.com/200x200?text=${product.model}`}
          alt={product.model || product.name || 'Producto'}
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.model || product.name || 'Producto'}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        <p className="product-availability available">✓ En stock</p>
      </div>
    </div>
  );
};

export default ProductCard;
