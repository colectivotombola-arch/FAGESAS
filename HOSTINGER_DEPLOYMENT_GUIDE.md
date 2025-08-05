# 🚀 GUÍA COMPLETA: FAGESAS A HOSTINGER

## 📋 REQUISITOS PREVIOS

### 1. Cuenta Hostinger
- Plan Premium o Business (recomendado)
- Dominio configurado
- Acceso al Panel de Control

### 2. Archivos del Proyecto
Asegúrate de tener todos estos archivos listos para subir:

```
fagesas/
├── dist/ (carpeta compilada)
├── public/
├── src/
├── index.html
├── package.json
├── vite.config.ts
└── ... otros archivos
```

## 🔧 PREPARACIÓN DEL PROYECTO

### Paso 1: Compilar para Producción

```bash
# En tu terminal local
npm run build
```

Esto genera la carpeta `dist/` con los archivos optimizados.

### Paso 2: Verificar Variables de Entorno
- ✅ Supabase URL: ya configurada
- ✅ API Keys: ya configuradas en Supabase
- ✅ URLs de producción: actualizadas

## 📤 SUBIDA A HOSTINGER

### Método 1: File Manager (Recomendado para principiantes)

1. **Acceder al Panel de Hostinger**
   - Entra a hpanel.hostinger.com
   - Inicia sesión con tu cuenta

2. **Ir a File Manager**
   - Busca "File Manager" en el panel
   - Selecciona tu dominio

3. **Limpiar la carpeta public_html**
   - Elimina archivos por defecto de Hostinger
   - Mantén solo archivos necesarios (.htaccess si existe)

4. **Subir archivos FAGESAS**
   - Sube TODO el contenido de la carpeta `dist/`
   - Arrastra y suelta los archivos
   - Espera a que termine la subida

### Método 2: FTP (Avanzado)

1. **Configurar cliente FTP**
   ```
   Host: ftp.tudominio.com
   Usuario: tu_usuario_ftp
   Contraseña: tu_contraseña_ftp
   Puerto: 21
   ```

2. **Conectar y subir**
   - Conecta al servidor FTP
   - Navega a `/public_html/`
   - Sube el contenido de `dist/`

## ⚙️ CONFIGURACIÓN EN HOSTINGER

### 1. Configurar Redirects (IMPORTANTE)

Crea un archivo `.htaccess` en public_html:

```apache
# Fagesas .htaccess para SPA
RewriteEngine On
RewriteBase /

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set Referrer-Policy strict-origin-when-cross-origin

# Enable compression
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
</IfModule>
```

### 2. Configurar SSL/HTTPS
- Ve a SSL en el panel de Hostinger
- Activa "Force HTTPS"
- Espera propagación (5-10 minutos)

### 3. Configurar Dominio
- Asegúrate que el dominio apunte a Hostinger
- Configura subdominios si los necesitas

## 🔄 CONFIGURACIÓN DE SUPABASE PARA PRODUCCIÓN

### 1. URLs de Producción
En Supabase Dashboard:
- Ve a Settings > API
- Agrega tu dominio a "Site URL"
- Configura "Redirect URLs":
  ```
  https://tudominio.com/
  https://tudominio.com/auth
  ```

### 2. CORS Configuration
En Supabase > Settings > API > CORS:
```
https://tudominio.com
https://www.tudominio.com
```

## 🧪 TESTING POST-DESPLIEGUE

### Checklist de Verificación:

1. **✅ Página Principal**
   - [ ] Se carga correctamente
   - [ ] Todos los módulos funcionan
   - [ ] Estilos se aplican bien

2. **✅ Autenticación**
   - [ ] Registro funciona
   - [ ] Login funciona  
   - [ ] Logout funciona
   - [ ] Rutas protegidas funcionan

3. **✅ Módulos**
   - [ ] FageBot responde
   - [ ] Casino muestra eventos
   - [ ] Stream funciona
   - [ ] Wallet opera
   - [ ] Tómbola carga

4. **✅ Performance**
   - [ ] Carga rápida (<3 segundos)
   - [ ] Sin errores en consola
   - [ ] Responsive en móvil

## 🚨 SOLUCIÓN DE PROBLEMAS COMUNES

### Error: "Cannot GET /"
- **Problema**: Faltan redirects para SPA
- **Solución**: Crear/verificar .htaccess

### Error: 403 Forbidden
- **Problema**: Permisos de archivos
- **Solución**: Cambiar permisos a 644 para archivos, 755 para carpetas

### Error: CORS
- **Problema**: Supabase no acepta el dominio
- **Solución**: Agregar dominio a CORS en Supabase

### Página en blanco
- **Problema**: Archivos JS no cargan
- **Solución**: Verificar rutas y permisos

### Autenticación no funciona
- **Problema**: URLs de redirect mal configuradas
- **Solución**: Verificar Site URL en Supabase

## 📊 MONITOREO POST-LANZAMIENTO

### 1. Analytics
- FageBot proporcionará métricas automáticas
- Monitorea usuarios activos
- Revisa errores en tiempo real

### 2. Performance
- Usa Google PageSpeed Insights
- Verifica tiempos de carga
- Optimiza según recomendaciones

### 3. Mantenimiento Automático
- FageBot ejecuta optimizaciones 24/7
- Backups automáticos cada 4h
- Monitoreo de seguridad constante

## 🎯 COMANDOS ÚTILES POST-DESPLIEGUE

Una vez que FAGESAS esté funcionando, puedes usar:

```
/optimize - Optimización inmediata del sistema
/report - Reporte completo de estado
/backup - Backup manual del sistema
/security - Auditoría de seguridad
/analytics - Métricas de usuarios
```

## 🆘 SOPORTE TÉCNICO

Si tienes problemas:

1. **Revisa logs de error** en File Manager
2. **Verifica la consola** del navegador (F12)
3. **Contacta a FageBot** dentro de la app
4. **Hostinger Support** para problemas del servidor

## ✅ LISTA FINAL DE VERIFICACIÓN

Antes de considerar el despliegue completo:

- [ ] Todos los archivos subidos correctamente
- [ ] .htaccess configurado
- [ ] SSL/HTTPS activo
- [ ] Supabase URLs actualizadas
- [ ] Autenticación funcionando
- [ ] Todos los módulos operativos
- [ ] Performance optimizada
- [ ] FageBot respondiendo
- [ ] Dominio accesible públicamente

¡Tu plataforma FAGESAS estará lista para conquistar el mundo digital! 🚀

---

**Nota**: Este manual asume uso de Hostinger Premium/Business. Para planes básicos, algunas características avanzadas pueden requerir configuración adicional.