# 🧪 Manual Testing Checklist - Product Store

Este documento contiene todas las pruebas manuales que debes realizar en el navegador para verificar que la aplicación funciona correctamente.

---

## 📋 INICIO RÁPIDO

**Ejecutar los tests automáticos:**
```bash
npm test
```

**Ejecutar linter:**
```bash
npm run lint
```

**Iniciar servidor de desarrollo:**
```bash
npm start
```

---

## ✅ TEST SUITE 1: CARGA DE PÁGINA INICIAL (PLP)

### Test 1.1: Página carga sin errores
- [ ] Abre `http://localhost:3000` en el navegador
- [ ] La página carga sin errores en la consola
- [ ] No hay errores de tipo "TypeError" o "Failed to fetch"

**Resultado esperado:** ✅ Página cargada correctamente

---

### Test 1.2: Header visible y funcional
- [ ] Se ve el título "Product Store" en la esquina superior izquierda
- [ ] Se ve "Products" en el breadcrumb
- [ ] Se ve "🛒 Cart: 0" en la esquina superior derecha
- [ ] Haz clic en "Product Store" y vuelve a la página principal

**Resultado esperado:** ✅ Header visible y logo clickeable

---

### Test 1.3: Listado de productos cargado
- [ ] Se ven al menos 20+ productos en el grid
- [ ] Cada producto tiene una imagen (no placeholder)
- [ ] Se ve el nombre/modelo del producto
- [ ] Se ve el precio formateado (ej: $250.00)
- [ ] Se ve "✓ En stock" para todos los productos

**Resultado esperado:** ✅ Grid con 4 columnas en desktop

---

### Test 1.4: Imágenes cargadas correctamente
- [ ] Las imágenes vienen del API (no son placeholders)
- [ ] Las imágenes tienen las dimensiones correctas
- [ ] No hay errores de CORS en la consola
- [ ] Las imágenes se cargan con lazy loading

**Resultado esperado:** ✅ Imágenes visibles de verdad

---

## ✅ TEST SUITE 2: BÚSQUEDA Y FILTRADO

### Test 2.1: SearchBar aparece y es funcional
- [ ] Se ve la barra de búsqueda en la página
- [ ] Placeholder dice algo como "Busca por marca o modelo..."
- [ ] Puedes escribir en ella

**Resultado esperado:** ✅ SearchBar visible

---

### Test 2.2: Búsqueda por marca
- [ ] Escribe "Acer" en la búsqueda
- [ ] Espera 300ms (debounce)
- [ ] Se muestran solo productos de Acer
- [ ] El contador dice "Found 60+ products for 'Acer'"

**Resultado esperado:** ✅ Filtrado por marca funcionando

---

### Test 2.3: Búsqueda por modelo
- [ ] Limpia la búsqueda
- [ ] Escribe "Liquid Z6"
- [ ] Se muestra solo ese modelo o similares
- [ ] Se actualiza el contador de resultados

**Resultado esperado:** ✅ Búsqueda por modelo funcionando

---

### Test 2.4: Búsqueda case-insensitive
- [ ] Escribe "ACER" (mayúsculas)
- [ ] Debería mostrar los mismos resultados que "acer"

**Resultado esperado:** ✅ Búsqueda sin importar mayúsculas/minúsculas

---

### Test 2.5: Búsqueda sin resultados
- [ ] Escribe algo que no existe: "XXXXYYY"
- [ ] Muestra "No products found."

**Resultado esperado:** ✅ Manejo de sin resultados

---

### Test 2.6: Limpiar búsqueda
- [ ] Borra todo el texto de búsqueda
- [ ] Debería mostrarse todos los productos de nuevo

**Resultado esperado:** ✅ Búsqueda limpiada

---

## ✅ TEST SUITE 3: NAVEGACIÓN A DETALLES (PDP)

### Test 3.1: Navegar a detalles del producto
- [ ] Haz clic en cualquier producto del grid
- [ ] Se abre la página de detalles (URL cambia a `/product/...`)
- [ ] No hay errores en la consola

**Resultado esperado:** ✅ PDP cargada correctamente

---

### Test 3.2: Layout de dos columnas en PDP
- [ ] Verifica que hay una columna con la imagen a la izquierda
- [ ] Verifica que hay una columna con detalles a la derecha
- [ ] En mobile, deberían ser una columna (responsivo)

