# Knowmad Store - Frontend

Aplicación web desarrollada en **React 18** y **Vite** para la gestión y visualización de un catálogo de productos móviles, con navegación detallada, selección de especificaciones, persistencia de carrito y sistema de caché en cliente.

---

## 🚀 Requisitos Previos

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

---

## ⚙️ Configuración y Variables de Entorno

La aplicación consume un API REST pública para obtener el listado y detalle de los productos. 

1. Copia el archivo de ejemplo para configurar tu entorno:
   ```bash
   cp .env.example .env
   ```

2. Abre `.env` y define la variable `VITE_API_URL` con la URL base del servicio:
   ```env
   VITE_API_URL=https://itx-frontend-test.onrender.com
   ```

> **Nota:** La aplicación cuenta con un valor de respaldo predeterminado en código (`https://itx-frontend-test.onrender.com`), pero se recomienda definir `VITE_API_URL` en `.env` para entornos de desarrollo y despliegues productivos.

---

## 📦 Instalación y Ejecución

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar servidor de desarrollo
```bash
npm start
# o alternativamente:
npm run dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 🧪 Pruebas y Calidad de Código

### Ejecución de Tests Unitarios
El proyecto utiliza **Vitest** con una suite de 46 pruebas automatizadas que validan la lógica de negocio, filtros, sistema de caché y estados:
```bash
npm test
```

### Análisis Estático (Linter)
```bash
npm run lint
```

### Compilación para Producción
Genera el paquete optimizado en el directorio `dist/`:
```bash
npm run build
```

Para previsualizar la compilación de producción localmente:
```bash
npm run preview
```

---

## 🛠️ Decisiones Técnicas y Arquitectura

- **Tecnologías:** React 18, React Router v6, Vite, Vitest.
- **Caché en Cliente (TTL 1 hora):** Para optimizar el tráfico de red y cumplir con la persistencia temporal solicitada, las peticiones a la lista de productos y a los detalles se almacenan en `localStorage` junto con una marca de tiempo de expiración (60 minutos). Si el dato ha expirado o no existe, se solicita a la API y se refresca la caché.
- **Buscador con Debounce:** Filtrado en tiempo real insensible a mayúsculas sobre marca y modelo, con temporizador de 300 ms para evitar cálculos innecesarios en cada pulsación.
- **Estabilidad de Maquetación:** Cuadrícula con columnas `minmax(0, 1fr)` y control de barra de desplazamiento (`scrollbar-gutter: stable`) para prevenir desplazamientos de layout (*layout shifts*) al filtrar productos.
- **Diseño Responsivo:** Paleta minimalista sobre fondo blanco profesional con toques en rojo, naranja y amarillo, adaptable a dispositivos móviles, tablets y escritorio.
- **Navegación Dinámica:** Encabezado con migas de pan sincronizadas con el título del producto visitado y acceso directo al catálogo.
