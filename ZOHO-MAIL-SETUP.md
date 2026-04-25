# 📧 Guía de Configuración: Zoho Mail para Bastard Old School

Esta guía te ayudará a configurar Zoho Mail para enviar correos desde `citas@bastardoldschool.com.mx`

---

## 🎯 ¿Qué necesitas?

1. **Dominio comprado** (ej: bastardoldschool.com.mx)
2. **Cuenta de Zoho Mail** (gratuita)
3. **Acceso al panel DNS** de tu proveedor de dominio

---

## 📋 Paso 1: Crear Cuenta Zoho Mail

1. Ve a [zoho.com/mail](https://www.zoho.com/mail/)
2. Click en **"Sign Up Now"** (o "Registrarse")
3. Selecciona **"Sign up with a domain you already own"**
4. Ingresa tu dominio: `bastardoldschool.com.mx`
5. Completa el registro con tus datos

---

## 🔧 Paso 2: Verificar Dominio

Zoho te dará registros DNS para agregar. Ve al panel de tu proveedor de dominio (Namecheap, GoDaddy, etc.):

### Registros TXT (Verificación):
```
Tipo: TXT
Nombre: @
Valor: (copia el valor que te da Zoho)
TTL: 3600
```

### Registros MX (Para recibir emails):
```
Tipo: MX
Prioridad: 10
Valor: mx.zoho.com

Tipo: MX
Prioridad: 20
Valor: mx2.zoho.com

Tipo: MX
Prioridad: 50
Valor: mx3.zoho.com
```

### Registro SPF (Seguridad):
```
Tipo: TXT
Nombre: @
Valor: v=spf1 include:zoho.com ~all
```

### Registro DKIM (Opcional pero recomendado):
Zoho te dará este valor después de la verificación.

---

## 👤 Paso 3: Crear Cuenta de Correo

1. En Zoho Mail, ve a **Control Panel** > **User Details**
2. Click en **"Add User"**
3. Crea la cuenta:
   - **Email:** `citas@bastardoldschool.com.mx`
   - **First Name:** Citas
   - **Last Name:** Bastard
   - **Password:** (genera una segura)

---

## 🔑 Paso 4: Obtener Contraseña de Aplicación SMTP

1. Inicia sesión en Zoho Mail con `citas@bastardoldschool.com.mx`
2. Ve a **Configuración** (engranaje arriba a la derecha)
3. Ve a **Cuentas** > **SMTP** (o busca "IMAP")
4. Activa **"Acceso IMAP"**
5. Ve a **Seguridad** > **Contraseñas de Aplicación**
6. Click en **"Generar Nueva Contraseña"**
7. Nombra: "Bastard Website"
8. **Copia la contraseña generada** (¡solo se muestra una vez!)

---

## 📝 Paso 5: Configurar Variables de Entorno

Copia este archivo a `.env` y rellena:

```env
# Zoho Mail SMTP
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_USER=citas@bastardoldschool.com.mx
SMTP_PASS=la_contraseña_de_aplicación_que_copiaste
```

---

## ✅ Paso 6: Probar Configuración

Una vez desplegado en Vercel, puedes probar el envío de emails desde:
- El panel de admin > Agenda > (cuando confirmes una cita)
- O directamente llamando al endpoint `/api/send-email`

---

## 🧪 Probar Localmente (Opcional)

```bash
# Instala nodemailer si no está instalado
npm install nodemailer

# Crea un archivo de prueba test-email.js
```

```javascript
// test-email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false,
  auth: {
    user: 'citas@bastardoldschool.com.mx',
    pass: 'tu_contraseña_de_aplicación'
  }
});

async function testEmail() {
  try {
    const info = await transporter.sendMail({
      from: '"Bastard Old School" <citas@bastardoldschool.com.mx>',
      to: 'tu_email_personal@gmail.com',
      subject: '✅ Prueba de Configuración Zoho',
      html: '<h1>¡Funciona!</h1><p>Tu configuración de Zoho Mail está correcta.</p>'
    });
    console.log('Email enviado:', info.messageId);
  } catch (error) {
    console.error('Error:', error);
  }
}

testEmail();
```

```bash
node test-email.js
```

---

## 📊 Límites de Zoho Mail (Plan Gratuito)

| Característica | Límite |
|----------------|--------|
| Usuarios | 5 cuentas |
| Almacenamiento | 5 GB por usuario |
| Emails salientes | 200 emails/día |
| Adjuntos | Hasta 20 MB |

Para una barbería, el plan gratuito es más que suficiente.

---

## 🆘 Solución de Problemas

### "Authentication failed"
- Verifica que usaste la **contraseña de aplicación**, no tu contraseña normal
- Asegúrate de haber activado IMAP en Zoho

### "Domain not verified"
- Los registros DNS tardan 24-48 horas en propagarse
- Verifica que copiaste correctamente los valores de Zoho

### "Connection refused"
- Verifica que el puerto es 587 (no 465)
- Prueba con `secure: false` en la configuración

---

## 📞 Soporte

- **Zoho Help:** [help.zoho.com](https://help.zoho.com)
- **Documentación SMTP:** [zoho.com/mail/help/zoho-smtp.html](https://www.zoho.com/mail/help/zoho-smtp.html)

---

## ✅ Checklist

- [ ] Dominio comprado
- [ ] Cuenta Zoho creada
- [ ] Dominio verificado en Zoho
- [ ] Registros DNS agregados
- [ ] Cuenta `citas@bastardoldschool.com.mx` creada
- [ ] IMAP activado
- [ ] Contraseña de aplicación generada
- [ ] Variables de entorno configuradas en Vercel
- [ ] Prueba de email exitosa

---

**¡Listo para enviar emails profesionales!** 📧✨
