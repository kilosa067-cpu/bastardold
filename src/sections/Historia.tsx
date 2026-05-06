import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Calendar, MapPin, Crown } from 'lucide-react';
import { useConfigStore } from '@/stores/configStore';

gsap.registerPlugin(ScrollTrigger);

export default function Historia() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const config = useConfigStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.historia-title',
        { opacity: 0, y: 50 },
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

      // Content animation
      gsap.fromTo(
        '.historia-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.historia-content',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image animation
      gsap.fromTo(
        '.historia-image',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.historia-image',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        '.historia-stat',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.historia-stats',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="historia"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-[#FAFAFA] overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D5A27]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#CE1126]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="section-padding relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="historia-title inline-block text-[#CE1126] text-sm uppercase tracking-[0.3em] font-medium mb-4">
            Nuestro Origen
          </span>
          <h2 className="historia-title font-outfit font-bold text-4xl md:text-5xl lg:text-6xl text-[#2D5A27]">
            {config.historia.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-[#CE1126]">{config.historia.title.split(' ').slice(-1)}</span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="space-y-8">
            {/* Quote */}
            <div className="historia-content relative">
              <Quote className="absolute -top-4 -left-2 w-10 h-10 text-[#CE1126]/20" />
              <p className="font-garamond italic text-2xl md:text-3xl text-[#2D5A27] leading-relaxed pl-6">
                {config.historia.quote}
              </p>
            </div>

            {/* Story Text */}
            <div className="historia-content space-y-6 text-[#333]/70 leading-relaxed">
              {config.historia.paragraphs.map((paragraph, index) => (
                <p key={index} className={index === 0 ? 'text-lg' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stats */}
            <div className="historia-stats grid grid-cols-3 gap-6 pt-6 border-t border-[#2D5A27]/10">
              <div className="historia-stat text-center">
                <Calendar className="w-6 h-6 text-[#CE1126] mx-auto mb-2" />
                <div className="font-outfit font-bold text-2xl text-[#2D5A27]">{config.historia.year}</div>
                <div className="text-sm text-[#333]/50">Desde</div>
              </div>
              <div className="historia-stat text-center">
                <MapPin className="w-6 h-6 text-[#CE1126] mx-auto mb-2" />
                <div className="font-outfit font-bold text-2xl text-[#2D5A27]">{config.historia.location.split(',')[0]}</div>
                <div className="text-sm text-[#333]/50">México</div>
              </div>
              <div className="historia-stat text-center">
                <Crown className="w-6 h-6 text-[#CE1126] mx-auto mb-2" />
                <div className="font-outfit font-bold text-2xl text-[#2D5A27]">10+</div>
                <div className="text-sm text-[#333]/50">Años</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="historia-image relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src={config.historia.image}
                alt="Bastard Old School Barber"
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-[#2D5A27]/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#CE1126] flex items-center justify-center">
                      <span className="font-outfit font-bold text-white text-lg">B</span>
                    </div>
                    <div>
                      <div className="font-outfit font-bold text-[#2D5A27]">Bastard</div>
                      <div className="text-[#333]/70 text-sm">Master Barber</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Frame */}
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[#2D5A27]/20 rounded-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
