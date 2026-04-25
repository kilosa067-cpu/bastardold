# 🎨 BASTARD OLD SCHOOL MASTER BARBER
## Documentación para Despliegue en Vercel

---

## 📁 ESTRUCTURA DE IMÁGENES

### Ubicación: `/public/images/`

| Nombre de archivo | Sección donde se usa | Descripción |
|-------------------|---------------------|-------------|
| `entrada.jpg` | Hero | Imagen de fondo del banner principal |
| `haircut.jpg` | Barberos | Foto de los barberos (Kilo/Fer) |
| `bastard.jpg` | Historia + Noticias | Foto de Bastard para historia y noticias |
| `logob.png` | Logo opcional | Logo de la marca (si se quiere usar) |

### 📋 Checklist de Imágenes antes de subir:
- [ ] `entrada.jpg` - Foto de la barbería o ambiente (recomendado: 1920x1080)
- [ ] `haircut.jpg` - Foto de barberos trabajando (recomendado: 800x1000)
- [ ] `bastard.jpg` - Foto del fundador (recomendado: 800x1000)
- [ ] `logob.png` - Logo transparente opcional

---

## 📂 ESTRUCTURA DE ARCHIVOS

```
my-app/
├── public/
│   └── images/              # Carpeta de imágenes
│       ├── entrada.jpg
│       ├── haircut.jpg
│       ├── bastard.jpg
│       └── logob.png
├── src/
│   ├── components/
│   │   └── ui/              # Componentes de shadcn/ui
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── radio-group.tsx
│   │       ├── select.tsx
│   │       ├── tabs.tsx
│   │       └── textarea.tsx
│   ├── sections/            # Secciones de la landing page
│   │   ├── Navbar.tsx       # Navegación flotante
│   │   ├── Intro.tsx        # Intro animada opcional
│   │   ├── Hero.tsx         # Banner principal
│   │   ├── Historia.tsx     # Historia de la marca
│   │   ├── Barberos.tsx     # Perfiles de barberos
│   │   ├── Servicios.tsx    # Lista de servicios
│   │   ├── Educacion.tsx    # Artículos/blog
│   │   ├── Agenda.tsx       # Sistema de citas
│   │   ├── VideoSection.tsx # Video de YouTube
│   │   ├── Noticias.tsx     # Sección de prensa
│   │   ├── Manifiesto.tsx   # Frase de impacto
│   │   ├── Contacto.tsx     # Info de contacto
│   │   └── Footer.tsx       # Footer + Admin Panel
│   ├── stores/              # Estados globales (Zustand)
│   │   ├── appointmentStore.ts   # Citas y barberos
│   │   ├── configStore.ts        # Config editable
│   │   ├── cashRegisterStore.ts  # Sistema de caja
│   │   └── themeStore.ts         # Colores del tema
│   ├── types/
│   │   └── index.ts         # Tipos TypeScript
│   ├── lib/
│   │   └── utils.ts         # Utilidades
│   ├── App.tsx              # Componente principal
│   ├── App.css              # Estilos adicionales
│   ├── index.css            # Estilos globales + CSS vars
│   └── main.tsx             # Punto de entrada
├── index.html               # HTML principal
├── tailwind.config.js       # Configuración de Tailwind
├── vite.config.ts           # Configuración de Vite
├── tsconfig.json            # Configuración TypeScript
└── package.json             # Dependencias
```

---

## 🔧 DESCRIPCIÓN DE CADA ARCHIVO

### 📄 Archivos de Configuración

| Archivo | Qué hace | Qué puedes editar |
|---------|----------|-------------------|
| `package.json` | Lista de dependencias | No editar (a menos que sepas qué hacer) |
| `vite.config.ts` | Configuración del build | No editar |
| `tailwind.config.js` | Colores y estilos de Tailwind | Solo si agregas nuevos colores |
| `tsconfig.json` | Configuración TypeScript | No editar |
| `index.html` | HTML base de la página | Title, meta tags |

### 🎨 Archivos de Estilos

| Archivo | Qué hace | Qué puedes editar |
|---------|----------|-------------------|
| `src/index.css` | Estilos globales y variables CSS | Colores base, fuentes, scrollbars |
| `src/App.css` | Estilos adicionales de la app | Animaciones, efectos especiales |

### 🏪 Stores (Estado Global)

| Archivo | Qué guarda | Para qué sirve |
|---------|------------|----------------|
| `appointmentStore.ts` | Citas, barberos, horarios | Sistema de reservas |
| `configStore.ts` | Textos, imágenes, contacto | Editar contenido desde admin |
| `cashRegisterStore.ts` | Ingresos, gastos, productos | Sistema de caja |
| `themeStore.ts` | Colores del tema | Cambiar paleta de colores |

### 🧩 Secciones (Componentes)

| Archivo | Qué muestra | Qué edita el Admin |
|---------|-------------|-------------------|
| `Navbar.tsx` | Menú de navegación | No editable (estructura fija) |
| `Intro.tsx` | Animación de entrada | No editable |
| `Hero.tsx` | Banner principal | Título, subtítulo, imagen, CTAs |
| `Historia.tsx` | Historia de la marca | Título, párrafos, cita, imagen |
| `Barberos.tsx` | Perfiles de barberos | Nombres, fotos, bios, precios |
| `Servicios.tsx` | Lista de servicios | Nombres, precios, descripciones |
| `Educacion.tsx` | Artículos de blog | No editable (ejemplos fijos) |
| `Agenda.tsx` | Sistema de citas | No editable (funcionalidad fija) |
| `VideoSection.tsx` | Video de YouTube | URL del video (en código) |
| `Noticias.tsx` | Noticias y prensa | Agregar/eliminar noticias |
| `Manifiesto.tsx` | Frase de impacto | No editable |
| `Contacto.tsx` | Info de contacto | Teléfono, email, redes |
| `Footer.tsx` | Footer + Admin Panel | TODO desde el panel admin |

