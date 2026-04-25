import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifiesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word by word reveal animation
      const words = textRef.current?.querySelectorAll('.manifiesto-word');
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0.1, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: 1,
            },
          }
        );
      }

      // Decorative elements animation
      gsap.fromTo(
        '.manifiesto-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const line1 = 'Lo común es improvisar.';
  const line2 = 'Aquí se sigue un ritual.';

  return (
    <section
      id="manifiesto"
      ref={sectionRef}
      className="relative w-full py-32 md:py-48 bg-black overflow-hidden"
    >
      {/* Decorative Lines */}
      <div className="manifiesto-line absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-clay/30 to-transparent origin-left" />
      <div className="manifiesto-line absolute bottom-1/4 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-moss/30 to-transparent origin-right" />

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-moss/10 rounded-full blur-3xl" />

      <div className="section-padding relative z-10">
        <div ref={textRef} className="max-w-5xl mx-auto text-center">
          {/* First Line */}
          <p className="font-garamond italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/60 mb-4 md:mb-6 leading-tight">
            {line1.split(' ').map((word, index) => (
              <span key={index} className="manifiesto-word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </p>

          {/* Second Line */}
          <p className="font-outfit font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
            {line2.split(' ').map((word, index) => (
              <span 
                key={index} 
                className={`manifiesto-word inline-block mr-[0.3em] ${
                  word === 'ritual.' ? 'text-clay' : ''
                }`}
              >
                {word}
              </span>
            ))}
          </p>

          {/* Signature */}
          <div className="mt-16 flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-clay/50" />
            <span className="font-garamond italic text-clay text-xl">Bastard</span>
            <div className="w-12 h-px bg-clay/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
