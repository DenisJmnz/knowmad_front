# Frontend - Product Store Application

## Overview

This is a **React 18** single-page application (SPA) that implements a product store with product listing and detailed product views. The application consumes a public REST API and includes client-side caching, responsive design, and shopping cart functionality.

**Technology Stack:**
- React 18.2.0
- Vite 5.0.0 (build tool)
- React Router DOM 6.18.0
- Axios 1.6.0
- Node 16+, npm 8+

---

## Project Structure

```
frontend/
├── package.json                    # Dependencies and scripts
├── vite.config.js                 # Vite configuration
├── Dockerfile                      # Docker multi-stage build
├── docker-compose.yml             # Docker Compose config
├── README.md                       # This file
├── index.html                      # HTML entry point
├── src/
│   ├── main.jsx                   # React entry point
│   ├── App.jsx                    # Root component with routing
│   ├── components/
│   │   ├── Header.jsx             # Header with breadcrumbs & cart
│   │   ├── SearchBar.jsx          # Search input with debounce
│   │   ├── ProductGrid.jsx        # Grid layout for products
│   │   ├── ProductCard.jsx        # Individual product card
│   │   ├── ProductImage.jsx       # Product image display
│   │   ├── ProductDescription.jsx # Product specs & details
│   │   └── ProductActions.jsx     # Add to cart with selectors
│   ├── pages/
│   │   ├── PLP.jsx                # Product List Page
│   │   └── PDP.jsx                # Product Details Page
│   ├── utils/
│   │   └── api.js                 # API client with caching
│   └── styles/
│       └── index.css              # Global styles (responsive)
└── dist/                          # Build output (after npm build)
```

---

## API Contract

The application consumes a public API at `https://itx-frontend-test.onrender.com/`

### Endpoints Used

#### 1. Get All Products
```
GET /api/product
```
**Response (200 OK):**
```json
[
  {
    "id": "001",
    "name": "Product Name",
    "brand": "Brand",
    "price": 899.99,
    "availability": true,
    "colors": [
      { "code": "1", "name": "Black" },
      { "code": "2", "name": "White" }
    ],
    "storage": [
      { "code": "1", "name": "128GB" },
      { "code": "2", "name": "256GB" }
    ]
  }
]
```

#### 2. Get Product Details
```
GET /api/product/{id}
```
**Response (200 OK):**
```json
{
  "id": "001",
  "name": "Product Name",
  "brand": "Brand",
  "price": 899.99,
  "availability": true,
  "description": "Product description",
  "image": "https://...",
  "cpu": "Snapdragon 8 Gen 2",
  "ram": "8GB",
  "os": "Android 13",
  "screenResolution": "6.7\" OLED",
  "battery": "5000mAh",
  "camera": "50MP Main",
  "dimensions": "160.5 x 77.8 x 8.5mm",
  "weight": "206g",
  "colors": [...],
  "storage": [...]
}
```

#### 3. Add to Cart
```
POST /api/cart
```
**Request Body:**
```json
{
  "id": "001",
  "colorCode": 1,
  "storageCode": 2
}
```
**Response (200 OK):**
```json
{
  "count": 3
}
```

---

## Features

### ✅ Product List Page (PLP)
- Display all products from API
- Real-time search filter by brand/model
- Responsive grid: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Click product to view details
- Debounced search input (300ms)

### ✅ Product Details Page (PDP)
- Full product image display
- Complete specifications table
- Color & Storage selectors
- Add to cart with options
- Back to products link
- In-stock / Out-of-stock status

### ✅ Header Component
- Application title/logo (links to home)
- Breadcrumb navigation
- Shopping cart counter (persistent)
- Responsive layout

### ✅ Client-Side Caching
- **1-hour TTL** for all API responses
- localStorage persistence
- Automatic cache invalidation after expiry
- Reduces API calls significantly

### ✅ Shopping Cart
- Persistent across page reloads
- Count displayed in header
- Sent to API on add to cart
- Updated after each action

### ✅ Responsive Design
- **Desktop** (1024px+): 4 product columns
- **Tablet** (768px-1023px): 2 product columns  
- **Mobile** (480px-767px): 1 product column
- **Small Mobile** (<480px): Full width

---

## Quick Start

### Option 1: Local Development (npm)

**Prerequisites:** Node 16+, npm 8+

**Install dependencies:**
```bash
npm install
```

**Run development server:**
```bash
npm start
```

Application opens at `http://localhost:3000`

**Build for production:**
```bash
npm run build
```

Output in `dist/` directory

### Option 2: Docker Compose

**Prerequisites:** Docker & Docker Compose

**Build & run:**
```bash
docker-compose up --build
```

Application available at `http://localhost:3000`

**Stop:**
```bash
docker-compose down
```

---

## Scripts

### Development
```bash
npm start              # Start Vite dev server on port 3000
npm run build         # Build for production (minified)
npm run preview       # Preview production build locally
npm test              # Run unit tests (vitest)
npm run lint          # Lint code with ESLint
```

