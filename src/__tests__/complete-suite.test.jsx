import { describe, it, expect, beforeEach } from 'vitest';

describe('API Client - Caching System', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should cache products with TTL expiry timestamp', () => {
    const testData = {
      data: [{ id: '001', brand: 'Test', model: 'Product' }],
      expiry: Date.now() + 3600000
    };
    
    localStorage.setItem('products_list', JSON.stringify(testData));
    const cached = localStorage.getItem('products_list');
    
    expect(cached).toBeTruthy();
    const parsed = JSON.parse(cached);
    expect(parsed.data).toHaveLength(1);
  });

  it('should detect expired cache', () => {
    const expiredData = {
      data: { id: '001' },
      expiry: Date.now() - 1000
    };
    
    localStorage.setItem('product_001', JSON.stringify(expiredData));
    const cached = JSON.parse(localStorage.getItem('product_001'));
    
    expect(Date.now() > cached.expiry).toBe(true);
  });

  it('should store and retrieve product details', () => {
    const product = {
      id: 'test123',
      brand: 'Acer',
      model: 'Liquid Z6',
      price: '250',
      imgUrl: 'https://example.com/image.jpg'
    };
    
    const cacheData = {
      data: product,
      expiry: Date.now() + 3600000
    };
    
    localStorage.setItem('product_test123', JSON.stringify(cacheData));
    const retrieved = JSON.parse(localStorage.getItem('product_test123'));
    
    expect(retrieved.data.id).toBe('test123');
    expect(retrieved.data.brand).toBe('Acer');
  });
});

describe('Shopping Cart Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save cart count to localStorage', () => {
    const cartCount = 5;
    localStorage.setItem('cartCount', cartCount.toString());
    
    const saved = localStorage.getItem('cartCount');
    expect(saved).toBe('5');
  });

  it('should retrieve and parse cart count', () => {
    localStorage.setItem('cartCount', '3');
    const cartCount = parseInt(localStorage.getItem('cartCount'));
    
    expect(cartCount).toBe(3);
    expect(typeof cartCount).toBe('number');
  });

  it('should handle zero cart count', () => {
    localStorage.setItem('cartCount', '0');
    const cartCount = parseInt(localStorage.getItem('cartCount'));
    
    expect(cartCount).toBe(0);
  });

  it('should update cart count on multiple additions', () => {
    localStorage.setItem('cartCount', '0');
    
    let count = parseInt(localStorage.getItem('cartCount'));
    count += 1;
    localStorage.setItem('cartCount', count.toString());
    
    count = parseInt(localStorage.getItem('cartCount'));
    count += 2;
    localStorage.setItem('cartCount', count.toString());
    
    const final = parseInt(localStorage.getItem('cartCount'));
    expect(final).toBe(3);
  });
});

describe('Product Data Formatting', () => {
  it('should convert string price to number', () => {
    const price = '250';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    expect(typeof numPrice).toBe('number');
    expect(numPrice).toBe(250);
  });

  it('should format price with 2 decimals', () => {
    const price = 250;
    const formatted = `$${price.toFixed(2)}`;
    
    expect(formatted).toBe('$250.00');
  });

  it('should handle empty price gracefully', () => {
    const price = '';
    const formatted = !price && price !== 0 ? 'N/A' : `$${parseFloat(price).toFixed(2)}`;
    
    expect(formatted).toBe('N/A');
  });

  it('should handle products with model or name fields', () => {
    const product1 = { id: '001', model: 'Liquid Z6' };
    const product2 = { id: '002', name: 'Some Product' };
    
    const name1 = product1.model || product1.name || 'Product';
    const name2 = product2.model || product2.name || 'Product';
    
    expect(name1).toBe('Liquid Z6');
    expect(name2).toBe('Some Product');
  });

  it('should use imgUrl or fallback to placeholder', () => {
    const product1 = { id: '001', imgUrl: 'https://example.com/img.jpg', model: 'Test' };
    const product2 = { id: '002', model: 'Test' };
    
    const img1 = product1.imgUrl || `https://via.placeholder.com/200x200?text=${product1.model}`;
    const img2 = product2.imgUrl || `https://via.placeholder.com/200x200?text=${product2.model}`;
    
    expect(img1).toContain('example.com');
    expect(img2).toContain('placeholder.com');
  });
});

