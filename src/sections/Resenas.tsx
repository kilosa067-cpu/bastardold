import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, Instagram, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    id: '1',
    name: 'Carlos M.',
    text: 'La mejor experiencia de barbería que he tenido. Jahzeel tiene un talento único, el corte quedó perfecto y el ambiente es increíble.',
    rating: 5,
    location: 'Oaxaca',
  },
  {
    id: '2',
    name: 'Miguel A.',
    text: 'Vine de CDMX específicamente para cortarme con Bastard. Valió cada kilómetro. Un artista del corte clásico.',
    rating: 5,
    location: 'Ciudad de México',
  },
  {
    id: '3',
    name: 'Andrés R.',
    text: 'El afeitado tradicional es una experiencia religiosa. Las toallas calientes, la navaja, el masaje... incomparable.',
    rating: 5,
    location: 'Oaxaca',
  },
  {
    id: '4',
    name: 'Fernando L.',
    text: 'Llevo 3 años viniendo y nunca he quedado decepcionado. Kylian y Fernando también son excelentes barberos.',
    rating: 5,
    location: 'Tule',
  },
  {
    id: '5',
    name: 'Roberto G.',
    text: 'La atención al detalle es impresionante. No es solo un corte, es una transformación completa.',
    rating: 5,
    location: 'Oaxaca',
  },
];

export default function Resenas() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.resenas-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.fromTo('.resena-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.resenas-grid', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="resenas" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-[#FAFAFA] overflow-hidden">
      <div className="section-padding relative z-10">
        <div className="resenas-header text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-[#2D5A27] text-sm uppercase tracking-[0.3em] font-medium mb-4">
            Testimonios
          </span>
          <h2 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl text-[#2D5A27] mb-6">
            Reseñas
          </h2>
          <p className="text-[#333]/60 text-lg">
            Lo que nuestros clientes dicen sobre la experiencia Bastard.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="w-5 h-5 text-[#CE1126] fill-[#CE1126]" />
              ))}
            </div>
            <div className="font-outfit font-bold text-2xl text-[#2D5A27]">5.0</div>
            <div className="text-[#333]/50 text-sm">Calificación promedio</div>
          </div>
          <div className="text-center">
            <div className="font-outfit font-bold text-2xl text-[#2D5A27]">200+</div>
            <div className="text-[#333]/50 text-sm">Reseñas verificadas</div>
          </div>
          <div className="text-center">
            <div className="font-outfit font-bold text-2xl text-[#2D5A27]">98%</div>
            <div className="text-[#333]/50 text-sm">Recomendarían</div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="resenas-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <div key={review.id} className="resena-card bg-white rounded-2xl p-6 border border-[#2D5A27]/10 hover:border-[#2D5A27]/30 transition-all duration-300">
              <Quote className="w-8 h-8 text-[#2D5A27]/20 mb-4" />
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#CE1126] fill-[#CE1126]" />
                ))}
              </div>
              <p className="text-[#333]/70 mb-4 leading-relaxed">{review.text}</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#2D5A27]/10 flex items-center justify-center">
                  <span className="font-outfit font-bold text-sm text-[#2D5A27]">{review.name[0]}</span>
                </div>
                <div>
                  <div className="font-semibold text-[#333] text-sm">{review.name}</div>
                  <div className="flex items-center gap-1 text-[#333]/40 text-xs">
                    <MapPin className="w-3 h-3" />
                    {review.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://www.instagram.com/bastardoldschool/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#2D5A27] hover:text-[#CE1126] transition-colors text-sm font-medium"
          >
            <Instagram className="w-5 h-5" />
            <span>Ver más reseñas en Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}
