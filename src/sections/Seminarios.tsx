import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, DollarSign, ArrowRight, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConfigStore } from '@/stores/configStore';

gsap.registerPlugin(ScrollTrigger);

export default function Seminarios() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const config = useConfigStore();
  const seminarios = config.seminarios;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.seminarios-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.seminario-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.seminarios-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="seminarios"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-moss/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-clay/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="section-padding relative z-10">
        {/* Section Header */}
        <div className="seminarios-header text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-clay text-sm uppercase tracking-[0.3em] font-medium mb-4">
            Formación Profesional
          </span>
          <h2 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Seminarios y <span className="text-moss">Cursos</span>
          </h2>
          <p className="text-white/60 text-lg">
            Aprende de los mejores. Formación especializada en técnicas de barbería clásica y moderna.
          </p>
        </div>

        {/* Seminarios Grid */}
        <div className="seminarios-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {seminarios.map((seminario) => (
            <article
              key={seminario.id}
              className="seminario-card group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-moss/30 transition-all duration-500"
            >
              {/* Badge */}
              <div className="p-6 pb-0">
                <span className="inline-flex items-center gap-1 bg-clay text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  <GraduationCap className="w-3 h-3" />
                  Seminario
                </span>
              </div>

              {/* Content */}
              <div className="p-6 pt-0">
                {/* Title */}
                <h3 className="font-outfit font-bold text-xl text-white mb-3 group-hover:text-moss transition-colors">
                  {seminario.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm line-clamp-3 mb-4">
                  {seminario.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4">
                  {seminario.date && (
                    <div className="flex items-center gap-1.5 text-sm text-white/50">
                      <Calendar className="w-4 h-4" />
                      {seminario.date}
                    </div>
                  )}
                  {seminario.price && (
                    <div className="flex items-center gap-1.5 text-sm text-moss font-medium">
                      <DollarSign className="w-4 h-4" />
                      ${seminario.price} MXN
                    </div>
                  )}
                </div>

                {/* CTA */}
                <Button
                  className="w-full bg-moss hover:bg-moss-dark text-white rounded-full py-5 font-semibold transition-all duration-300 group/btn"
                >
                  <span>Más Información</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Add More CTA */}
        <div className="mt-12 text-center">
          <p className="text-white/60 mb-4">
            ¿Interesado en nuestros seminarios? Contáctanos para más información.
          </p>
          <a href="#contacto">
            <Button
              variant="outline"
              className="border-moss text-moss hover:bg-moss hover:text-white rounded-full px-8 py-5"
            >
              Contactar
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
