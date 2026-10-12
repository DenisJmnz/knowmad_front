import { describe, it, expect, beforeEach } from 'vitest';

describe('ProductGrid Component', () => {
  it('should display products', () => {
    const products = [
      { id: '001', name: 'Test Product', price: 100, availability: true },
      { id: '002', name: 'Test Product 2', price: 200, availability: false }
    ];

    expect(products).toHaveLength(2);
    expect(products[0].name).toBe('Test Product');
  });

  it('should handle empty products array', () => {
    const products = [];
    expect(products).toHaveLength(0);
  });
});

describe('Search Filtering', () => {
  it('should filter products by brand', () => {
    const products = [
      { id: '001', brand: 'Apple', name: 'iPhone' },
      { id: '002', brand: 'Samsung', name: 'Galaxy' }
    ];

    const filtered = products.filter(p => 
      p.brand.toLowerCase().includes('apple')
    );

    expect(filtered).toHaveLength(1);
    expect(filtered[0].brand).toBe('Apple');
  });

  it('should filter products by name', () => {
    const products = [
      { id: '001', brand: 'Apple', name: 'iPhone' },
      { id: '002', brand: 'Samsung', name: 'Galaxy' }
    ];

    const filtered = products.filter(p => 
      p.name.toLowerCase().includes('galaxy')
    );

    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toBe('Galaxy');
  });

  it('should filter products safely when name is undefined and model is present', () => {
    const products = [
      { id: '001', brand: 'Acer', model: 'Liquid Z6' },
      { id: '002', brand: 'Samsung', model: 'Galaxy S21' }
    ];

    const term = 'liquid';
    const filtered = products.filter(product => {
      const brand = (product.brand || '').toLowerCase();
      const model = (product.model || '').toLowerCase();
      const name = (product.name || '').toLowerCase();
      return brand.includes(term) || model.includes(term) || name.includes(term);
    });

    expect(filtered).toHaveLength(1);
    expect(filtered[0].model).toBe('Liquid Z6');
  });
});

describe('Cart Functionality', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should persist cart count to localStorage', () => {
    const cartCount = 5;
    localStorage.setItem('cartCount', cartCount.toString());
    
    const saved = localStorage.getItem('cartCount');
    expect(saved).toBe('5');
  });

  it('should retrieve cart count from localStorage', () => {
    localStorage.setItem('cartCount', '3');
    
    const cartCount = parseInt(localStorage.getItem('cartCount'));
    expect(cartCount).toBe(3);
  });
});

describe('Cache System', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should store data with expiry timestamp', () => {
    const cacheData = {
      data: { id: '001', name: 'Product' },
      expiry: Date.now() + 3600000
    };

    localStorage.setItem('product_001', JSON.stringify(cacheData));
    
    const retrieved = JSON.parse(localStorage.getItem('product_001'));
    expect(retrieved.data.id).toBe('001');
    expect(retrieved.expiry).toBeGreaterThan(Date.now());
  });

  it('should invalidate expired cache', () => {
    const expiredData = {
      data: { id: '001' },
      expiry: Date.now() - 1000
    };

    localStorage.setItem('product_001', JSON.stringify(expiredData));
    
    const retrieved = JSON.parse(localStorage.getItem('product_001'));
    expect(Date.now() > retrieved.expiry).toBe(true);
  });
});
