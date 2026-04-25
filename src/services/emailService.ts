// Servicio de Email para Bastard Old School
// Configurado para funcionar con Zoho Mail SMTP

interface EmailConfig {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  fromName: string;
  fromEmail: string;
}

// Configuración por defecto (se sobreescribe con variables de entorno)
const defaultConfig: EmailConfig = {
  smtpHost: import.meta.env.VITE_SMTP_HOST || 'smtp.zoho.com',
  smtpPort: parseInt(import.meta.env.VITE_SMTP_PORT || '587'),
  smtpUser: import.meta.env.VITE_SMTP_USER || 'citas@bastardoldschool.com.mx',
  smtpPass: import.meta.env.VITE_SMTP_PASS || '',
  fromName: 'Bastard Old School Barber',
  fromEmail: import.meta.env.VITE_SMTP_USER || 'citas@bastardoldschool.com.mx',
};

// Interfaz para datos de cita
interface AppointmentEmailData {
  customerName: string;
  customerEmail: string;
  barberName: string;
  serviceName: string;
  date: string;
  time: string;
  price: number;
  appointmentId?: string;
}

// ============================================
// PLANTILLAS DE EMAIL
// ============================================

const getBaseTemplate = (content: string, title: string) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
    
    body {
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      background-color: #FAF8F3;
      color: #2D2D2D;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    
    .header {
      background: linear-gradient(135deg, #4A6B5A 0%, #3A5B4A 100%);
      padding: 40px 30px;
      text-align: center;
    }
    
    .header img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 3px solid #E07A5F;
      margin-bottom: 15px;
    }
    
    .header h1 {
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      margin: 0;
      letter-spacing: 2px;
    }
    
    .header p {
      color: rgba(255,255,255,0.8);
      font-size: 12px;
      margin: 5px 0 0;
      text-transform: uppercase;
      letter-spacing: 3px;
    }
    
    .content {
      padding: 40px 30px;
    }
    
    .greeting {
      font-size: 20px;
      font-weight: 600;
      color: #4A6B5A;
      margin-bottom: 20px;
    }
    
    .message {
      font-size: 16px;
      line-height: 1.6;
      color: #2D2D2D;
      margin-bottom: 25px;
    }
    
    .details-box {
      background-color: #F5F1E7;
      border-radius: 12px;
      padding: 25px;
      margin: 25px 0;
      border-left: 4px solid #E07A5F;
    }
    
    .details-box h3 {
      color: #4A6B5A;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0 0 15px;
    }
    
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid rgba(74, 107, 90, 0.2);
    }
    
    .detail-row:last-child {
      border-bottom: none;
    }
    
    .detail-label {
      font-weight: 500;
      color: #2D2D2D;
    }
    
    .detail-value {
      font-weight: 600;
      color: #4A6B5A;
    }
    
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #E07A5F 0%, #C45A3F 100%);
      color: #ffffff;
      text-decoration: none;
      padding: 15px 40px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 16px;
      margin: 25px 0;
      text-align: center;
    }
    
    .footer {
      background-color: #2D2D2D;
      padding: 30px;
      text-align: center;
    }
    
    .footer p {
      color: rgba(255,255,255,0.6);
      font-size: 13px;
      margin: 5px 0;
    }
    
    .footer a {
      color: #E07A5F;
      text-decoration: none;
    }
    
    .social-links {
      margin: 20px 0;
    }
    
    .social-links a {
      display: inline-block;
      margin: 0 10px;
      color: #ffffff;
      font-size: 14px;
    }
    
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(74, 107, 90, 0.3), transparent);
      margin: 30px 0;
    }
    
    .reminder-box {
      background-color: #E8F5E9;
      border-radius: 8px;
      padding: 15px 20px;
      margin: 20px 0;
      border-left: 4px solid #22C55E;
    }
    
    .reminder-box p {
      margin: 0;
      color: #166534;
      font-size: 14px;
    }
    
    .cancellation-box {
      background-color: #FEF2F2;
      border-radius: 8px;
      padding: 15px 20px;
      margin: 20px 0;
      border-left: 4px solid #EF4444;
    }
    
    .cancellation-box p {
      margin: 0;
      color: #991B1B;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>BASTARD</h1>
      <p>Old School Master Barber</p>
    </div>
    
    <div class="content">
      ${content}
    </div>
    
    <div class="footer">
      <div class="social-links">
        <a href="https://instagram.com/bastardoldschool">Instagram</a>
        <a href="https://wa.me/5219511234567">WhatsApp</a>
      </div>
      <p>© 2024 Bastard Old School Master Barber</p>
      <p>Oaxaca, México</p>
      <p style="margin-top: 15px; font-size: 11px;">
        Este es un correo automático, por favor no respondas a esta dirección.
      </p>
    </div>
  </div>
</body>
</html>
`;

// ============================================
// PLANTILLA: CONFIRMACIÓN DE CITA
// ============================================
export const getConfirmationEmail = (data: AppointmentEmailData): string => {
  const content = `
    <p class="greeting">¡Hola ${data.customerName}! 👋</p>
    
    <p class="message">
      Tu cita ha sido confirmada exitosamente. Estamos emocionados de tenerte en Bastard Old School.
    </p>
    
    <div class="details-box">
      <h3>📅 Detalles de tu Cita</h3>
      
      <div class="detail-row">
        <span class="detail-label">Servicio:</span>
        <span class="detail-value">${data.serviceName}</span>
      </div>
      
      <div class="detail-row">
        <span class="detail-label">Barbero:</span>
        <span class="detail-value">${data.barberName}</span>
      </div>
      
      <div class="detail-row">
        <span class="detail-label">Fecha:</span>
        <span class="detail-value">${data.date}</span>
      </div>
      
      <div class="detail-row">
        <span class="detail-label">Hora:</span>
        <span class="detail-value">${data.time}</span>
      </div>
      
      <div class="detail-row">
        <span class="detail-label">Total:</span>
        <span class="detail-value">$${data.price} MXN</span>
      </div>
    </div>
    
    <div class="reminder-box">
      <p>💡 <strong>Recuerda:</strong> Te enviaremos un recordatorio 24 horas antes de tu cita.</p>
    </div>
    
    <p class="message">
      Si necesitas cancelar o reprogramar, hazlo con al menos 24 horas de anticipación.
    </p>
    
    <div style="text-align: center;">
      <a href="https://wa.me/5219511234567?text=Hola,%20quiero%20modificar%20mi%20cita" class="cta-button">
        Modificar Cita por WhatsApp
      </a>
    </div>
    
    <div class="divider"></div>
    
    <p class="message" style="font-size: 14px; color: #666;">
      <strong>¿Qué necesitas traer?</strong><br>
      Solo tu mejor actitud. Nosotros nos encargamos del resto. 💈
    </p>
  `;
  
  return getBaseTemplate(content, 'Cita Confirmada - Bastard Old School');
};

// ============================================
// PLANTILLA: RECORDATORIO 24H
// ============================================
export const getReminderEmail = (data: AppointmentEmailData): string => {
  const content = `
    <p class="greeting">¡Hola ${data.customerName}! ⏰</p>
    
    <p class="message">
      Te recordamos que mañana tienes tu cita en Bastard Old School. ¡Te esperamos!
    </p>
    
    <div class="details-box">
      <h3>📅 Detalles de tu Cita</h3>
      
      <div class="detail-row">
        <span class="detail-label">Servicio:</span>
        <span class="detail-value">${data.serviceName}</span>
      </div>
      
      <div class="detail-row">
        <span class="detail-label">Barbero:</span>
        <span class="detail-value">${data.barberName}</span>
      </div>
      
      <div class="detail-row">
        <span class="detail-label">Fecha:</span>
        <span class="detail-value">${data.date}</span>
      </div>
      
      <div class="detail-row">
        <span class="detail-label">Hora:</span>
        <span class="detail-value">${data.time}</span>
      </div>
    </div>
    
    <div class="reminder-box">
      <p>📍 <strong>Ubicación:</strong> Oaxaca de Juárez, Oaxaca, México</p>
      <p style="margin-top: 8px;">⏱️ <strong>Llega 10 minutos antes</strong> de tu hora programada</p>
    </div>
    
    <div style="text-align: center;">
      <a href="https://maps.google.com/?q=Bastard+Old+School+Oaxaca" class="cta-button">
        Ver Ubicación en Maps
      </a>
    </div>
    
    <div class="divider"></div>
    
    <p class="message" style="font-size: 14px; text-align: center;">
      ¿No puedes asistir? Cancela con tiempo para que otro cliente pueda tomar tu lugar.
    </p>
  `;
  
  return getBaseTemplate(content, 'Recordatorio: Tu Cita es Mañana - Bastard Old School');
};

// ============================================
// PLANTILLA: CANCELACIÓN
// ============================================
export const getCancellationEmail = (data: AppointmentEmailData, reason?: string): string => {
  const content = `
    <p class="greeting">Hola ${data.customerName}</p>
    
    <p class="message">
      Tu cita ha sido cancelada según tu solicitud.
    </p>
    
    <div class="cancellation-box">
      <p>❌ <strong>Cita Cancelada</strong></p>
      <p style="margin-top: 8px;">
        ${data.serviceName} con ${data.barberName}<br>
        ${data.date} a las ${data.time}
      </p>
      ${reason ? `<p style="margin-top: 8px;"><strong>Motivo:</strong> ${reason}</p>` : ''}
    </div>
    
    <p class="message">
      Lamentamos que no puedas asistir. Esperamos verte pronto en Bastard Old School.
    </p>
    
    <div style="text-align: center;">
      <a href="https://bastardoldschool.com/#agenda" class="cta-button">
        Agendar Nueva Cita
      </a>
    </div>
    
    <div class="divider"></div>
    
    <p class="message" style="font-size: 14px; text-align: center; color: #666;">
      Si tienes alguna pregunta, contáctanos por WhatsApp.<br>
      Estamos aquí para ayudarte.
    </p>
  `;
  
  return getBaseTemplate(content, 'Cita Cancelada - Bastard Old School');
};

// ============================================
// PLANTILLA: AGRADECIMIENTO POST-SERVICIO
// ============================================
export const getThankYouEmail = (data: AppointmentEmailData): string => {
  const content = `
    <p class="greeting">¡Gracias ${data.customerName}! 🙏</p>
    
    <p class="message">
      Fue un honor tenerte en nuestra silla. Esperamos que hayas disfrutado la experiencia Bastard Old School.
    </p>
    
    <div class="details-box">
      <h3>✨ Servicio Realizado</h3>
      
      <div class="detail-row">
        <span class="detail-label">Servicio:</span>
        <span class="detail-value">${data.serviceName}</span>
      </div>
      
      <div class="detail-row">
        <span class="detail-label">Barbero:</span>
        <span class="detail-value">${data.barberName}</span>
      </div>
      
      <div class="detail-row">
        <span class="detail-label">Fecha:</span>
        <span class="detail-value">${data.date}</span>
      </div>
    </div>
    
    <p class="message">
      <strong>¿Te gustó el servicio?</strong><br>
      Comparte tu experiencia en Instagram y etiquétanos <strong>@bastardoldschool</strong>
    </p>
    
    <div style="text-align: center;">
      <a href="https://instagram.com/bastardoldschool" class="cta-button">
        Seguir en Instagram
      </a>
    </div>
    
    <div class="divider"></div>
    
    <p class="message" style="font-size: 14px; text-align: center;">
      <strong>¿Cuándo regresas?</strong><br>
      Mantén tu estilo impecable. Agenda tu próxima cita.
    </p>
    
    <div style="text-align: center; margin-top: 20px;">
      <a href="https://bastardoldschool.com/#agenda" style="color: #4A6B5A; font-weight: 600;">
        Agendar Próxima Cita →
      </a>
    </div>
  `;
  
  return getBaseTemplate(content, 'Gracias por tu Visita - Bastard Old School');
};

// ============================================
// FUNCIÓN: ENVIAR EMAIL (preparada para backend)
// ============================================
export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // NOTA: Para enviar emails reales, necesitas un backend
    // Esta función está preparada para conectarse a:
    // 1. Un serverless function en Vercel
    // 2. Firebase Cloud Functions
    // 3. Un servidor Node.js
    
    // Ejemplo con Vercel Serverless Function:
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to,
        subject,
        html: htmlContent,
        config: defaultConfig,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Error al enviar email');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    };
  }
};

// ============================================
// FUNCIONES ESPECÍFICAS
// ============================================

export const sendConfirmationEmail = async (data: AppointmentEmailData) => {
  const html = getConfirmationEmail(data);
  return sendEmail(data.customerEmail, '✅ Cita Confirmada - Bastard Old School', html);
};

export const sendReminderEmail = async (data: AppointmentEmailData) => {
  const html = getReminderEmail(data);
  return sendEmail(data.customerEmail, '⏰ Recordatorio: Tu Cita es Mañana', html);
};

export const sendCancellationEmail = async (data: AppointmentEmailData, reason?: string) => {
  const html = getCancellationEmail(data, reason);
  return sendEmail(data.customerEmail, '❌ Cita Cancelada - Bastard Old School', html);
};

export const sendThankYouEmail = async (data: AppointmentEmailData) => {
  const html = getThankYouEmail(data);
  return sendEmail(data.customerEmail, '🙏 Gracias por tu Visita - Bastard Old School', html);
};

export default {
  sendConfirmationEmail,
  sendReminderEmail,
  sendCancellationEmail,
  sendThankYouEmail,
  getConfirmationEmail,
  getReminderEmail,
  getCancellationEmail,
  getThankYouEmail,
};
