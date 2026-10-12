import React, { useState } from 'react';
import { addToCart } from '../utils/api';

const ProductActions = ({ product, onCartUpdate }) => {
  const colors = product.options?.colors || product.colors || [];
  const storages = product.options?.storages || product.storage || [];
  
  const [selectedColor, setSelectedColor] = useState(
    colors?.[0]?.code || '1'
  );
  const [selectedStorage, setSelectedStorage] = useState(
    storages?.[0]?.code || '1'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const cartData = {
        id: product.id,
        colorCode: parseInt(selectedColor),
        storageCode: parseInt(selectedStorage)
      };
      
      const response = await addToCart(cartData);
      
      if (response && response.count !== undefined) {
        setMessage(`✓ ¡Añadido al carrito! Total de artículos: ${response.count}`);
        onCartUpdate(response.count);
        
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('✗ Error al añadir al carrito. Por favor, inténtalo de nuevo.');
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-actions">
      <h3>Opciones</h3>

      <div className="selector-group">
        <label htmlFor="color-select" className="selector-label">
          Color:
        </label>
        <select
          id="color-select"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="selector"
        >
          {colors && colors.length > 0 ? (
            colors.map((color) => (
              <option key={color.code} value={color.code}>
                {color.name}
              </option>
            ))
          ) : (
            <option key="default-color" value="1">Color por defecto</option>
          )}
        </select>
      </div>

      <div className="selector-group">
        <label htmlFor="storage-select" className="selector-label">
          Almacenamiento:
        </label>
        <select
          id="storage-select"
          value={selectedStorage}
          onChange={(e) => setSelectedStorage(e.target.value)}
          className="selector"
        >
          {storages && storages.length > 0 ? (
            storages.map((stor) => (
              <option key={stor.code} value={stor.code}>
                {stor.name}
              </option>
            ))
          ) : (
            <option key="default-storage" value="1">Almacenamiento por defecto</option>
          )}
        </select>
      </div>

      <button
        className="btn-add-to-cart"
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        {isLoading ? 'Añadiendo...' : 'Añadir al Carrito'}
      </button>

      {message && (
        <div className={`cart-message ${message.includes('✓') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ProductActions;
