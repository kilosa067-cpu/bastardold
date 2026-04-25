import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';
import Intro from './sections/Intro';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Noticias from './sections/Noticias';
import Historia from './sections/Historia';
import Galeria from './sections/Galeria';
import Barberos from './sections/Barberos';
import Servicios from './sections/Servicios';
import Agenda from './sections/Agenda';
import Educacion from './sections/Educacion';
import VideoSection from './sections/VideoSection';
import Manifiesto from './sections/Manifiesto';
import Resenas from './sections/Resenas';
import Contacto from './sections/Contacto';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [skipIntro, setSkipIntro] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('bastard-intro-seen');
    if (hasSeenIntro) {
      setSkipIntro(true);
    }
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('bastard-intro-seen', 'true');
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <div className="relative min-h-screen">
      {!skipIntro && <Intro onComplete={handleIntroComplete} skip={skipIntro} />}
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Noticias />
        <Historia />
        <Galeria />
        <Barberos />
        <Servicios />
        <Agenda />
        <Educacion />
        <VideoSection />
        <Manifiesto />
        <Resenas />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}

export default App;
