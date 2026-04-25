import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface IntroProps {
  onComplete: () => void;
  skip?: boolean;
}

export default function Intro({ onComplete, skip }: IntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!skip);

  useEffect(() => {
    if (skip) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setVisible(false);
          onComplete();
        },
      });

      // Fade in logo
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
      )
      // Fade in text below logo
      .fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.3'
      )
      // Hold for 2 seconds
      .to({}, { duration: 2 })
      // Fade out text first
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.in',
      })
      // Fade out logo
      .to(logoRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'power2.in',
      }, '-=0.2')
      // Fade out overlay
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      }, '-=0.3');
    });

    return () => ctx.revert();
  }, [skip, onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      style={{ 
        backgroundColor: '#000000',
      }}
    >
      {/* Logo redondo */}
      <img
        ref={logoRef}
        src="/images/logoinicio.png"
        alt="Bastard Old School"
        className="w-32 h-32 md:w-48 md:h-48 object-contain opacity-0"
        style={{ 
          borderRadius: '50%',
          overflow: 'hidden'
        }}
      />
      {/* Text below logo */}
      <div ref={textRef} className="mt-8 text-center opacity-0">
        <p
          className="font-outfit text-xl md:text-3xl font-light tracking-[0.25em] uppercase text-[#CE1126]"
        >
          The Classic is the New Punk
        </p>
      </div>
    </div>
  );
}