**Resultado esperado:** ✅ Layout 2 columnas en desktop, 1 en mobile

---

### Test 3.3: Imagen del producto en PDP
- [ ] Se ve la imagen grande del producto
- [ ] Badge "✓ In Stock" visible en la esquina
- [ ] Imagen tiene altura/ancho correcto
- [ ] Imagen se carga desde el API

**Resultado esperado:** ✅ Imagen visible con badge

---

### Test 3.4: Información del producto
- [ ] Se ve el nombre/modelo del producto
- [ ] Se ve la marca (Brand)
- [ ] Se ve el precio formateado
- [ ] Se ven las especificaciones (CPU, RAM, OS, etc)
- [ ] La tabla de specs está bien formateada

**Resultado esperado:** ✅ Todos los detalles visibles

---

### Test 3.5: Especificaciones completas
- [ ] Verifica al menos estos campos:
  - [ ] CPU
  - [ ] RAM
  - [ ] Operating System
  - [ ] Screen Resolution (displayResolution)
  - [ ] Battery
  - [ ] Camera (primaryCamera)
  - [ ] Dimensions (dimentions)
  - [ ] Weight

**Resultado esperado:** ✅ Especificaciones mostradas correctamente

---

## ✅ TEST SUITE 4: SELECTORES DE OPCIONES

### Test 4.1: Selector de Color
- [ ] Se ve el selector "Color:"
- [ ] Tiene al menos una opción (ej: "Black")
- [ ] Puedes cambiar la selección
- [ ] El valor seleccionado es un número (code)

**Resultado esperado:** ✅ Selector de color funcionando

---

### Test 4.2: Selector de Storage
- [ ] Se ve el selector "Storage:"
- [ ] Tiene múltiples opciones (ej: "16 GB", "32 GB")
- [ ] Puedes cambiar la selección
- [ ] El valor seleccionado es un número (code)

**Resultado esperado:** ✅ Selector de storage funcionando

---

### Test 4.3: Valores por defecto
- [ ] Cuando abres un producto, el primer color está seleccionado
- [ ] Cuando abres un producto, el primer storage está seleccionado
- [ ] Si no hay opciones, muestra "Default Color" y "Default Storage"

**Resultado esperado:** ✅ Valores por defecto correctos

---

## ✅ TEST SUITE 5: CARRITO DE COMPRAS

### Test 5.1: Botón "Add to Cart"
- [ ] Se ve el botón "Add to Cart" en el PDP
- [ ] El botón está habilitado
- [ ] Al hacer clic, muestra "Adding..."

**Resultado esperado:** ✅ Botón visible y funcional

---

### Test 5.2: Agregar producto al carrito
- [ ] Selecciona un color y storage
- [ ] Haz clic en "Add to Cart"
- [ ] Muestra mensaje "✓ Added to cart! Total items: 1"
- [ ] El mensaje desaparece después de 3 segundos
- [ ] El contador del carrito en el header cambia a "🛒 Cart: 1"

**Resultado esperado:** ✅ Producto agregado y contador actualizado

---

### Test 5.3: Agregar múltiples productos
- [ ] Vuelve a PLP
- [ ] Busca otro producto
- [ ] Abre sus detalles
- [ ] Agrega al carrito
- [ ] El contador ahora dice "🛒 Cart: 2"

**Resultado esperado:** ✅ Carrito acumula productos

---

### Test 5.4: Persistencia del carrito
- [ ] Recarga la página (F5 o Cmd+R)
- [ ] El contador sigue mostrando la cantidad de productos
- [ ] Los datos se recuperan desde localStorage

**Resultado esperado:** ✅ Carrito persiste después de recargar

---

### Test 5.5: Datos enviados al API
- [ ] Abre DevTools (F12)
- [ ] Ve a Network
- [ ] Agrega un producto al carrito
- [ ] Busca la petición POST a `/api/cart`
- [ ] Verifica que envía:
  ```json
  {
    "id": "...",
    "colorCode": 1000,
    "storageCode": 2000
  }
  ```
- [ ] La respuesta debe tener `"count": X`

**Resultado esperado:** ✅ Petición correcta al API

---

## ✅ TEST SUITE 6: NAVEGACIÓN

