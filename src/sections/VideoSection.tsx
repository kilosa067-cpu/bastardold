import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface VideoCardProps {
  videoId: string;
  title: string;
  subtitle: string;
}

function VideoCard({ videoId, title, subtitle }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
      {!isPlaying ? (
        <>
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button onClick={() => setIsPlaying(true)} className="group relative">
              <div className="absolute inset-0 bg-[#CE1126]/30 rounded-full animate-ping" />
              <div className="absolute inset-0 bg-[#CE1126]/20 rounded-full animate-pulse" />
              <div className="relative w-20 h-20 md:w-28 md:h-28 bg-[#CE1126] rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <Play className="w-8 h-8 md:w-12 md:h-12 text-white ml-1" fill="white" />
              </div>
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-outfit font-bold text-lg text-white mb-1">{title}</h3>
                <p className="text-white/60 text-sm">{subtitle}</p>
              </div>
              <button
                onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}
                className="hidden sm:flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-xs">YouTube</span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-black/80 hover:bg-black rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.video-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.fromTo('.video-card', { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.video-grid', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="video" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-[#f0f4ef] overflow-hidden">
      <div className="section-padding relative z-10">
        <div className="video-header text-center mb-14 max-w-3xl mx-auto">
          <span className="inline-block text-[#CE1126] text-sm uppercase tracking-[0.3em] font-medium mb-4">
            Conoce el Proyecto
          </span>
          <h2 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl text-[#2D5A27] mb-6">
            Bastard <span className="text-[#2D5A27]/40">Old School</span>
          </h2>
          <p className="text-[#333]/60 text-lg">
            Descubre la historia, la filosofía y el ritual detrás de la barbería de culto.
          </p>
        </div>

        <div className="video-grid max-w-5xl mx-auto space-y-8">
          <div className="video-card">
            <VideoCard
              videoId="CCqThP2Havs"
              title="Bastard Old School Master Barber"
              subtitle="Conoce el proyecto • Documental oficial"
            />
          </div>
          <div className="video-card">
            <VideoCard
              videoId="PHB1h6ke7w0"
              title="El Arte del Afeitado Tradicional"
              subtitle="Ritual de afeitado con navaja • Tecnica old school"
            />
          </div>
        </div>

        <div className="mt-14 text-center">
          <p className="text-[#333]/50 text-sm max-w-xl mx-auto italic">
            "Bastard es un ser y actitud unica, una forma de vida, ser tu mismo,
            sin estereotipos, gobiernos y dogmas."
          </p>
          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#CE1126] animate-pulse" />
            <span className="text-[#CE1126] text-sm font-medium">Documental oficial del proyecto</span>
          </div>
        </div>
      </div>
    </section>
  );
}