---

## 🔐 ACCESO AL PANEL DE ADMINISTRADOR

1. Ve al footer de la página
2. Click en "Admin"
3. Contraseña: `bastard2024`

### Pestañas del Admin:

| Pestaña | Qué puedes hacer |
|---------|------------------|
| **Citas** | Ver estadísticas, cancelar citas, cambiar horario de la barbería |
| **Caja** | Registrar ingresos/gastos, crear productos, ver balance |
| **Contenido** | Editar Hero, Historia, información de contacto |
| **Barberos** | Cambiar nombres, fotos, especialidades, precios |
| **Servicios** | Editar nombres, precios, descripciones de servicios |
| **Tema** | Cambiar colores de toda la página |

---

## 💳 INTEGRACIÓN DE PAYPAL

### Para activar PayPal real:

1. Ve a `src/sections/Agenda.tsx`
2. Busca el componente `PayPalButton` (línea ~30)
3. Reemplaza el mock por la integración real:

```tsx
// INSTALAR PRIMERO:
// npm install @paypal/react-paypal-js

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Reemplazar el componente PayPalButton actual por:
function PayPalButton({ amount, onSuccess }: { amount: number; onSuccess: () => void }) {
  return (
    <PayPalScriptProvider options={{ 
      "client-id": "TU_CLIENT_ID_DE_PAYPAL",
      currency: "MXN"
    }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount.toString(),
                currency_code: "MXN"
              }
            }]
          });
        }}
        onApprove={(data, actions) => {
          return actions.order!.capture().then(() => {
            onSuccess();
          });
        }}
      />
    </PayPalScriptProvider>
  );
}
```

### Obtener Client ID de PayPal:
1. Ve a https://developer.paypal.com/
2. Crea una cuenta de desarrollador
3. Crea una app
4. Copia el Client ID
5. Reemplaza `"TU_CLIENT_ID_DE_PAYPAL"` en el código

---

## 🚀 DESPLIEGUE EN VERCEL

### Paso 1: Preparar archivos
```bash
# Asegúrate de que las imágenes estén en public/images/
# Verifica que el build funcione:
npm run build
```

### Paso 2: Subir a GitHub
```bash
# Inicializar git (si no lo has hecho)
git init
git add .
git commit -m "Version lista para produccion"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/bastard-barber.git
git push -u origin main
```

### Paso 3: Conectar con Vercel
1. Ve a https://vercel.com
2. Login con GitHub
3. Click "Add New Project"
4. Selecciona tu repositorio
5. Framework Preset: Vite
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Click "Deploy"

### Paso 4: Configurar dominio (opcional)
1. En Vercel, ve a Settings > Domains
2. Agrega tu dominio personalizado
3. Sigue las instrucciones de DNS

---

## ⚙️ VARIABLES DE ENTORNO (opcional)

Si necesitas variables de entorno, crea un archivo `.env`:

```env
# PayPal
VITE_PAYPAL_CLIENT_ID=tu_client_id_aqui

# Email (para notificaciones)
VITE_SMTP_HOST=smtp.gmail.com
VITE_SMTP_PORT=587
VITE_SMTP_USER=tu_email@gmail.com
VITE_SMTP_PASS=tu_password

# WhatsApp
VITE_WHATSAPP_NUMBER=5219511234567
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error: "Cannot find module"
```bash
npm install
```

### Error de tipos TypeScript
```bash
npm run build
# Revisa los errores en consola
```

### Imágenes no cargan
- Verifica que estén en `public/images/`
- Usa rutas relativas: `/images/tu-imagen.jpg`
- Formatos soportados: jpg, png, webp

### Cambios no se ven
- Limpia caché del navegador
- Verifica en modo incógnito
- Reconstruye: `npm run build`

---

## 📱 RESPONSIVE

La página es 100% responsive y funciona en:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px)
- ✅ Tablet (768px)
- ✅ Móvil (375px)

---

## 🎯 CARACTERÍSTICAS IMPLEMENTADAS

- ✅ Sistema de citas completo
- ✅ Panel de administración editable
- ✅ Sistema de caja (ingresos/gastos)
- ✅ Cambio de colores dinámico
- ✅ 5 temas predefinidos
- ✅ Sección de noticias
- ✅ Video de YouTube integrado
- ✅ Intro animada opcional
- ✅ Links a redes sociales
- ✅ WhatsApp integrado
- ✅ PayPal (mock listo para activar)
- ✅ 100% responsive
- ✅ Animaciones GSAP
- ✅ Glassmorphism

---

## 📞 SOPORTE

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica que el build sea exitoso
3. Revisa que las imágenes estén en la carpeta correcta
4. Limpia caché y cookies

---

**¡Listo para desplegar! 🚀**
**Creado con ❤️ para Bastard Old School Master Barber**
