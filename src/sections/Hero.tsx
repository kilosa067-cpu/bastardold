import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConfigStore } from '@/stores/configStore';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const config = useConfigStore();

  useEffect(() => {
    // Ensure video loops continuously and never stops
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
      
      const handleEnded = () => {
        video.currentTime = 0;
        video.play().catch(() => {});
      };
      
      const handlePause = () => {
        if (video.paused && video.currentTime > 0 && !video.ended) {
          video.play().catch(() => {});
        }
      };
      
      video.addEventListener('ended', handleEnded);
      video.addEventListener('pause', handlePause);
      
      // Force play every 5 seconds as safeguard
      const interval = setInterval(() => {
        if (video.paused) {
          video.play().catch(() => {});
        }
      }, 5000);
      
      return () => {
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('pause', handlePause);
        clearInterval(interval);
      };
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Video scale effect
      gsap.fromTo(
        videoRef.current,
        { scale: 1.1 },
        { 
          scale: 1,
          duration: 2, 
          ease: 'power2.out' 
        }
      );

      // Content fade up animation
      gsap.fromTo(
        '.hero-title-line',
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.8
        }
      );

      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          delay: 1.4
        }
      );

      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          delay: 1.8
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAgenda = () => {
    const element = document.querySelector('#agenda');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-black"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark Overlay for cinematic effect */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)'
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-end section-padding pb-16 md:pb-24"
      >
        <div className="max-w-4xl">
          {/* Main Title */}
          <h1 className="font-outfit font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-6">
            {config.hero.title.split('.').map((line, i) => (
              <span 
                key={i} 
                className={`hero-title-line block ${i === 1 ? 'text-clay' : ''} ${i === 2 ? 'font-garamond italic font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2' : ''}`}
              >
                {line.trim()}{i < 2 ? '.' : ''}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-white/80 text-lg sm:text-xl md:text-2xl font-light max-w-xl mb-8 leading-relaxed">
            {config.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-wrap gap-4">
            <Button
              onClick={scrollToAgenda}
              size="lg"
              className="bg-clay hover:bg-clay-dark text-white rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              {config.hero.ctaPrimary}
              <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.querySelector('#historia')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white hover:bg-white hover:text-[#2D5A27] rounded-full px-8 py-6 text-lg font-medium transition-all duration-300"
            >
              {config.hero.ctaSecondary}
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
