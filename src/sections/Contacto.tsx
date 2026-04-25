import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: MapPin,
    title: 'Ubicacion',
    content: 'Oaxaca de Juarez, Oaxaca, Mexico',
    action: 'Ver en mapa',
    href: 'https://share.google/dV49v5RQN3UvxQhN6',
  },
  {
    icon: Phone,
    title: 'Telefono',
    content: '+52 951 123 4567',
    action: 'Llamar',
    href: 'tel:+529511234567',
  },
  {
    icon: Mail,
    title: 'Correo',
    content: 'hola@bastardoldschool.com',
    action: 'Enviar correo',
    href: 'mailto:hola@bastardoldschool.com',
  },
  {
    icon: Clock,
    title: 'Horario',
    content: 'Lun - Sab: 9:00 - 20:00',
    action: 'Agendar cita',
    href: '#agenda',
  },
];

export default function Contacto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contacto-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(
        '.contacto-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.contacto-grid', start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contacto" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-black overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-moss/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="section-padding relative z-10">
        <div className="contacto-header text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-clay text-sm uppercase tracking-[0.3em] font-medium mb-4">Contacto</span>
          <h2 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">Visitanos</h2>
          <p className="text-white/60 text-lg">Estamos en Oaxaca, listos para ofrecerte la experiencia de barberia que mereces.</p>
        </div>
        <div className="contacto-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {contactInfo.map((item) => (
            <a key={item.title} href={item.href} className="contacto-card group bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-moss/30 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-moss/20 flex items-center justify-center mb-4 group-hover:bg-moss group-hover:scale-110 transition-all duration-500">
                <item.icon className="w-6 h-6 text-moss group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-outfit font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-white/60 text-sm mb-4">{item.content}</p>
              <span className="text-moss text-sm font-medium group-hover:text-clay transition-colors">{item.action} {'>'}</span>
            </a>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4">
          <a href="https://www.instagram.com/bastardoldschool/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/5 hover:bg-moss text-white px-6 py-3 rounded-full border border-white/10 transition-all duration-300">
            <Instagram className="w-5 h-5" />
            <span className="font-medium">Instagram</span>
          </a>
          <a href="https://wa.me/5219511234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/5 hover:bg-green-500 text-white px-6 py-3 rounded-full border border-white/10 transition-all duration-300">
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
