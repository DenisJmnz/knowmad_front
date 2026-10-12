import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductDetail } from '../utils/api';
import ProductImage from '../components/ProductImage';
import ProductDescription from '../components/ProductDescription';
import ProductActions from '../components/ProductActions';

const PDP = ({ setCartCount, setProductTitle }) => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductDetail(productId);
        if (!data) {
          setError('Producto no encontrado');
          setProduct(null);
        } else {
          setProduct(data);
          if (setProductTitle) {
            setProductTitle(data.model || data.name || data.brand || 'Producto');
          }
        }
      } catch (err) {
        setError('Error al cargar los detalles del producto. Por favor, inténtalo de nuevo.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }

    return () => {
      if (setProductTitle) {
        setProductTitle('');
      }
    };
  }, [productId, setProductTitle]);

  const handleCartUpdate = (count) => {
    if (setCartCount) {
      setCartCount(count);
    }
    localStorage.setItem('cartCount', count.toString());
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-loading">Cargando producto...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-container">
        <div className="page-error">
          <p>{error || 'Producto no encontrado'}</p>
          <Link to="/" className="back-link">← Volver a Productos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to="/" className="back-link">← Volver a Productos</Link>
      
      <div className="pdp-container">
        <div className="pdp-image-section">
          <ProductImage product={product} />
        </div>

        <div className="pdp-details-section">
          <ProductDescription product={product} />
          <ProductActions product={product} onCartUpdate={handleCartUpdate} />
        </div>
      </div>
    </div>
  );
};

export default PDP;
