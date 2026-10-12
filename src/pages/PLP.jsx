import React, { useEffect, useState } from 'react';
import { getProducts } from '../utils/api';
import SearchBar from '../components/SearchBar';
import ProductGrid from '../components/ProductGrid';

const PLP = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setAllProducts(data || []);
        setFilteredProducts(data || []);
      } catch (err) {
        setError('Error al cargar los productos');
        setAllProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const termClean = (term || '').trim().toLowerCase();

    if (!termClean) {
      setFilteredProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter(product => {
      const brand = (product.brand || '').toLowerCase();
      const model = (product.model || '').toLowerCase();
      const name = (product.name || '').toLowerCase();

      return brand.includes(termClean) || model.includes(termClean) || name.includes(termClean);
    });

    setFilteredProducts(filtered);
  };

  if (loading) {
    return <div className="page-loading">Cargando productos...</div>;
  }

  if (error) {
    return <div className="page-error">{error}</div>;
  }

  return (
    <main className="plp-page">
      <div className="plp-header">
        <h1>Productos</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="plp-results">
        {searchTerm && (
          <p className="search-info">
            Encontrado(s) {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} para &quot;{searchTerm}&quot;
          </p>
        )}
        <ProductGrid products={filteredProducts} />
      </div>
    </main>
  );
};

export default PLP;
