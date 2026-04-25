import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Historia', href: '#historia' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Barberos', href: '#barberos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Educación', href: '#educacion' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Reseñas', href: '#resenas' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.nav-item',
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5
      }
    );
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border border-white/10 shadow-lg py-2 px-4'
            : 'bg-transparent py-3 px-6'
        } rounded-full`}
      >
        <div className="flex items-center gap-6">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
            className="flex items-center gap-2 transition-colors duration-300"
          >
            <div className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-colors duration-300 ${
              isScrolled ? 'border-moss' : 'border-white/50'
            }`}>
              <img 
                src="/images/logoinicio.png" 
                alt="Bastard Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className={`font-outfit font-bold text-sm hidden sm:block transition-colors duration-300 ${
              isScrolled ? 'text-white' : 'text-white'
            }`}>BASTARD</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className={`nav-item px-3 py-1.5 text-sm font-medium transition-all duration-300 rounded-full hover:bg-moss/10 ${
                  isScrolled 
                    ? 'text-white hover:text-moss' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => scrollToSection('#agenda')}
            className={`hidden sm:flex nav-item rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              isScrolled
                ? 'bg-moss text-white hover:bg-moss-dark'
                : 'bg-clay text-white hover:bg-clay-dark'
            }`}
          >
            Agendar Cita
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? 'text-white' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              className="text-2xl font-outfit font-medium text-white hover:text-clay transition-colors"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.label}
            </a>
          ))}
          <Button
            onClick={() => scrollToSection('#agenda')}
            className="mt-4 bg-clay text-white hover:bg-clay-dark rounded-full px-8 py-3 text-lg"
          >
            Agendar Cita
          </Button>
        </div>
      </div>
    </>
  );
}
