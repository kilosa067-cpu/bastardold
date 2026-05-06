import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifiesto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.manifiesto-content', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      
      // Stagger each line for dramatic effect
      gsap.fromTo('.manifiesto-line', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.manifiesto-lines', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifiesto" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[#2D5A27] to-transparent" />
      
      <div className="section-padding relative z-10">
        <div className="manifiesto-content max-w-4xl mx-auto text-center">
          <span className="inline-block text-[#CE1126] text-sm uppercase tracking-[0.3em] font-medium mb-8">
            Nuestra Esencia
          </span>
          
          <div className="manifiesto-lines space-y-3">
            <p className="manifiesto-line font-outfit font-bold text-3xl md:text-4xl lg:text-5xl text-[#2D5A27] leading-tight">
              Autenticidad por encima de tendencias
            </p>
            <p className="manifiesto-line font-garamond italic text-2xl md:text-3xl text-[#333]/70">
              Tradición clásica, precisión moderna
            </p>
            <p className="manifiesto-line font-outfit font-bold text-3xl md:text-4xl lg:text-5xl text-[#CE1126] leading-tight">
              La silla no hace al barbero
            </p>
            <p className="manifiesto-line font-garamond italic text-xl md:text-2xl text-[#333]/60">
              El espejo y las sonrisas nunca mienten
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="w-20 h-px bg-[#2D5A27]/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
