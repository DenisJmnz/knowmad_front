const API_BASE = import.meta.env.VITE_API_URL || 'https://itx-frontend-test.onrender.com';

const CACHE_TTL = 60 * 60 * 1000;

const cache = {
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify({
      data: value,
      expiry: Date.now() + CACHE_TTL
    }));
  },
  
  get: (key) => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    const { data, expiry } = JSON.parse(item);
    if (Date.now() > expiry) {
      localStorage.removeItem(key);
      return null;
    }
    
    return data;
  },
  
  clear: (key) => {
    localStorage.removeItem(key);
  }
};

export const getProducts = async () => {
  const cacheKey = 'products_list';
  const cached = cache.get(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(`${API_BASE}/api/product`);
    if (!response.ok) throw new Error('Failed to fetch products');
    let data = await response.json();
    
    if (!Array.isArray(data)) {
      data = [];
    } else {
      data = data.map(product => ({
        ...product,
        price: typeof product.price === 'string' ? parseFloat(product.price) : product.price
      }));
    }
    
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductDetail = async (id) => {
  const cacheKey = `product_${id}`;
  const cached = cache.get(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(`${API_BASE}/api/product/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch product ${id}`);
    let data = await response.json();
    
    if (data) {
      data = {
        ...data,
        price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
        colors: data.options?.colors || data.colors || [],
        storage: data.options?.storages || data.storage || []
      };
    }
    
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const addToCart = async (productData) => {
  try {
    const response = await fetch(`${API_BASE}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });
    
    if (!response.ok) throw new Error('Failed to add to cart');
    return await response.json();
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};
