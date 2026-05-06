import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Crown, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

// Componente de imagen con zoom suave al hover
function ZoomImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
      />
    </div>
  );
}

export default function Barberos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.barberos-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.barbero-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.barberos-grid', start: 'top 90%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleBookClick = (barberId: string) => {
    if (barberId === 'bastard') {
      document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.querySelector('#agenda')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="barberos"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-[#FAFAFA] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #2D5A27 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="section-padding relative z-10">
        <div className="barberos-header text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-[#CE1126] text-sm uppercase tracking-[0.3em] font-medium mb-4">
            El Equipo
          </span>
          <h2 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl text-[#2D5A27] mb-6">
            Conoce al <span className="text-[#CE1126]">equipo</span>
          </h2>
          <p className="text-[#333]/60 text-lg">
            Maestros del oficio. Cada uno aporta su expertise único a la experiencia Bastard.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Jahzeel - Featured */}
          <div className="barbero-card group relative bg-white rounded-3xl overflow-hidden border border-[#2D5A27]/10 hover:border-[#2D5A27]/30 transition-all duration-500">
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-[#2D5A27] text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-semibold">
                <Crown className="w-3 h-3" /> MASTER
              </div>
            </div>

            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[4/5] md:aspect-auto min-h-[400px] overflow-hidden">
                <ZoomImage
                  src="/images/bastard.jpg"
                  alt="Jahzeel Macías Salazar"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r pointer-events-none" />
              </div>

              <div className="p-8 flex flex-col justify-center">
                <h3 className="font-outfit font-bold text-2xl md:text-3xl text-[#2D5A27] mb-2">
                  Jahzeel Macías Salazar
                </h3>
                <div className="flex items-center gap-2 text-[#CE1126] mb-4">
                  <Scissors className="w-4 h-4" />
                  <span className="text-sm font-semibold">Master Barber Old School</span>
                </div>
                <p className="text-[#333]/70 text-sm leading-relaxed mb-6">
                  Jahzeel a.k.a. Bastard Old School Master Barber, con más de 13 años de experiencia y 10 años como educador global y plataformista profesional, originario de la ciudad de Oaxaca de Juárez, México. Con formación académica en Europa en el oficio de la peluquería, especializado en técnicas clásicas de corte de caballero y ritual de afeitado. Fundador y creador de Bastard Old School. Considerado uno de los mejores barberos clásicos del mundo.
                </p>
                <Button
                  onClick={() => handleBookClick('bastard')}
                  className="bg-[#CE1126] hover:bg-[#A00D1E] text-white rounded-full py-5 font-semibold w-full md:w-auto"
                >
                  Ver servicios exclusivos
                </Button>
              </div>
            </div>
          </div>

          {/* Team Grid */}
          <div className="barberos-grid grid md:grid-cols-2 gap-6">
            {/* Kylian */}
            <div className="barbero-card group relative bg-white rounded-3xl overflow-hidden border border-[#2D5A27]/10 hover:border-[#2D5A27]/30 transition-all duration-500">
              <div className="relative aspect-[3/4] overflow-hidden">
                <ZoomImage
                  src="/images/kilo.jpg"
                  alt="Kylian Ruiz L."
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                  <h3 className="font-outfit font-bold text-2xl text-white mb-1">
                    Kylian Ruiz L.
                  </h3>
                  <div className="flex items-center gap-2 text-white/80">
                    <Scissors className="w-4 h-4" />
                    <span className="text-sm">Barbero Profesional</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#333]/80 text-sm leading-relaxed mb-4">
                  Nueva generación de la barbería oaxaqueña
                </p>
                <p className="text-[#333]/60 text-sm mb-6">
                  Kylian Ruiz, originario de Santa María el Tule, formado y constituido en la escuela de formación de Bastard Old School. Un increíble talento oaxaqueño que preserva y respeta los verdaderos valores de la peluquería. Una gran experiencia con nuestros nuevos talentos.
                </p>
                <Button
                  onClick={() => handleBookClick('turno')}
                  className="w-full bg-[#2D5A27] hover:bg-[#1B3A16] text-white rounded-full py-5 font-semibold"
                >
                  Agendar con Kylian
                </Button>
              </div>
            </div>

            {/* Fernando */}
            <div className="barbero-card group relative bg-white rounded-3xl overflow-hidden border border-[#2D5A27]/10 hover:border-[#2D5A27]/30 transition-all duration-500">
              <div className="relative aspect-[3/4] overflow-hidden">
                <ZoomImage
                  src="/images/fer.jpg"
                  alt="Fernando Córdova"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                  <h3 className="font-outfit font-bold text-2xl text-white mb-1">
                    Fernando Córdova
                  </h3>
                  <div className="flex items-center gap-2 text-white/80">
                    <Scissors className="w-4 h-4" />
                    <span className="text-sm">Barbero Profesional</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#333]/80 text-sm leading-relaxed mb-4">
                  Técnica moderna con visión internacional
                </p>
                <p className="text-[#333]/60 text-sm mb-6">
                  Nuestro equipo de peluqueros lleva el oficio con la tradición y la perfección, con una amplia visión de elegancia, desarrollándose día a día. Fernando, originario de la ciudad de Oaxaca de Juárez, cuenta con una trayectoria excelente.
                </p>
                <Button
                  onClick={() => handleBookClick('turno')}
                  className="w-full bg-[#2D5A27] hover:bg-[#1B3A16] text-white rounded-full py-5 font-semibold"
                >
                  Agendar con Fernando
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
