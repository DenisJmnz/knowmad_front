import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoKnowmad from '../assets/logo_knowmad.jpg';

const Header = ({ cartCount = 0, productTitle = '' }) => {
  const location = useLocation();
  
  const getBreadcrumbs = () => {
    if (location.pathname === '/') {
      return [{ label: 'Productos', href: '/' }];
    }
    
    if (location.pathname.startsWith('/product/')) {
      const productId = location.pathname.split('/')[2];
      let displayTitle = productTitle || location.state?.productName;
      if (!displayTitle) {
        try {
          const cached = localStorage.getItem(`product_${productId}`);
          if (cached) {
            const parsed = JSON.parse(cached);
            displayTitle = parsed.data?.model || parsed.data?.name || parsed.data?.brand;
          }
        } catch (e) {
          void e;
        }
      }

      return [
        { label: 'Productos', href: '/' },
        { label: displayTitle || 'Detalle', href: `/product/${productId}` }
      ];
    }
    
    return [];
  };
  
  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="header-logo-link" aria-label="Knowmad Logo">
            <img src={logoKnowmad} alt="Knowmad Logo" className="header-logo-img" />
          </Link>
        </div>

        <div className="header-center">
          <Link to="/" className="logo">
            <h1>Knowmad Store</h1>
          </Link>
        </div>
        
        <div className="header-right">
          <nav className="breadcrumbs">
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {index > 0 && <span className="separator"> / </span>}
                <Link to={crumb.href} className="breadcrumb-link">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>

          <span className="cart-counter">
            🛒 Carrito: {cartCount}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
