import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Noticias() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.noticia-card',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="noticias"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#CE1126]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2D5A27]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="section-padding relative z-10">
        {/* Section Header */}
        <div className="noticias-header text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-[#CE1126] text-sm uppercase tracking-[0.3em] font-medium mb-4">
            En los Medios
          </span>
          <h2 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl text-[#2D5A27] mb-6">
            Noticias y <span className="text-[#CE1126]">Prensa</span>
          </h2>
        </div>

        {/* Featured Article - NVI Noticias */}
        <div className="max-w-5xl mx-auto">
          <article className="noticia-card group relative bg-white rounded-3xl overflow-hidden border border-[#2D5A27]/10 hover:border-[#2D5A27]/30 transition-all duration-500 hover:shadow-xl">
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-video md:aspect-auto overflow-hidden">
                <img
                  src="/images/bastard.jpg"
                  alt="Bastard en NVI Noticias"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r" />
                
                {/* Source Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#CE1126] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    NVI Noticias
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-[#333]/50 mb-4">
                  <Calendar className="w-4 h-4" />
                  15 de enero de 2024
                </div>

                {/* Title */}
                <h3 className="font-outfit font-bold text-2xl md:text-3xl text-[#2D5A27] mb-4 group-hover:text-[#CE1126] transition-colors leading-tight">
                  Bastard, el peluquero de Oaxaca catalogado entre los mejores del mundo
                </h3>

                {/* Excerpt */}
                <p className="text-[#333]/60 mb-6 leading-relaxed">
                  Jahzeel Macías Salazar, mejor conocido como "Bastard", ha sido reconocido internacionalmente 
                  por su estilo único y su contribución a la cultura barbera. Su dedicación a las técnicas 
                  clásicas y su visión innovadora lo han posicionado como uno de los barberos más destacados 
                  a nivel mundial, llevando el nombre de Oaxaca a lo más alto de la peluquería masculina.
                </p>

                {/* Read More */}
                <a
                  href="https://www.nvinoticias.com/oaxaca/general/bastard-el-peluquero-de-oaxaca-catalogado-entre-los-mejores-del-mundo/150499"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#2D5A27] hover:bg-[#1B3A16] text-white transition-colors text-sm font-medium px-6 py-3 rounded-full w-fit"
                >
                  <span>Leer artículo completo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
