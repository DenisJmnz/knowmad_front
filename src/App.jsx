import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PLP from './pages/PLP';
import PDP from './pages/PDP';
import './styles/index.css';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [productTitle, setProductTitle] = useState('');

  useEffect(() => {
    const savedCount = localStorage.getItem('cartCount');
    if (savedCount) {
      setCartCount(parseInt(savedCount));
    }
  }, []);

  const handleSetCartCount = (count) => {
    setCartCount(count);
    localStorage.setItem('cartCount', count.toString());
  };

  return (
    <Router>
      <Header cartCount={cartCount} productTitle={productTitle} />
      <Routes>
        <Route path="/" element={<PLP />} />
        <Route path="/product/:id" element={<PDP setCartCount={handleSetCartCount} setProductTitle={setProductTitle} />} />
      </Routes>
    </Router>
  );
}

export default App;
