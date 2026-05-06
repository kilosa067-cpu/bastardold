import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConfigStore } from '@/stores/configStore';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const config = useConfigStore();
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    const handleLoaded = () => {
      setVideoLoaded(true);
      tryPlay();
    };

    video.addEventListener('loadeddata', handleLoaded);
    video.addEventListener('canplaythrough', handleLoaded);

    // Try to play immediately
    tryPlay();

    const handleEnded = () => {
      video.currentTime = 0;
      tryPlay();
    };

    const handlePause = () => {
      if (video.paused && video.currentTime > 0 && !video.ended) {
        tryPlay();
      }
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('pause', handlePause);

    // Force play every 3 seconds as safeguard
    const interval = setInterval(() => {
      if (video.paused) {
        tryPlay();
      }
    }, 3000);

    return () => {
      video.removeEventListener('loadeddata', handleLoaded);
      video.removeEventListener('canplaythrough', handleLoaded);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('pause', handlePause);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          duration: 2,
          ease: 'power2.out'
        }
      );

      gsap.fromTo(
        '.hero-title-line',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.8
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
          delay: 1.4
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
      {/* Background placeholder while video loads */}
      <div
        className={`absolute inset-0 w-full h-full bg-black transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Background Video */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
          <h1 className="hero-title-line font-outfit font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-8">
            <span className="text-white">Traditional Barber, </span>
            <span className="text-[#CE1126]">No Bullcrap</span>
          </h1>

          {/* CTA Buttons */}
          <div className="hero-cta">
            <Button
              onClick={scrollToAgenda}
              size="lg"
              className="bg-[#CE1126] hover:bg-[#A00D1E] text-white rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              {config.hero.ctaPrimary}
              <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
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
