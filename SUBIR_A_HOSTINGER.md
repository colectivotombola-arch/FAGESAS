# 🚀 FAGESAS - Listo para Hostinger

## 📦 QUÉ TIENES QUE SUBIR

Después de hacer `npm run build`, sube **SOLO EL CONTENIDO** de la carpeta `dist/` a Hostinger.

### 📁 Estructura que se genera:
```
dist/
├── index.html          ← Página principal
├── assets/
│   ├── index-xyz.js    ← JavaScript compilado
│   ├── index-xyz.css   ← Estilos compilados
│   └── logos/          ← Imágenes optimizadas
├── favicon.ico
├── robots.txt
└── .htaccess          ← Importante para rutas
```

## 🔧 PASOS EXACTOS:

### 1. En tu computadora:
```bash
npm run build
```

### 2. En Hostinger:
1. Ve a **Administrador de archivos**
2. Entra a **`public_html`**
3. **BORRA TODO** lo que esté ahí
4. **SUBE TODO** el contenido de `dist/`

### 3. Archivo .htaccess (IMPORTANTE):
Si no se subió automáticamente, crea `.htaccess` en `public_html`:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static files
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/ico "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

## ✅ RESUMEN SIMPLE:
1. `npm run build` 
2. Sube **TODO** de `dist/` a `public_html/`
3. Activa HTTPS en Hostinger
4. ¡Funciona en `https://tudominio.com`!

**🎯 Tamaño total:** ~2-5 MB (súper liviano)
**⚡ Velocidad:** Optimizado para carga rápida
**🔒 Seguridad:** Headers de seguridad incluidos