### Test 6.1: Link "Back to Products"
- [ ] Estás en PDP
- [ ] Se ve el link "← Back to Products" al inicio
- [ ] Haz clic en él
- [ ] Vuelves a PLP

**Resultado esperado:** ✅ Navegación atrás funcionando

---

### Test 6.2: Breadcrumbs en PLP
- [ ] Estás en PLP
- [ ] Breadcrumb muestra "Products"
- [ ] Es clickeable y te mantiene en PLP

**Resultado esperado:** ✅ Breadcrumb en PLP correcto

---

### Test 6.3: Breadcrumbs en PDP
- [ ] Estás en PDP
- [ ] Breadcrumb muestra "Products / Product ..."
- [ ] Haz clic en "Products"
- [ ] Vuelves a PLP

**Resultado esperado:** ✅ Breadcrumb en PDP funcional

---

### Test 6.4: Logo clickeable
- [ ] Desde PDP, haz clic en "Product Store"
- [ ] Vuelves a PLP
- [ ] La URL cambia a "/"

**Resultado esperado:** ✅ Logo navega a home

---

## ✅ TEST SUITE 7: DISEÑO RESPONSIVO

### Test 7.1: Desktop (1024px+)
- [ ] Grid muestra 4 columnas
- [ ] Header tiene todos los elementos horizontales
- [ ] Breadcrumbs visibles
- [ ] Layout 2 columnas en PDP

**Resultado esperado:** ✅ Layout desktop correcto

---

### Test 7.2: Tablet (768px - 1023px)
- [ ] Redimensiona la ventana a 900px de ancho
- [ ] Grid muestra 2 columnas
- [ ] Header sigue funcional
- [ ] Breadcrumbs siguen visibles

**Resultado esperado:** ✅ Layout tablet correcto

---

### Test 7.3: Mobile (480px - 767px)
- [ ] Redimensiona a 600px de ancho
- [ ] Grid muestra 1 columna
- [ ] Componentes se adaptan
- [ ] SearchBar funciona

**Resultado esperado:** ✅ Layout mobile correcto

---

### Test 7.4: Mobile pequeño (< 480px)
- [ ] Redimensiona a 375px (mobile pequeño)
- [ ] Todo sigue siendo usable
- [ ] No hay elementos cortados
- [ ] Puedes hacer scroll

**Resultado esperado:** ✅ Layout pequeño móvil correcto

---

## ✅ TEST SUITE 8: CACHING

### Test 8.1: Cache de productos
- [ ] Abre DevTools (F12) → Application → LocalStorage
- [ ] Busca la clave `products_list`
- [ ] Debería contener un objeto JSON con `data` y `expiry`
- [ ] El timestamp `expiry` debe ser 1 hora en el futuro

**Resultado esperado:** ✅ Cache guardado correctamente

---

### Test 8.2: Cache de producto individual
- [ ] En PDP, verifica el LocalStorage
- [ ] Busca la clave `product_<id>`
- [ ] Contiene los detalles del producto
- [ ] Tiene `expiry` timestamp

**Resultado esperado:** ✅ Cache individual funciona

---

### Test 8.3: Reutilizar cache
- [ ] Recarga PLP
- [ ] Ve a DevTools → Network
- [ ] Filtra por `/api/product`
- [ ] Debería cargar desde cache (rápido)
- [ ] Si vuelves a recargar rápido, no hace nueva petición

**Resultado esperado:** ✅ Cache reduce peticiones

---

### Test 8.4: Limpiar cache
- [ ] En DevTools → Console
- [ ] Ejecuta: `localStorage.clear()`
- [ ] Recarga la página
- [ ] Debería hacer peticiones nuevas al API

**Resultado esperado:** ✅ Cache se limpia correctamente

---

## ✅ TEST SUITE 9: MANEJO DE ERRORES

### Test 9.1: Precio vacío
- [ ] Busca un producto con precio vacío en la lista
- [ ] Debería mostrar "N/A" en lugar de error
- [ ] No hay errores en la consola

**Resultado esperado:** ✅ Precio vacío manejado

---

### Test 9.2: Imagen faltante
- [ ] Si un producto no tiene `imgUrl`
- [ ] Debería mostrar un placeholder
- [ ] No hay errores en la consola

**Resultado esperado:** ✅ Imagen faltante manejada

---