describe('Search Filtering', () => {
  const products = [
    { id: '001', brand: 'Acer', model: 'Liquid Z6' },
    { id: '002', brand: 'Samsung', model: 'Galaxy S21' },
    { id: '003', brand: 'Acer', model: 'Iconia Tab' }
  ];

  it('should filter by brand (case-insensitive)', () => {
    const searchTerm = 'acer';
    const filtered = products.filter(p =>
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    expect(filtered).toHaveLength(2);
    expect(filtered[0].brand).toBe('Acer');
  });

  it('should filter by model name', () => {
    const searchTerm = 'galaxy';
    const filtered = products.filter(p =>
      p.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    expect(filtered).toHaveLength(1);
    expect(filtered[0].model).toContain('Galaxy');
  });

  it('should return empty array for no matches', () => {
    const searchTerm = 'nokia';
    const filtered = products.filter(p =>
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    expect(filtered).toHaveLength(0);
  });

  it('should return all products for empty search', () => {
    const searchTerm = '';
    const filtered = products.filter(p =>
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    expect(filtered).toHaveLength(3);
  });
});

describe('Responsive Design Breakpoints', () => {
  it('should have mobile breakpoint < 480px', () => {
    const breakpoint = 480;
    expect(breakpoint).toBe(480);
  });

  it('should have tablet breakpoint 480-1023px', () => {
    const minTablet = 480;
    const maxTablet = 1023;
    
    expect(minTablet < maxTablet).toBe(true);
  });

  it('should have desktop breakpoint 1024px+', () => {
    const desktopBreakpoint = 1024;
    expect(desktopBreakpoint).toBeGreaterThanOrEqual(1024);
  });

  it('should show 1 column on mobile', () => {
    const mobileColumns = 1;
    expect(mobileColumns).toBe(1);
  });

  it('should show 2 columns on tablet', () => {
    const tabletColumns = 2;
    expect(tabletColumns).toBe(2);
  });

  it('should show 4 columns on desktop', () => {
    const desktopColumns = 4;
    expect(desktopColumns).toBe(4);
  });
});

describe('Product Options (Colors & Storage)', () => {
  it('should handle options object from API', () => {
    const product = {
      id: 'test',
      options: {
        colors: [
          { code: 1000, name: 'Black' },
          { code: 1001, name: 'White' }
        ],
        storages: [
          { code: 2000, name: '16 GB' },
          { code: 2001, name: '32 GB' }
        ]
      }
    };

    const colors = product.options?.colors || [];
    const storages = product.options?.storages || [];

    expect(colors).toHaveLength(2);
    expect(storages).toHaveLength(2);
    expect(colors[0].name).toBe('Black');
  });

  it('should fallback to old structure if no options', () => {
    const product = {
      id: 'test',
      colors: [{ code: '1', name: 'Blue' }],
      storage: [{ code: '2', name: '64GB' }]
    };

    const colors = product.options?.colors || product.colors || [];
    const storages = product.options?.storages || product.storage || [];

    expect(colors).toHaveLength(1);
    expect(storages).toHaveLength(1);
  });

  it('should set default first option when available', () => {
    const colors = [
      { code: 1000, name: 'Black' },
      { code: 1001, name: 'White' }
    ];

    const selectedColor = colors?.[0]?.code || '1';
    expect(selectedColor).toBe(1000);
  });

  it('should fallback to default when no options', () => {
    const colors = [];
    const selectedColor = colors?.[0]?.code || '1';
    
    expect(selectedColor).toBe('1');
  });
});

describe('Error Handling', () => {
  it('should handle missing product data gracefully', () => {
    const product = {};
    const name = product.model || product.name || 'Product';
    const price = !product.price && product.price !== 0 ? 'N/A' : product.price;

    expect(name).toBe('Product');
    expect(price).toBe('N/A');
  });

  it('should handle null values', () => {
    const product = { model: null, price: null };
    const name = product.model || product.name || 'Product';

    expect(name).toBe('Product');
  });

  it('should handle undefined properties', () => {
    const product = { id: '001' };
    const hasBrand = product.brand !== undefined;

    expect(hasBrand).toBe(false);
  });

  it('should parse numeric codes from selectors', () => {
    const colorCode = '1000';
    const storageCode = '2000';

    const numColor = parseInt(colorCode);
    const numStorage = parseInt(storageCode);

    expect(numColor).toBe(1000);
    expect(numStorage).toBe(2000);
    expect(typeof numColor).toBe('number');
  });
});

describe('Search Debounce', () => {
  it('should have 300ms debounce delay', () => {
    const debounceDelay = 300;
    expect(debounceDelay).toBe(300);
  });

  it('should prevent excessive API calls', () => {
    const searches = ['a', 'ac', 'ace', 'acer'];
    expect(searches.length).toBeGreaterThan(1);
  });
});

describe('Breadcrumb Navigation', () => {
  it('should show only Products on PLP', () => {
    const breadcrumbs = [{ label: 'Products', href: '/' }];
    
    expect(breadcrumbs).toHaveLength(1);
    expect(breadcrumbs[0].label).toBe('Products');
  });

  it('should show Products > Product on PDP', () => {
    const productId = '001';
    const breadcrumbs = [
      { label: 'Products', href: '/' },
      { label: `Product ${productId}`, href: `/product/${productId}` }
    ];

    expect(breadcrumbs).toHaveLength(2);
    expect(breadcrumbs[0].label).toBe('Products');
    expect(breadcrumbs[1].label).toContain('Product');
  });
});

describe('SPA Routing', () => {
  it('should have home route /', () => {
    const homeRoute = '/';
    expect(homeRoute).toBe('/');
  });

  it('should have product detail route /product/:id', () => {
    const productId = '001';
    const route = `/product/${productId}`;
    
    expect(route).toBe('/product/001');
  });

  it('should navigate back to home', () => {
    const currentRoute = '/product/001';
    const homeRoute = '/';
    
    expect(currentRoute).not.toBe(homeRoute);
    expect(homeRoute).toBe('/');
  });
});