### Docker
```bash
docker build -t frontend:latest .              # Build image
docker run -p 3000:3000 frontend:latest        # Run container
docker-compose up -d                           # Run with compose
docker-compose down                            # Stop services
```

---

## Configuration

### Environment Variables

Create `.env` file (optional):
```env
VITE_API_URL=https://itx-frontend-test.onrender.com
```

**Default API URL:** `https://itx-frontend-test.onrender.com`

### Vite Config

File: `vite.config.js`
- Port: 3000
- Host: 0.0.0.0 (accessible externally)
- Build output: `dist/`
- Minifier: Terser

---

## Component Documentation

### Header
- **Props:** `cartCount` (number)
- **Features:** Logo link, breadcrumbs, cart display
- **Responsive:** Full header on desktop, stacked on mobile

### SearchBar
- **Props:** `onSearch` (callback)
- **Features:** Debounced input (300ms), real-time filtering
- **Clears:** Results automatically

### ProductCard
- **Props:** `product`, `onClick`
- **Displays:** Image, brand, model, price
- **Responsive:** Scales with grid

### ProductImage
- **Props:** `product`
- **Features:** Placeholder for missing images, availability badge
- **Responsive:** Maintains aspect ratio

### ProductDescription
- **Props:** `product`
- **Displays:** Full specs table, description
- **Features:** Formatted pricing, brand info

### ProductActions
- **Props:** `product`, `onCartUpdate`
- **Features:** Color & storage selectors, add to cart button
- **Feedback:** Success/error messages, loading states

---

## Caching Strategy

### How It Works
1. **First Load:** Fetch from API, store in localStorage with timestamp
2. **Subsequent Loads:** Check localStorage, if < 1 hour: use cached data
3. **After 1 Hour:** Cache expires, refetch from API
4. **Manual Clear:** `localStorage.clear()`

### Cache Keys
```javascript
products_list          // All products
product_<id>          // Individual product details
cartCount             // Shopping cart count
```

### Expiry: 3600000 ms (1 hour)

---

## Search Implementation

### Features
- Debounced 300ms (prevents excessive filtering)
- Searches by: Brand, Model, Name
- Case-insensitive matching
- Real-time results
- Clears when input is empty

### Usage
```jsx
<SearchBar onSearch={handleSearch} />
```

---

## State Management

**App Component maintains:**
- `cartCount`: Global cart counter
- Loaded from localStorage on mount
- Updated via `setCartCount` callback

**Page Components maintain:**
- `products`: List of products
- `product`: Individual product details
- `loading`, `error`: Async states

**No external state library** (Redux/Zustand) - kept simple per spec

---

## Error Handling

### Network Errors
- Caught by try-catch in API client
- Logged to console
- User shown error message
- Graceful fallback

### Missing Data
- Placeholder images if no image URL
- Default values for specs
- N/A for missing fields

### Invalid Product ID
- Check before render
- Show error message
- Link back to products

---

## Performance Optimizations

1. **Caching:** 1-hour TTL reduces API calls
2. **Debouncing:** Search debounced 300ms
3. **Lazy Loading:** Components load on demand
4. **Minification:** Terser compresses code (20-30% reduction)
5. **Responsive Images:** Scales with viewport
6. **CSS Minification:** Critical styles only

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
VITE_PORT=3001 npm start
```

### API Not Responding
- Check internet connection
- Verify API URL: `https://itx-frontend-test.onrender.com/`
- Check browser console for CORS errors
- Clear cache: `localStorage.clear()`

### Cache Issues
```javascript
// Clear all cache
localStorage.clear();

// Clear specific cache
localStorage.removeItem('products_list');
localStorage.removeItem('product_001');
```

### Build Fails
```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Testing

### Run Tests
```bash
npm test
```

### Test Coverage
```bash
npm test -- --coverage
```

Tests should cover:
- Component rendering
- Search filtering
- Cache expiry
- API error handling
- Cart updates

---

## Deployment

### Production Build
```bash
npm run build
npm run preview  # Test production build locally
```

### Docker Deployment
```bash
docker build -t my-store:latest .
docker run -p 80:3000 my-store:latest
```

### Environment for Deployment
```bash
# Point to production API
VITE_API_URL=https://api.production.com npm run build
```

---

## Style Guide

### CSS Architecture
- **Global:** Resets, typography, colors
- **Components:** Scoped to component
- **Responsive:** Mobile-first approach
- **Colors:** Primary (#0066cc), Success (#4caf50), Error (#f44336)

### Responsive Breakpoints
- Mobile: < 480px
- Tablet: 480px - 1023px
- Desktop: 1024px+

---

## Dependencies

### Production
- `react` - UI library
- `react-dom` - DOM rendering
- `react-router-dom` - Routing
- `axios` - HTTP client (if used)

### Development
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `vitest` - Testing framework
- `eslint` - Code linting
- `terser` - Minification

---

## License

See LICENSE file

---

## Support

For issues:
1. Check browser console (F12)
2. Verify API is accessible
3. Clear localStorage
4. Check network tab for failed requests
5. Review error messages in-app
