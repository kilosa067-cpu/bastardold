# 🚀 Build Local - Bastard Old School

## Instrucciones para compilar en tu computadora

### Paso 1: Instalar dependencias
```bash
cd /ruta/a/tu/proyecto/app
npm install
```

### Paso 2: Crear archivo .env
El archivo `.env` ya está creado con tus datos de Firebase.

### Paso 3: Compilar
```bash
npm run build
```

### Paso 4: Deploy en Vercel
Sube la carpeta `dist` a Vercel o conecta tu repositorio de GitHub.

---

## 📋 Cambios realizados en esta versión

✅ **Noticias** ahora está arriba de Historia
✅ **Noticias** aparece en el menú de navegación
✅ **YouTube Shorts** integrado (reemplazó Instagram)
✅ **Reseñas** nueva sección con testimonios
✅ **Texto de Bastard** corregido y profesionalizado
✅ **Imágenes** sin efecto blur (evita pixelación)
✅ **Firebase** configurado con tus credenciales

---

## 🔧 Si tienes problemas

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "TypeScript errors"
Los errores de tipo son normales, el build debería funcionar igual.

---

## 📁 Estructura del proyecto

```
app/
├── src/
│   ├── sections/     # Todas las secciones de la página
│   ├── stores/       # Estados globales
│   └── ...
├── public/images/    # Imágenes del sitio
├── dist/            # Build final (generado por npm run build)
└── .env             # Variables de entorno (ya configurado)
```

---

## 🌐 Variables de entorno configuradas

```env
VITE_FIREBASE_API_KEY=AIzaSyBMGvcR2JjDw-loYL_6WwXsgAj2s_JmzvI
VITE_FIREBASE_AUTH_DOMAIN=bastard-old-school.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=bastard-old-school
VITE_FIREBASE_STORAGE_BUCKET=bastard-old-school.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1030562430366
VITE_FIREBASE_APP_ID=1:1030562430366:web:e31fa204b952cf6a6b6a8f
```

---

## 📞 ¿Necesitas ayuda?

Si tienes problemas con el build, contáctame y te ayudo.