### Test 9.3: Campo faltante en detalles
- [ ] Algunos productos pueden no tener ciertos campos
- [ ] La tabla de specs solo muestra campos existentes
- [ ] No hay errores de "undefined"

**Resultado esperado:** ✅ Campos faltantes manejados

---

### Test 9.4: Conexión lenta/fallo
- [ ] Abre DevTools → Network
- [ ] Baja la velocidad a "Slow 3G"
- [ ] Recarga la página
- [ ] Debería mostrar "Loading products..."
- [ ] Cuando carga, muestra los productos

**Resultado esperado:** ✅ Estados de carga manejados

---

## ✅ TEST SUITE 10: SCRIPTS NPM

### Test 10.1: npm start
```bash
npm start
```
- [ ] El servidor inicia sin errores
- [ ] Se abre `http://localhost:3000`
- [ ] La aplicación carga correctamente
- [ ] Puedes hacer cambios y se aplican con hot reload

**Resultado esperado:** ✅ npm start funciona

---

### Test 10.2: npm run build
```bash
npm run build
```
- [ ] Se ejecuta sin errores
- [ ] Crea la carpeta `dist/`
- [ ] El build es minificado
- [ ] El archivo es más pequeño que el código original

**Resultado esperado:** ✅ Build producción creado

---

### Test 10.3: npm run preview
```bash
npm run preview
```
- [ ] Ejecuta después de `npm run build`
- [ ] Abre `http://localhost:4173` (o similar)
- [ ] La versión producción funciona igual que desarrollo

**Resultado esperado:** ✅ Preview producción funciona

---

### Test 10.4: npm test
```bash
npm test
```
- [ ] Ejecuta los tests de Vitest
- [ ] Muestra al menos 50+ tests
- [ ] Todos pasan (green ✓)
- [ ] Sin warnings de deprecación

**Resultado esperado:** ✅ Todos los tests pasan

---

### Test 10.5: npm run lint
```bash
npm run lint
```
- [ ] Ejecuta ESLint
- [ ] No debe haber errores críticos
- [ ] Puede haber warnings (son OK)

**Resultado esperado:** ✅ Lint sin errores críticos

---

## ✅ TEST SUITE 11: DOCKER (Opcional)

### Test 11.1: Docker build
```bash
docker build -t product-store:latest .
```
- [ ] Se ejecuta sin errores
- [ ] La imagen se crea correctamente

**Resultado esperado:** ✅ Docker image creada

---

### Test 11.2: Docker run
```bash
docker run -p 3000:3000 product-store:latest
```
- [ ] Contenedor inicia sin errores
- [ ] Abre `http://localhost:3000`
- [ ] La aplicación funciona dentro del contenedor

**Resultado esperado:** ✅ Contenedor funciona

---

### Test 11.3: Docker Compose
```bash
docker-compose up --build
```
- [ ] Se ejecuta sin errores
- [ ] Servicio frontend inicia
- [ ] Abre `http://localhost:3000`
- [ ] Funciona igual que en desarrollo

**Resultado esperado:** ✅ Docker Compose funciona

---

## 📊 RESULTADOS FINALES

| Test Suite | Estado | Notas |
|-----------|--------|-------|
| 1. Carga Inicial | ✅/❌ | |
| 2. Búsqueda | ✅/❌ | |
| 3. Navegación PDP | ✅/❌ | |
| 4. Selectores | ✅/❌ | |
| 5. Carrito | ✅/❌ | |
| 6. Navegación | ✅/❌ | |
| 7. Responsivo | ✅/❌ | |
| 8. Caching | ✅/❌ | |
| 9. Errores | ✅/❌ | |
| 10. Scripts NPM | ✅/❌ | |
| 11. Docker | ✅/❌ | |

---

## 🐛 Si algo falla:

1. **Abre DevTools:** F12 (Windows) o Cmd+Option+I (Mac)
2. **Ve a Console:** Busca errores en rojo
3. **Ve a Network:** Busca peticiones fallidas
4. **Limpia cache:** `localStorage.clear()` en la consola
5. **Recarga:** F5 o Cmd+R

---

## 📚 Recursos

- **API Base:** `https://itx-frontend-test.onrender.com`
- **Endpoints:**
  - `GET /api/product` - Lista de productos
  - `GET /api/product/:id` - Detalles del producto
  - `POST /api/cart` - Agregar al carrito

---

**Última actualización:** 12 de octubre de 2026
