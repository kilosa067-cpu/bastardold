import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Crown, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConfigStore } from '@/stores/configStore';

gsap.registerPlugin(ScrollTrigger);

export default function Barberos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const config = useConfigStore();
  const barbers = config.barbers;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.barberos-header',
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

      // Cards animation
      gsap.fromTo(
        '.barbero-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.barberos-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleBookClick = (barberId: string) => {
    // Store selected barber
    sessionStorage.setItem('preselectedBarber', barberId);
    
    if (barberId === 'bastard') {
      // Jahzeel → redirect to servicios section where Bastard-only services are
      document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Other barbers → redirect to agenda
      document.querySelector('#agenda')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="barberos"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-[#1B3A16] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #4A6B5A 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="section-padding relative z-10">
        {/* Section Header */}
        <div className="barberos-header text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-clay text-sm uppercase tracking-[0.3em] font-medium mb-4">
            El Equipo
          </span>
          <h2 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Conoce al <span className="text-moss">equipo</span>
          </h2>
          <p className="text-white/60 text-lg">
            Maestros del oficio, cada uno aporta su expertise único a la experiencia Bastard.
          </p>
        </div>

        {/* Barbers Grid */}
        <div className="barberos-grid grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {barbers.map((barber) => (
            <div
              key={barber.id}
              className={`barbero-card group relative bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-moss/30 transition-all duration-500 ${
                barber.isPremium ? 'ring-2 ring-clay' : ''
              }`}
            >
              {/* Premium Badge */}
              {barber.isPremium && (
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-[#2D5A27] text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-semibold">
                    <Crown className="w-3 h-3" />
                    Master
                  </div>
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                
                {/* Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-outfit font-bold text-2xl md:text-3xl text-white mb-2">
                    {barber.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80">
                    <Scissors className="w-4 h-4" />
                    <span className="text-sm">Barbero Profesional</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 bg-white/5">
                {/* Specialty */}
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  {barber.specialty}
                </p>

                {/* Bio */}
                <p className="text-white/60 text-sm mb-6 line-clamp-6">
                  {barber.bio}
                </p>

                {/* CTA */}
                <Button
                  onClick={() => handleBookClick(barber.id)}
                  className={`w-full rounded-full py-5 font-semibold transition-all duration-300 ${
                    barber.id === 'bastard'
                      ? 'bg-[#CE1126] hover:bg-[#A00D1E] text-white'
                      : 'bg-[#2D5A27] hover:bg-[#1B3A16] text-white'
                  }`}
                >
                  {barber.id === 'bastard' ? 'Ver servicios exclusivos' : `Agendar con ${barber.name}`}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Note */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            <span className="font-semibold text-white">Nota:</span> Todos nuestros barberos están altamente capacitados. 
            Los servicios exclusivos de Jahzeel solo están disponibles con él.
          </p>
        </div>
      </div>
    </section>
  );
}
