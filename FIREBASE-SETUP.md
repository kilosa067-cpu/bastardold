# 🔥 CONFIGURACIÓN DE FIREBASE - BASTARD BARBER

Esta guía te ayudará a configurar Firebase para que tu panel de administración funcione en la nube.

---

## 📋 PASO 1: Crear Proyecto en Firebase

1. Ve a [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Click en **"Crear un proyecto"**
3. Nombre del proyecto: `bastard-barber` (o el que prefieras)
4. Desactiva Google Analytics (o actívalo si lo necesitas)
5. Click en **"Crear proyecto"**

---

## 📋 PASO 2: Registrar la Aplicación Web

1. En el dashboard de Firebase, click en el icono **"</>"** (Web)
2. Nombre de la app: `bastard-web`
3. Click en **"Registrar app"**
4. Copia el objeto `firebaseConfig` que aparece

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

## 📋 PASO 3: Configurar Variables de Entorno

1. Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Rellena los valores con los de tu Firebase:
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

---

## 📋 PASO 4: Activar Servicios de Firebase

### 🔐 Authentication (Login)
1. En el menú lateral, click en **"Authentication"**
2. Click en **"Comenzar"**
3. Selecciona **"Correo electrónico/Contraseña"**
4. Activa el primer toggle (Correo electrónico/Contraseña)
5. Click en **"Guardar"**

### 🗄️ Firestore Database
1. En el menú lateral, click en **"Firestore Database"**
2. Click en **"Crear base de datos"**
3. Selecciona **"Iniciar en modo de prueba"**
4. Click en **"Siguiente"**
5. Selecciona la ubicación más cercana (us-central o similar)
6. Click en **"Habilitar"**

### 🖼️ Storage (Imágenes)
1. En el menú lateral, click en **"Storage"**
2. Click en **"Comenzar"**
3. Selecciona **"Iniciar en modo de prueba"**
4. Click en **"Siguiente"**
5. Selecciona la misma ubicación que Firestore
6. Click en **"Habilitar"**

---

## 📋 PASO 5: Crear Usuario Administrador

1. Ve a **Authentication** > **Users**
2. Click en **"Agregar usuario"**
3. Correo: `admin@bastard.com` (o el que prefieras)
4. Contraseña: Crea una contraseña segura
5. Click en **"Agregar usuario"**

---

## 📋 PASO 6: Configurar Reglas de Seguridad

### Firestore Rules
1. Ve a **Firestore Database** > **Reglas**
2. Reemplaza con estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura pública para config, barberos, servicios
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click en **"Publicar"**

### Storage Rules
1. Ve a **Storage** > **Reglas**
2. Reemplaza con estas reglas:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click en **"Publicar"**

---

## 📋 PASO 7: Crear Estructura de Datos Inicial

Puedes usar este script para crear los datos iniciales:

```javascript
// En la consola de Firebase (o usando el panel admin después)
const initialData = {
  site: {
    config: {
      hero: {
        title: 'Barbería no es moda. Es ritual.',
        subtitle: 'Tradición clásica. Precisión moderna.',
        ctaPrimary: 'Agendar Cita',
        ctaSecondary: 'Conoce la Historia',
        backgroundImage: '/images/entrada.jpg'
      },
      historia: {
        title: 'La historia de Bastard',
        quote: '"SOMOS AMANTES DE LA CULTURA CLÁSICA"',
        paragraphs: [
          'Es una marca personal dedicada a la preservación...',
          'Creada el 25 de Julio del 2014...',
          'Nace como una sátira...'
        ],
        image: '/images/bastard.jpg',
        year: '2014',
        location: 'Oaxaca, México'
      },
      contact: {
        phone: '+52 951 123 4567',
        email: 'hola@bastardoldschool.com',
        address: 'Oaxaca de Juárez, Oaxaca, México',
        instagram: 'https://www.instagram.com/bastardoldschool/',
        whatsapp: 'https://wa.me/5219511234567',
        locationUrl: 'https://share.google/dV49v5RQN3UvxQhN6'
      },
      shopSchedule: {
        openTime: '09:00',
        closeTime: '20:00',
        daysOpen: [1, 2, 3, 4, 5, 6]
      }
    }
  }
};
```

---

## 📋 PASO 8: Probar la Configuración

1. Inicia tu aplicación localmente:
```bash
npm run dev
```

2. Ve al footer y click en **"Panel Admin"**
3. Ingresa con el correo y contraseña que creaste
4. ¡Deberías poder acceder al panel!

---

## 🚀 DESPLEGAR EN VERCEL CON FIREBASE

### 1. Agregar Variables de Entorno en Vercel

1. Ve a tu proyecto en [Vercel](https://vercel.com)
2. Click en **"Settings"** > **"Environment Variables"**
3. Agrega cada variable de tu archivo `.env`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

### 2. Redesplegar

1. Ve a la pestaña **"Deployments"**
2. Click en los tres puntos del último deploy
3. Click en **"Redeploy"**

---

## ✅ CHECKLIST FINAL

- [ ] Proyecto Firebase creado
- [ ] App web registrada
- [ ] Variables de entorno configuradas
- [ ] Authentication activado
- [ ] Firestore Database creado
- [ ] Storage activado
- [ ] Usuario admin creado
- [ ] Reglas de seguridad configuradas
- [ ] Datos iniciales creados
- [ ] Login funciona en local
- [ ] Variables agregadas en Vercel
- [ ] Deploy actualizado

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### "Firebase App already exists"
- Refresca la página
- O reinicia el servidor de desarrollo

### "Permission denied"
- Verifica las reglas de Firestore/Storage
- Asegúrate de que el usuario esté autenticado

### "User not found"
- Crea el usuario en Firebase Auth > Users
- Verifica el correo y contraseña

### Las imágenes no suben
- Verifica que Storage esté habilitado
- Verifica las reglas de Storage
- Asegúrate de que el usuario esté autenticado

---

## 📚 RECURSOS ADICIONALES

- [Documentación de Firebase](https://firebase.google.com/docs)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Cloud Storage](https://firebase.google.com/docs/storage)

---

**¡Listo para usar Firebase! 🎉**
