import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Scissors, Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppointmentStore, generalServices, bastardServices } from '@/stores/appointmentStore';

gsap.registerPlugin(ScrollTrigger);

export default function Servicios() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { selectedServices, toggleService } = useAppointmentStore();

  const isServiceSelected = (id: string) => selectedServices.some(s => s.id === id);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.servicios-header', { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.fromTo('.servicio-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.servicios-grid', start: 'top 85%' },
      });
      gsap.fromTo('.bastard-section', { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.bastard-section', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleToggleService = (service: typeof generalServices[0]) => {
    toggleService(service as any);
  };

  const scrollToAgenda = () => {
    const element = document.querySelector('#agenda');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="servicios" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      <div className="section-padding relative z-10">
        <div className="servicios-header text-center mb-14">
          <span className="inline-block text-[#2D5A27] text-sm uppercase tracking-[0.3em] font-medium mb-4">
            Carta de Servicios
          </span>
          <h2 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl text-[#2D5A27] mb-4">
            Servicios
          </h2>
          <p className="text-[#333] text-lg max-w-xl mx-auto">
            Técnicas clásicas y modernas con la precisión de un maestro.
          </p>
        </div>

        {/* Walk-ins Banner */}
        <div className="mb-10 bg-[#2D5A27]/10 border border-[#2D5A27]/30 rounded-xl p-4 text-center max-w-3xl mx-auto">
          <p className="text-[#2D5A27] font-semibold text-lg">
            WALKINGS BIENVENIDOS
          </p>
          <p className="text-[#333]/60 text-sm">
            Tiempo de espera máximo: 25 minutos
          </p>
        </div>

        {/* General Services Grid */}
        <div className="servicios-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto mb-20">
          {generalServices.map((service) => {
            const Icon = service.name.toLowerCase().includes('afeitado') || service.name.toLowerCase().includes('trim') || service.name.toLowerCase().includes('beard') ? Flame : Scissors;
            const selected = isServiceSelected(service.id);

            return (
              <div
                key={service.id}
                className={`servicio-card group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  selected 
                    ? 'border-[#CE1126] bg-[#CE1126]/5' 
                    : 'border-[#2D5A27]/10 hover:border-[#2D5A27]/40 bg-white shadow-sm'
                }`}
              >
                {selected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-[#CE1126] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}

                <div className="w-12 h-12 rounded-xl bg-[#2D5A27]/10 flex items-center justify-center mb-4 group-hover:bg-[#2D5A27] group-hover:scale-110 transition-all duration-500">
                  <Icon className="w-6 h-6 text-[#2D5A27] group-hover:text-white transition-colors" />
                </div>

                <h3 className="font-outfit font-bold text-lg text-[#2D5A27] mb-2">{service.name}</h3>
                <p className="text-[#333]/60 text-sm mb-4 line-clamp-3">{service.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#CE1126] font-bold text-xl">${service.price} MXN</span>
                  <span className="text-[#333]/40 text-sm">{service.duration} min</span>
                </div>

                <Button
                  onClick={() => handleToggleService(service)}
                  variant={selected ? "default" : "outline"}
                  className={`w-full rounded-full ${
                    selected 
                      ? 'bg-[#CE1126] hover:bg-[#A00D1E] text-white' 
                      : 'border-[#2D5A27] text-[#2D5A27] hover:bg-[#2D5A27] hover:text-white'
                  }`}
                >
                  {selected ? '✓ Agregado' : '+ Agregar'}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Bastard Exclusive Services Section */}
        <div className="bastard-section max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-[#CE1126]/10 border border-[#CE1126]/30 rounded-full px-6 py-2 mb-4">
              <span className="text-[#CE1126] font-semibold text-sm uppercase tracking-wider">
                Exclusivo
              </span>
            </div>
            <h3 className="font-outfit font-bold text-3xl md:text-4xl text-[#2D5A27] mb-2">
              Servicios con Bastard
            </h3>
            <p className="text-[#333]/60">
              Solo disponibles con Jahzeel Master Barber Bastard Old School
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bastardServices.map((service) => {
              const Icon = Flame;
              const selected = isServiceSelected(service.id);

              return (
                <div
                  key={service.id}
                  className={`servicio-card group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                    selected 
                      ? 'border-[#CE1126] bg-[#CE1126]/5' 
                      : 'border-[#CE1126]/20 hover:border-[#CE1126] bg-white shadow-md'
                  }`}
                >
                  {selected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-[#CE1126] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}

                  <div className="w-12 h-12 rounded-xl bg-[#CE1126]/10 flex items-center justify-center mb-4 group-hover:bg-[#CE1126] group-hover:scale-110 transition-all duration-500">
                    <Icon className="w-6 h-6 text-[#CE1126] group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="font-outfit font-bold text-lg text-[#2D5A27] mb-2">{service.name}</h3>
                  <p className="text-[#333]/60 text-sm mb-4">{service.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#CE1126] font-bold text-2xl">${service.price} MXN</span>
                    <span className="text-[#333]/40 text-sm">{service.duration} min</span>
                  </div>

                  <Button
                    onClick={() => handleToggleService(service as any)}
                    variant={selected ? "default" : "outline"}
                    className={`w-full rounded-full ${
                      selected 
                        ? 'bg-[#CE1126] hover:bg-[#A00D1E] text-white' 
                        : 'border-[#CE1126] text-[#CE1126] hover:bg-[#CE1126] hover:text-white'
                    }`}
                  >
                    {selected ? '✓ Agregado' : '+ Agregar'}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Summary */}
        {selectedServices.length > 0 && (
          <div className="mt-14 bg-[#2D5A27]/5 rounded-2xl p-6 max-w-3xl mx-auto border border-[#2D5A27]/20">
            <h4 className="font-outfit font-semibold text-[#2D5A27] mb-3 text-center">
              Servicios seleccionados ({selectedServices.length})
            </h4>
            <div className="space-y-2 mb-4">
              {selectedServices.map(s => (
                <div key={s.id} className="flex justify-between text-sm">
                  <span className="text-[#333]">{s.name}</span>
                  <span className="text-[#CE1126] font-semibold">${s.price} MXN</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-[#2D5A27]/20 pt-3">
              <span className="text-[#2D5A27]">Total</span>
              <span className="text-[#CE1126]">
                ${selectedServices.reduce((sum, s) => sum + s.price, 0)} MXN
              </span>
            </div>
            <Button
              onClick={scrollToAgenda}
              className="w-full mt-4 bg-[#2D5A27] hover:bg-[#1B3A16] text-white rounded-full py-6 font-semibold"
            >
              Agendar Cita →
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
