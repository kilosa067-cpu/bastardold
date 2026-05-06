import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useConfigStore } from '@/stores/configStore';

gsap.registerPlugin(ScrollTrigger);

export default function Contacto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const config = useConfigStore();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contacto-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.fromTo('.contacto-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.contacto-grid', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contacto" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      <div className="section-padding relative z-10">
        <div className="contacto-header text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-[#2D5A27] text-sm uppercase tracking-[0.3em] font-medium mb-4">
            Estamos Aquí
          </span>
          <h2 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl text-[#2D5A27] mb-6">
            Contacto
          </h2>
          <p className="text-[#333]/60 text-lg">
            Visítanos en Oaxaca o contáctanos para cualquier consulta.
          </p>
        </div>

        <div className="contacto-grid grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Info Cards */}
          <div className="space-y-6">
            <div className="contacto-card bg-[#FAFAFA] rounded-2xl p-6 border border-[#2D5A27]/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2D5A27]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#2D5A27]" />
                </div>
                <div>
                  <h3 className="font-outfit font-bold text-lg text-[#2D5A27] mb-1">Dirección</h3>
                  <p className="text-[#333]/60">{config.contact.address}</p>
                  <a href={config.contact.locationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#CE1126] text-sm mt-2 hover:underline">
                    Ver en Google Maps <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="contacto-card bg-[#FAFAFA] rounded-2xl p-6 border border-[#2D5A27]/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2D5A27]/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[#2D5A27]" />
                </div>
                <div>
                  <h3 className="font-outfit font-bold text-lg text-[#2D5A27] mb-1">Horario</h3>
                  <div className="space-y-1 text-[#333]/60 text-sm">
                    <div className="flex justify-between"><span>Lunes - Sábado</span><span>9:00 - 20:00</span></div>
                    <div className="flex justify-between"><span>Domingo</span><span>Cerrado</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contacto-card bg-[#FAFAFA] rounded-2xl p-6 border border-[#2D5A27]/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2D5A27]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#2D5A27]" />
                </div>
                <div>
                  <h3 className="font-outfit font-bold text-lg text-[#2D5A27] mb-1">Teléfono</h3>
                  <p className="text-[#333]/60">{config.contact.phone}</p>
                </div>
              </div>
            </div>

            <div className="contacto-card bg-[#FAFAFA] rounded-2xl p-6 border border-[#2D5A27]/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2D5A27]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[#2D5A27]" />
                </div>
                <div>
                  <h3 className="font-outfit font-bold text-lg text-[#2D5A27] mb-1">Correo</h3>
                  <p className="text-[#333]/60">{config.contact.email}</p>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="contacto-card flex flex-wrap gap-3">
              <a href={config.contact.instagram} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-[#2D5A27] text-[#2D5A27] hover:bg-[#2D5A27] hover:text-white rounded-full">
                  <Instagram className="w-4 h-4 mr-2" /> Instagram
                </Button>
              </a>
              <a href={config.contact.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-full">
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                </Button>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contacto-card bg-[#FAFAFA] rounded-3xl p-8 border border-[#2D5A27]/10">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#2D5A27] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-outfit font-bold text-2xl text-[#2D5A27] mb-2">¡Mensaje enviado!</h3>
                <p className="text-[#333]/60">Te responderemos lo antes posible.</p>
                <Button onClick={() => setSent(false)} className="mt-6 bg-[#2D5A27] hover:bg-[#1B3A16] text-white rounded-full">
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <>
                <h3 className="font-outfit font-bold text-2xl text-[#2D5A27] mb-6">Envíanos un mensaje</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[#333]/70 text-sm mb-1 block">Nombre</label>
                    <Input placeholder="Tu nombre" className="border-[#2D5A27]/20 text-[#333] rounded-xl" />
                  </div>
                  <div>
                    <label className="text-[#333]/70 text-sm mb-1 block">Correo</label>
                    <Input type="email" placeholder="tu@email.com" className="border-[#2D5A27]/20 text-[#333] rounded-xl" />
                  </div>
                  <div>
                    <label className="text-[#333]/70 text-sm mb-1 block">Mensaje</label>
                    <Textarea placeholder="¿En qué podemos ayudarte?" className="border-[#2D5A27]/20 text-[#333] rounded-xl min-h-[120px]" />
                  </div>
                  <Button 
                    onClick={() => setSent(true)}
                    className="w-full bg-[#2D5A27] hover:bg-[#1B3A16] text-white rounded-full py-5 font-semibold"
                  >
                    Enviar mensaje
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
