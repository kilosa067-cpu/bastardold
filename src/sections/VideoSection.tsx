import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const videos = [
  {
    id: 'classic-cut',
    title: 'Corte Clásico',
    subtitle: 'haircutharry',
    embedUrl: 'https://www.youtube.com/embed/CCqThP2Havs?si=default',
    thumbnail: 'https://img.youtube.com/vi/CCqThP2Havs/maxresdefault.jpg',
  },
  {
    id: 'afeitado-tradicional',
    title: 'Afeitado Tradicional',
    subtitle: 'haircutharry',
    embedUrl: 'https://www.youtube.com/embed/PHB1h6ke7w0?si=default',
    thumbnail: 'https://img.youtube.com/vi/PHB1h6ke7w0/maxresdefault.jpg',
  },
];

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.video-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.fromTo('.video-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.videos-grid', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 md:py-32 bg-[#FAFAFA] overflow-hidden">
      <div className="section-padding relative z-10">
        {/* Header */}
        <div className="video-header text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-[#2D5A27] text-sm uppercase tracking-[0.3em] font-medium mb-4">
            La Experiencia
          </span>
          <h2 className="font-outfit font-bold text-4xl md:text-5xl text-[#2D5A27] mb-4">
            Bastard Old School
          </h2>
          <p className="text-[#333]/60 max-w-xl mx-auto">
            Más que una barbería. Un ritual de precisión, tradición y estilo inconfundible.
          </p>
        </div>

        {/* Videos Grid */}
        <div className="videos-grid grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {videos.map((video) => (
            <div key={video.id} className="video-card">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#2D5A27]/10 border border-[#2D5A27]/20">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-outfit font-bold text-lg text-[#2D5A27]">{video.title}</h3>
                <p className="text-[#333]/50 text-sm">{video.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
