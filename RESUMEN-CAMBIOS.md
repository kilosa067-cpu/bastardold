# 📋 Resumen de Cambios - Bastard Old School

## ✅ Cambios Realizados

### 1. Intro
- ✅ Añadido "The Classic is the New Punk" debajo del logo
- ✅ Animación sincronizada con el resto del intro

### 2. Hero (Entrada)
- ✅ Video de fondo en bucle (autoplay, muted, loop)
- ✅ Fondo negro
- ✅ Efecto cinematográfico suave

### 3. Navegación
- ✅ Logo redondo en lugar de tijeras
- ✅ Nuevo orden: Inicio, Noticias, Historia, Galería, Barberos, Servicios, Seminarios, Educación, Agenda, Reseñas, Contacto

### 4. Galería (Nueva Sección)
- ✅ Efectos visuales dinámicos con GSAP
- ✅ Imágenes que aparecen al hacer scroll
- ✅ Efecto parallax en imágenes
- ✅ Shine effect al hover
- ✅ 6 imágenes de trabajos

### 5. Educación
- ✅ Imágenes de Unsplash removidas
- ✅ Diseño limpio sin imágenes

### 6. Seminarios
- ✅ Imágenes removidas
- ✅ Diseño limpio

### 7. Noticias
- ✅ 3 noticias con imágenes reales
- ✅ YouTube removido

### 8. Reseñas
- ✅ Solo 1 reseña para preview
- ✅ Estadísticas actualizadas

### 9. Historia
- ✅ Texto corregido y profesionalizado

---

## 🔥 Credenciales Firebase

```
VITE_FIREBASE_API_KEY=AIzaSyBMGvcR2JjDw-loYL_6WwXsgAj2s_JmzvI
VITE_FIREBASE_AUTH_DOMAIN=bastard-old-school.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=bastard-old-school
VITE_FIREBASE_STORAGE_BUCKET=bastard-old-school.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1030562430366
VITE_FIREBASE_APP_ID=1:1030562430366:web:e31fa204b952cf6a6b6a8f

ADMIN EMAIL: jahzeelbarberclassic@gmail.com
ADMIN PASSWORD: BastardMacias1
```

---

## 📁 Imágenes Incluidas

### Galería (6 imágenes):
- galeria1.jpg - galeria4.jpg
- corteclasico.jpg
- fadeseminario.jpg

### Noticias (2 imágenes):
- noticia1.jpg
- noticia2.jpg

### Otras:
- bastard.jpg
- kilo.jpg
- adrohair.jpg
- logoinicio.png
- logob.png
- entrada.jpg

---

## 🚀 Para Subir a Vercel

1. Descomprimir el ZIP
2. Abrir terminal en la carpeta `app`
3. Ejecutar: `npm install`
4. Ejecutar: `npm run build`
5. Subir carpeta `dist` a Vercel

---

## ⚠️ Nota Importante

El video del Hero debe estar en:
`/public/videos/hero-video.mp4`

Si no tienes el video, usa una imagen de respaldo editando:
`src/sections/Hero.tsx` - cambiar `backgroundImage` en lugar de video.
