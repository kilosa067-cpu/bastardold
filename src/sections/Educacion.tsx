import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Users, Star, Award, Eye, Hand, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const modalidades = [
  {
    id: '1',
    title: 'SEMINARIO VISUAL EDUCATIVO LOOK AND LEARN',
    description: '1 DÍA CON JAHZEEL MASTER BARBER BASTARD OLD SCHOOL. 2 CORTES VISUALES: donde podrás mirar de manera teórica y práctica técnicas de corte clásico con Jahzeel. Diploma oficial.',
    price: 6000,
    priceLabel: '$6,000 MXN',
    duration: '1 día',
    icon: Eye,
    badge: 'Visual',
    badgeColor: 'bg-[#2D5A27]/20 text-[#2D5A27]',
    features: ['2 cortes visuales con Jahzeel', 'Teoría y práctica', 'Diploma oficial Bastard', 'Técnicas clásicas'],
  },
  {
    id: '2',
    title: 'TALLER TEÓRICO PRÁCTICO WORK SHOP',
    description: '3 DÍAS CON JAHZEEL MASTER BARBER BASTARD OLD SCHOOL. Día 1: look and learn - 1 corte por Jahzeel. Día 2: work shop guiado - 2 cortes guiados por Jahzeel paso a paso. Día 3: evaluación - 1 corte en tiempo real en la casa Bastard. Incluye modelo.',
    price: 13000,
    priceLabel: '$13,000 MXN',
    duration: '3 días',
    icon: Hand,
    badge: 'Workshop',
    badgeColor: 'bg-[#CE1126]/20 text-[#CE1126]',
    features: ['3 días intensivos', 'Modelos reales incluidos', 'Certificado oficial Bastard', 'Evaluación final'],
  },
  {
    id: '3',
    title: '1 SEMANA FULL TÉCNICAS',
    description: '6 DÍAS CON JAHZEEL MASTER BARBER BASTARD OLD SCHOOL. Práctica full time durante 6 días con Jahzeel. Incluye modelos. Constancia oficial de horas. Diploma oficial de curso completo. Certificado oficial del dominio de técnicas y método.',
    price: 19000,
    priceLabel: '$19,000 MXN',
    duration: '6 días',
    icon: Calendar,
    badge: 'Intensivo',
    badgeColor: 'bg-[#2D5A27]/20 text-[#2D5A27]',
    features: ['6 días full time', 'Modelos reales diarios', 'Constancia + Diploma + Certificado', 'Método Bastard completo'],
  },
  {
    id: '4',
    title: 'Observación Gratuita',
    description: 'Ven y observa como trabajamos. Sin costo, sin compromiso. Solo ven, siéntate y aprende viendo a los maestros en acción.',
    price: 0,
    priceLabel: 'Gratis',
    duration: '1 día',
    icon: Eye,
    badge: 'Gratuito',
    badgeColor: 'bg-green-500/20 text-green-400',
    features: ['Acceso al área de trabajo', 'Observa técnicas en vivo', 'Preguntas al final', 'Sin costo alguno'],
  },
];

export default function Educacion() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.educacion-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.fromTo('.modalidad-card', { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.modalidades-grid', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="educacion" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      <div className="section-padding relative z-10">
        <div className="educacion-header text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-[#CE1126] text-sm uppercase tracking-[0.3em] font-medium mb-4">
            Formación
          </span>
          <h2 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl text-[#2D5A27] mb-6">
            Educación
          </h2>
          <p className="text-[#333]/60 text-lg">
            Aprende de los maestros. Desde la observación gratuita hasta cursos profesionales intensivos.
          </p>
        </div>

        {/* Modalidades de Formación */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8 max-w-6xl mx-auto">
            <Award className="w-6 h-6 text-[#2D5A27]" />
            <h3 className="font-outfit font-bold text-2xl text-[#2D5A27]">Modalidades de Formación</h3>
          </div>

          <div className="modalidades-grid grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {modalidades.map((mod) => (
              <div
                key={mod.id}
                className="modalidad-card group relative bg-white rounded-2xl p-6 border border-[#2D5A27]/10 hover:border-[#2D5A27]/40 transition-all duration-500 hover:-translate-y-1 shadow-sm"
              >
                <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${mod.badgeColor}`}>
                  {mod.badge}
                </span>

                <div className="w-14 h-14 rounded-xl bg-[#2D5A27]/10 flex items-center justify-center mb-4 group-hover:bg-[#2D5A27] group-hover:scale-110 transition-all duration-500">
                  <mod.icon className="w-7 h-7 text-[#2D5A27] group-hover:text-white transition-colors" />
                </div>

                <h4 className="font-outfit font-bold text-xl text-[#2D5A27] mb-2">{mod.title}</h4>
                <p className="text-[#333]/60 text-sm mb-4">{mod.description}</p>

                <ul className="space-y-2 mb-6">
                  {mod.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#333]/70 text-sm">
                      <Star className="w-3 h-3 text-[#2D5A27] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-[#2D5A27]/10">
                  <span className={`font-outfit font-bold text-2xl ${mod.price === 0 ? 'text-green-400' : 'text-[#CE1126]'}`}>
                    {mod.priceLabel}
                  </span>
                  <div className="flex items-center gap-1 text-[#333]/50 text-sm">
                    <Clock className="w-4 h-4" />
                    {mod.duration}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4 border-[#2D5A27] text-[#2D5A27] hover:bg-[#2D5A27] hover:text-white rounded-full transition-all duration-300"
                  onClick={() => document.querySelector('#agenda')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Users className="w-4 h-4 mr-2" />
                  {mod.price === 0 ? 'Reservar Lugar' : 'Inscribirme'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
