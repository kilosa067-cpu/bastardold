import { Instagram, MessageCircle, MapPin, Mail, Phone } from 'lucide-react';
import { useConfigStore } from '@/stores/configStore';

export default function Footer() {
  const config = useConfigStore();

  return (
    <footer className="relative w-full bg-[#2D5A27] text-white overflow-hidden">
      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="section-padding py-16 md:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                <img src="/images/logoinicio.png" alt="Bastard" className="w-full h-full object-cover" />
              </div>
              <span className="font-outfit font-bold text-lg">Bastard Old School</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Barbería tradicional desde 2014. Autenticidad, precisión y tradición en cada corte.
            </p>
            <p className="text-white/40 text-xs">
              "La silla no hace al barbero, el espejo y las sonrisas nunca mienten."
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-outfit font-semibold text-sm uppercase tracking-wider mb-6 text-white/80">Navegación</h4>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', href: '#hero' },
                { label: 'Historia', href: '#historia' },
                { label: 'Barberos', href: '#barberos' },
                { label: 'Servicios', href: '#servicios' },
                { label: 'Agenda', href: '#agenda' },
                { label: 'Contacto', href: '#contacto' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="text-white/50 hover:text-[#CE1126] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-outfit font-semibold text-sm uppercase tracking-wider mb-6 text-white/80">Servicios</h4>
            <ul className="space-y-3">
              {config.services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <span className="text-white/50 text-sm">{service.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-outfit font-semibold text-sm uppercase tracking-wider mb-6 text-white/80">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-[#CE1126]" />
                {config.contact.address}
              </li>
              <li>
                <a href={`tel:${config.contact.phone}`} className="flex items-center gap-2 text-white/50 hover:text-[#CE1126] transition-colors text-sm">
                  <Phone className="w-4 h-4 text-[#CE1126]" />
                  {config.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${config.contact.email}`} className="flex items-center gap-2 text-white/50 hover:text-[#CE1126] transition-colors text-sm">
                  <Mail className="w-4 h-4 text-[#CE1126]" />
                  {config.contact.email}
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              <a href={config.contact.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#CE1126] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={config.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href={config.contact.locationUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#CE1126] transition-colors">
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Bastard Old School. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="text-white/40 hover:text-[#CE1126] transition-colors">Política de privacidad</a>
            <a href="#" className="text-white/40 hover:text-[#CE1126] transition-colors">Términos de servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
