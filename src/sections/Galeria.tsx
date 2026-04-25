import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  '/images/galeria1.jpg',
  '/images/galeria2.jpg',
  '/images/galeria3.jpg',
  '/images/galeria4.jpg',
  '/images/galeria5.jpg',
  '/images/galeria6.jpg',
  '/images/galeria7.jpg',
  '/images/galeria8.jpg',
  '/images/galeria9.jpg',
  '/images/galeria10.jpg',
  '/images/galeria11.jpg',
  '/images/galeria12.jpg',
];

export default function Galeria() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.galeria-header',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Stagger entrance for grid items
      const items = gsap.utils.toArray<HTMLElement>('.galeria-item');
      items.forEach((item, index) => {
        gsap.set(item, { opacity: 0, scale: 0.8, rotateY: index % 2 === 0 ? -30 : 30 });
        
        gsap.to(item, {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.9,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: (index % 4) * 0.1,
        });
      });

      // Hover effects with transitions
      items.forEach((item) => {
        const img = item.querySelector('img');
        
        item.addEventListener('mouseenter', () => {
          gsap.to(img, { scale: 1.1, duration: 0.5, ease: 'power2.out' });
          gsap.to(item.querySelector('.flip-overlay'), { opacity: 1, duration: 0.3 });
        });
        
        item.addEventListener('mouseleave', () => {
          gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' });
          gsap.to(item.querySelector('.flip-overlay'), { opacity: 0, duration: 0.3 });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto slideshow effect
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <section id="galeria" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-black overflow-hidden">
      <div className="section-padding relative z-10">
        <div className="galeria-header text-center mb-16">
          <span className="inline-block text-[#CE1126] text-sm uppercase tracking-[0.3em] font-medium mb-4">
            Nuestro Trabajo
          </span>
          <h2 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Galería
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Cada corte es una obra de arte. Precisión, estilo y tradición en cada detalle.
          </p>
        </div>

        {/* Featured slideshow with Ken Burns effect */}
        <div className="relative max-w-5xl mx-auto mb-12 aspect-video rounded-2xl overflow-hidden bg-black">
          {galleryImages.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={src}
                alt={`Destacado ${index + 1}`}
                className={`w-full h-full object-cover ${
                  index === activeIndex ? 'scale-110' : 'scale-100'
                }`}
                style={{ transition: 'transform 6s linear' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          ))}
          
          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => { setActiveIndex(index); setIsAutoPlay(false); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-8 bg-[#CE1126]' : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Masonry grid with original aspect ratios */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 max-w-6xl mx-auto space-y-3 md:space-y-4">
          {galleryImages.map((src, index) => (
            <div
              key={index}
              className="galeria-item relative overflow-hidden rounded-lg md:rounded-xl group cursor-pointer break-inside-avoid mb-3 md:mb-4"
              style={{ perspective: '1000px' }}
              onClick={() => { setActiveIndex(index); setIsAutoPlay(false); }}
            >
              <img
                src={src}
                alt={`Corte ${index + 1}`}
                className="w-full h-auto object-cover will-change-transform"
              />

              {/* Flip overlay on hover */}
              <div className="flip-overlay absolute inset-0 bg-black/50 opacity-0 flex items-center justify-center transition-opacity">
                <div className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m0 0v6m0-6h6m-6 0H7" />
                  </svg>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#2D5A27]/0 group-hover:border-[#2D5A27] transition-all duration-500 z-30" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#2D5A27]/0 group-hover:border-[#2D5A27] transition-all duration-500 z-30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
