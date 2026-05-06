import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Clock, ChevronRight, Award, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const cursos = [
  {
    id: '1',
    title: 'SEMINARIO VISUAL EDUCATIVO LOOK AND LEARN',
    subtitle: 'Diploma Oficial',
    description: '1 día con Jahzeel Master Barber Bastard Old School. 2 cortes visuales: aprendizaje teórico y práctico de técnicas clásicas. Diploma oficial.',
    price: 6000,
    duration: '1 día',
    includes: ['2 cortes visuales', 'Aprendizaje teórico y práctico', 'Modelo práctico: cortes paso a paso (modelos o maniquí)', 'Técnicas clásicas', 'Diploma oficial'],
    icon: BookOpen,
  },
  {
    id: '2',
    title: 'TALLER TEÓRICO PRÁCTICO WORKSHOP',
    subtitle: 'Certificado Oficial',
    description: '3 días con Jahzeel Master Barber Bastard Old School. Día 1: Look and Learn — 1 corte realizado por Jahzeel. Día 2: Workshop guiado — 2 cortes paso a paso (modelos o maniquí). Día 3: Evaluación — 1 corte en tiempo real. Incluye modelo. Certificado oficial.',
    price: 13000,
    duration: '3 días',
    includes: ['Día 1: Look and Learn con Jahzeel', 'Día 2: 2 cortes guiados', 'Día 3: Evaluación en tiempo real', 'Incluye modelo', 'Certificado oficial'],
    icon: GraduationCap,
  },
  {
    id: '3',
    title: '1 SEMANA FULL TÉCNICAS',
    subtitle: 'Constancia + Certificado Oficial',
    description: '6 días con Jahzeel Master Barber Bastard Old School. Práctica full time durante 6 días. Incluye modelos. Constancia oficial de horas. Diploma oficial de curso completo. Certificado oficial de dominio de técnicas y método.',
    price: 19000,
    duration: '6 días',
    includes: ['Práctica full time 6 días', 'Incluye modelos', 'Constancia oficial de horas', 'Diploma oficial de curso completo', 'Certificado oficial de dominio'],
    icon: Award,
  },
];

export default function Educacion() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.educacion-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.fromTo('.curso-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.cursos-grid', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="educacion" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      <div className="section-padding relative z-10">
        {/* Header */}
        <div className="educacion-header text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-[#2D5A27] text-sm uppercase tracking-[0.3em] font-medium mb-4">
            Formación Profesional
          </span>
          <h2 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl text-[#2D5A27] mb-6">
            Educación
          </h2>
          <p className="text-[#333]/60 text-lg">
            Formamos a la siguiente generación de barberos con las técnicas clásicas
            y modernas que han hecho de Bastard una referencia mundial.
          </p>
        </div>

        {/* Cursos Grid */}
        <div className="cursos-grid grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cursos.map((curso) => {
            const Icon = curso.icon;
            const isExpanded = expandedId === curso.id;
            return (
              <div
                key={curso.id}
                className="curso-card bg-[#FAFAFA] rounded-3xl overflow-hidden border border-[#2D5A27]/10 hover:border-[#2D5A27]/30 transition-all duration-500 flex flex-col"
              >
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#2D5A27]/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#2D5A27]" />
                    </div>
                    <div>
                      <span className="text-[#CE1126] text-xs font-semibold uppercase tracking-wider">{curso.subtitle}</span>
                    </div>
                  </div>

                  <h3 className="font-outfit font-bold text-xl text-[#2D5A27] mb-3 leading-tight">
                    {curso.title}
                  </h3>

                  <p className="text-[#333]/60 mb-4 leading-relaxed">
                    {curso.description}
                  </p>

                  {/* Includes list */}
                  <div className="mb-6">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : curso.id)}
                      className="text-[#2D5A27] text-sm font-semibold flex items-center gap-1 hover:text-[#CE1126] transition-colors mb-2"
                    >
                      {isExpanded ? 'Ver menos' : 'Ver más'}
                      <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                    <div className={`space-y-1.5 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      {curso.includes.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-[#333]/60">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#CE1126]" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-[#333]/50 mb-1">
                        <Clock className="w-4 h-4 text-[#2D5A27]" />
                        {curso.duration}
                      </div>
                      <span className="text-[#CE1126] font-bold text-2xl">${curso.price.toLocaleString()} MXN</span>
                    </div>
                    <Button className="bg-[#2D5A27] hover:bg-[#1B3A16] text-white rounded-full px-5">
                      Inscribirme
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-[#2D5A27] rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
          <h3 className="font-outfit font-bold text-2xl md:text-3xl text-white mb-4">
            ¿Quieres ser parte de la próxima generación?
          </h3>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Aprende directamente de Jahzeel Bastard las técnicas que lo han llevado
            a ser reconocido mundialmente.
          </p>
          <Button className="bg-[#CE1126] hover:bg-[#A00D1E] text-white rounded-full px-8 py-5 text-lg font-semibold">
            Reservar mi lugar
          </Button>
        </div>
      </div>
    </section>
  );
}
