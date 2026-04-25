import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Newspaper, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConfigStore } from '@/stores/configStore';

gsap.registerPlugin(ScrollTrigger);

export default function Noticias() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const config = useConfigStore();
  const news = config.news;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.noticias-header',
        { opacity: 0, y: 40 },
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

      gsap.fromTo(
        '.noticia-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.noticias-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section
      id="noticias"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-clay/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-moss/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="section-padding relative z-10">
        {/* Section Header */}
        <div className="noticias-header text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-clay text-sm uppercase tracking-[0.3em] font-medium mb-4">
            En los Medios
          </span>
          <h2 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Noticias y <span className="text-moss">Prensa</span>
          </h2>
          <p className="text-white/60 text-lg">
            Descubre lo que los medios dicen sobre Bastard Old School y nuestro impacto en la cultura barbera.
          </p>
        </div>

        {/* News Grid */}
        <div className="noticias-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {news.map((item) => (
            <article
              key={item.id}
              className="noticia-card group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-moss/30 transition-all duration-500 hover:shadow-lg"
            >
              {/* Image */}
              {item.image && (
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Source Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-clay text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {item.source}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
                  <Calendar className="w-4 h-4" />
                  {formatDate(item.date)}
                </div>

                {/* Title */}
                <h3 className="font-outfit font-bold text-lg text-white mb-3 group-hover:text-moss transition-colors line-clamp-2">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-white/60 text-sm line-clamp-3 mb-4">
                  {item.excerpt}
                </p>

                {/* Read More */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-moss hover:text-clay transition-colors text-sm font-medium"
                >
                  <span>Leer artículo completo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}

          {/* Featured Article - NVI Noticias */}
          <article className="noticia-card group relative bg-white/5 rounded-2xl overflow-hidden md:col-span-2 lg:col-span-1 border border-white/10 hover:border-moss/30 transition-all duration-500">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src="/images/bastard.jpg"
                alt="Bastard en NVI Noticias"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="bg-clay text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block">
                  NVI Noticias
                </span>
                <h3 className="font-outfit font-bold text-xl text-white mb-2">
                  Bastard, el peluquero de Oaxaca catalogado entre los mejores del mundo
                </h3>
                <p className="text-white/70 text-sm mb-4 line-clamp-2">
                  Jahzeel Macías Salazar, mejor conocido como "Bastard", ha sido reconocido internacionalmente 
                  por su estilo único y su contribución a la cultura barbera.
                </p>
                <a
                  href="https://www.nvinoticias.com/oaxaca/general/bastard-el-peluquero-de-oaxaca-catalogado-entre-los-mejores-del-mundo/150499"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-clay hover:text-white transition-colors text-sm font-medium"
                >
                  <span>Leer artículo completo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>
        </div>

        {/* More News CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://www.nvinoticias.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-moss text-moss hover:bg-moss hover:text-white rounded-full px-8 py-5"
            >
              <Newspaper className="mr-2 w-5 h-5" />
              Ver más noticias
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
