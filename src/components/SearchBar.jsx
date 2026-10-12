import React, { useRef } from 'react';

const SearchBar = ({ onSearch }) => {
  const timeoutRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Busca por marca o modelo..."
        onChange={handleChange}
        aria-label="Búsqueda de productos"
      />
    </div>
  );
};

export default SearchBar;
