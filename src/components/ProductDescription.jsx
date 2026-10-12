import React from 'react';

const ProductDescription = ({ product }) => {
  const formatPrice = (price) => {
    if (!price && price !== 0) return 'N/A';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numPrice) ? 'N/A' : `$${numPrice.toFixed(2)}`;
  };

  return (
    <div className="product-description">
      <div className="product-header-row">
        <div className="product-title-group">
          <h2 className="product-name">{product.model || product.name || 'Producto'}</h2>
          <p className="product-brand">{product.brand ? `Marca: ${product.brand}` : ''}</p>
        </div>
        <div className="price-section">
          <span className="price">{formatPrice(product.price)}</span>
        </div>
      </div>

      <div className="specifications">
        <h3>Especificaciones</h3>
        <table className="specs-table">
          <tbody>
            {product.cpu && (
              <tr>
                <td className="spec-label">Procesador (CPU)</td>
                <td className="spec-value">{product.cpu}</td>
              </tr>
            )}
            {product.ram && (
              <tr>
                <td className="spec-label">Memoria RAM</td>
                <td className="spec-value">{product.ram}</td>
              </tr>
            )}
            {product.os && (
              <tr>
                <td className="spec-label">Sistema Operativo</td>
                <td className="spec-value">{product.os}</td>
              </tr>
            )}
            {product.displayResolution && (
              <tr>
                <td className="spec-label">Resolución de Pantalla</td>
                <td className="spec-value">{product.displayResolution}</td>
              </tr>
            )}
            {product.battery && (
              <tr>
                <td className="spec-label">Batería</td>
                <td className="spec-value">{product.battery}</td>
              </tr>
            )}
            {product.primaryCamera && (
              <tr>
                <td className="spec-label">Cámara</td>
                <td className="spec-value">{Array.isArray(product.primaryCamera) ? product.primaryCamera.join(', ') : product.primaryCamera}</td>
              </tr>
            )}
            {product.dimentions && (
              <tr>
                <td className="spec-label">Dimensiones</td>
                <td className="spec-value">{product.dimentions}</td>
              </tr>
            )}
            {product.weight && (
              <tr>
                <td className="spec-label">Peso</td>
                <td className="spec-value">{product.weight}g</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {product.description && (
        <div className="product-details-section">
          <h3>Descripción</h3>
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
