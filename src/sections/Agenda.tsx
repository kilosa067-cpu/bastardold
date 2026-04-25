import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  User, ChevronLeft, ChevronRight, Check, CreditCard,
  MessageCircle, Loader2, Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAppointmentStore, barbers } from '@/stores/appointmentStore';

gsap.registerPlugin(ScrollTrigger);

// PayPal Button Component (Mock)
function PayPalButton({ amount, onSuccess }: { amount: number; onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const handlePayment = () => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); onSuccess(); }, 2000);
  };
  return (
    <button
      onClick={handlePayment} disabled={isLoading}
      className="w-full bg-[#0070BA] hover:bg-[#003087] text-white rounded-xl py-4 px-6 font-semibold flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-70"
    >
      {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Procesando...</> : <><CreditCard className="w-5 h-5" /> Pagar ${amount} MXN con PayPal</>}
    </button>
  );
}

export default function Agenda() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    currentStep, selectedBarber, selectedServices, selectedDate, selectedTime,
    customerData, paymentOption, setStep, selectBarber, selectDate, selectTime,
    setCustomerData, setPaymentOption, createAppointment, resetBooking,
    getAvailableSlots,
  } = useAppointmentStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const hasBastardServices = selectedServices.some(s => s.bastardOnly);
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const deposit60 = Math.round(totalPrice * 0.6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.agenda-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handlePayment = () => {
    setIsProcessing(true);
    const appointment = createAppointment();
    if (appointment) {
      setTimeout(() => { setIsProcessing(false); setBookingComplete(true); }, 2000);
    } else { setIsProcessing(false); }
  };

  const generateCalendarDays = () => {
    const days = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();
    for (let i = 0; i < startPadding; i++) days.push(null);
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const isToday = new Date().toDateString() === date.toDateString();
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      days.push({ day, date, isToday, isPast, isSelected });
    }
    return days;
  };

  const getAvailableTimeSlots = () => {
    if (!selectedDate || !selectedBarber) return [];
    return getAvailableSlots(selectedDate.toISOString().split('T')[0], selectedBarber.id);
  };

  const openWhatsApp = () => {
    const barberName = selectedBarber?.name || 'Jahzeel';
    const serviceNames = selectedServices.map(s => s.name).join(', ') || 'corte';
    const message = `Hola, quiero agendar en Bastard Old School.\nBarbero: ${barberName}\nServicios: ${serviceNames}\nFecha: ${selectedDate?.toLocaleDateString('es-MX')}\nHora: ${selectedTime}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  // If no services selected, show message
  if (selectedServices.length === 0) {
    return (
      <section id="agenda" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
        <div className="section-padding relative z-10 max-w-2xl mx-auto text-center">
          <div className="agenda-header">
            <h2 className="font-outfit font-bold text-4xl md:text-5xl text-[#2D5A27] mb-4">Elige tu Barbero</h2>
            <p className="text-[#333]/60 mb-8">
              Primero selecciona tus servicios en la sección de arriba, luego elige tu barbero aquí.
            </p>
            <Button
              onClick={() => document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#2D5A27] hover:bg-[#1B3A16] text-white rounded-full px-8 py-5"
            >
              ← Ver Servicios
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Step 1: Select Barber
  if (currentStep === 'barber' || currentStep === 'service') {
    // Filter available barbers based on selected services
    const availableBarbers = hasBastardServices 
      ? barbers.filter(b => b.id === 'bastard')  // Only Jahzeel for Bastard services
      : barbers;

    return (
      <section id="agenda" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
        <div className="section-padding relative z-10">
          <div className="agenda-header text-center mb-12 max-w-3xl mx-auto">
            <h2 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl text-[#2D5A27] mb-4">
              Elige tu Barbero
            </h2>
            <p className="text-[#333]/60">
              {hasBastardServices 
                ? 'Has seleccionado servicios exclusivos de Bastard. Solo Jahzeel puede atenderte.' 
                : 'Selecciona el barbero de tu preferencia para tus servicios.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {availableBarbers.map((barber) => (
              <button
                key={barber.id}
                onClick={() => { selectBarber(barber); setStep('date'); }}
                className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 group hover:-translate-y-1 ${
                  selectedBarber?.id === barber.id
                    ? 'border-[#CE1126] bg-[#CE1126]/10' 
                    : 'border-[#2D5A27]/10 hover:border-[#2D5A27]/50 bg-white'
                }`}
              >
                {barber.id === 'bastard' && (
                  <div className="absolute top-4 right-4 bg-[#2D5A27] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Crown className="w-3 h-3" /> MASTER
                  </div>
                )}
                <div className="w-16 h-16 rounded-full bg-[#2D5A27]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {barber.id === 'bastard' ? (
                    <span className="font-outfit font-bold text-2xl text-[#2D5A27]">B</span>
                  ) : (
                    <User className="w-8 h-8 text-[#2D5A27]" />
                  )}
                </div>
                <h4 className="font-outfit font-bold text-xl text-[#2D5A27] mb-1">{barber.name}</h4>
                <p className="text-sm text-[#333]/50 mb-3">{barber.specialty}</p>
                <p className="text-xs text-[#333]/40">{barber.bio.substring(0, 80)}...</p>
              </button>
            ))}
          </div>

          {/* Selected services summary */}
          <div className="mt-12 max-w-xl mx-auto bg-white rounded-2xl p-6 border border-[#2D5A27]/20">
            <h4 className="font-outfit font-semibold text-[#2D5A27] mb-3 text-center">Servicios seleccionados</h4>
            {selectedServices.map(s => (
              <div key={s.id} className="flex justify-between text-sm py-1">
                <span className="text-[#333]">{s.name}</span>
                <span className="text-[#CE1126] font-semibold">${s.price} MXN</span>
              </div>
            ))}
            <div className="border-t border-[#2D5A27]/20 mt-3 pt-3 flex justify-between font-bold">
              <span className="text-[#2D5A27]">Total</span>
              <span className="text-[#CE1126]">${totalPrice} MXN</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Step 2: Select Date
  if (currentStep === 'date') {
    return (
      <section id="agenda" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
        <div className="section-padding relative z-10 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-4xl text-[#2D5A27] mb-4">Selecciona la Fecha</h2>
            <button onClick={() => setStep('barber')} className="text-[#2D5A27] hover:text-[#1B3A16] text-sm">
              ← Cambiar barbero ({selectedBarber?.name})
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#2D5A27]/10">
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-2 hover:bg-[#2D5A27]/10 rounded-full">
                <ChevronLeft className="w-5 h-5 text-[#2D5A27]" />
              </button>
              <span className="font-outfit font-semibold text-[#2D5A27] text-lg">
                {currentMonth.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}
              </span>
              <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-2 hover:bg-[#2D5A27]/10 rounded-full">
                <ChevronRight className="w-5 h-5 text-[#2D5A27]" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-[#333]/40 py-2">{day}</div>
              ))}
              {generateCalendarDays().map((day, index) => (
                <button
                  key={index}
                  onClick={() => day && !day.isPast && selectDate(day.date)}
                  disabled={!day || day.isPast}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                    !day ? 'invisible' : day.isPast ? 'text-[#333]/20 cursor-not-allowed' : 
                    day.isSelected ? 'bg-[#CE1126] text-white' : day.isToday ? 'border-2 border-[#2D5A27] text-[#2D5A27]' :
                    'hover:bg-[#2D5A27]/10 text-[#333]'
                  }`}
                >{day?.day}</button>
              ))}
            </div>
            {selectedDate && (
              <div className="text-center mt-4">
                <Button onClick={() => setStep('time')} className="bg-[#2D5A27] hover:bg-[#1B3A16] text-white rounded-full px-8">
                  Continuar →
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Step 3: Select Time
  if (currentStep === 'time') {
    return (
      <section id="agenda" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
        <div className="section-padding relative z-10 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-4xl text-[#2D5A27] mb-4">Selecciona la Hora</h2>
            <button onClick={() => setStep('date')} className="text-[#2D5A27] text-sm">← Cambiar fecha</button>
          </div>
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#2D5A27]/10">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {getAvailableTimeSlots().map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => selectTime(slot.time)}
                  disabled={!slot.available}
                  className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                    selectedTime === slot.time ? 'bg-[#CE1126] text-white' :
                    slot.available ? 'bg-gray-100 border border-[#2D5A27]/20 hover:border-[#2D5A27] hover:bg-[#2D5A27]/10 text-[#333]' :
                    'bg-white text-[#333]/20 cursor-not-allowed'
                  }`}
                >{slot.time}</button>
              ))}
            </div>
            {selectedTime && (
              <div className="text-center mt-6">
                <Button onClick={() => setStep('details')} className="bg-[#2D5A27] hover:bg-[#1B3A16] text-white rounded-full px-8">
                  Continuar →
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Step 4: Customer Details
  if (currentStep === 'details') {
    return (
      <section id="agenda" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
        <div className="section-padding relative z-10 max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-4xl text-[#2D5A27] mb-4">Tus Datos</h2>
          </div>
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#2D5A27]/10 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#333]/70">Nombre completo *</Label>
                <Input value={customerData.name} onChange={(e) => setCustomerData({ name: e.target.value })}
                  placeholder="Tu nombre" className="border-[#2D5A27]/20 text-[#333] rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-[#333]/70">Teléfono *</Label>
                <Input value={customerData.phone} onChange={(e) => setCustomerData({ phone: e.target.value })}
                  placeholder="+52 951 123 4567" className="border-[#2D5A27]/20 text-[#333] rounded-xl" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label className="text-[#333]/70">Correo electrónico *</Label>
                <Input type="email" value={customerData.email} onChange={(e) => setCustomerData({ email: e.target.value })}
                  placeholder="tu@email.com" className="border-[#2D5A27]/20 text-[#333] rounded-xl" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label className="text-[#333]/70">Notas opcionales</Label>
                <Textarea value={customerData.notes} onChange={(e) => setCustomerData({ notes: e.target.value })}
                  placeholder="Alguna preferencia..." className="border-[#2D5A27]/20 text-[#333] rounded-xl min-h-[100px]" />
              </div>
            </div>
            <Button
              onClick={() => setStep('payment')}
              disabled={!customerData.name || !customerData.phone || !customerData.email}
              className="w-full bg-[#2D5A27] hover:bg-[#1B3A16] text-white rounded-xl py-5 font-semibold disabled:opacity-50"
            >
              Continuar al pago
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Step 5: Payment
  if (currentStep === 'payment') {
    return (
      <section id="agenda" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
        <div className="section-padding relative z-10 max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-4xl text-[#2D5A27] mb-4">Pago</h2>
          </div>

          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white rounded-2xl p-6 border border-[#2D5A27]/10">
              <h4 className="font-outfit font-semibold text-[#2D5A27] mb-4 text-lg">Resumen</h4>
              <div className="space-y-2 mb-4">
                {selectedServices.map(s => (
                  <div key={s.id} className="flex justify-between text-sm">
                    <span className="text-[#333]/60">{s.name}</span>
                    <span className="text-[#333]">${s.price} MXN</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#2D5A27]/10 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#333]/50">Barbero</span>
                  <span className="text-[#333] font-medium">{selectedBarber?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#333]/50">Fecha y hora</span>
                  <span className="text-[#333]">{selectedDate?.toLocaleDateString('es-MX')} - {selectedTime}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-[#2D5A27]/10 pt-2">
                  <span className="text-[#2D5A27]">Total</span>
                  <span className="text-[#CE1126]">${totalPrice} MXN</span>
                </div>
              </div>
            </div>

            {/* 15 min warning */}
            <div className="bg-[#CE1126]/10 border-2 border-[#CE1126] rounded-xl p-4">
              <p className="text-[#CE1126] text-sm font-bold text-center">
                ⚠️ IMPORTANTE: Solo 15 minutos de tolerancia. Si no llegas a tiempo, el espacio se libera y NO hay reembolso.
              </p>
            </div>

            {/* Payment Options */}
            <RadioGroup value={paymentOption} onValueChange={(v) => setPaymentOption(v as 'deposit' | 'full')} className="space-y-3">
              <div className={`p-4 rounded-xl border-2 transition-all ${paymentOption === 'deposit' ? 'border-[#CE1126] bg-[#CE1126]/5' : 'border-[#2D5A27]/10'}`}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="deposit" id="deposit" />
                  <Label htmlFor="deposit" className="cursor-pointer flex-1">
                    <div className="font-semibold text-[#2D5A27] text-lg">Pagar 60% de anticipo</div>
                    <div className="text-[#CE1126] font-bold text-xl">${deposit60} MXN</div>
                    <div className="text-[#333]/50 text-sm">Resto: ${totalPrice - deposit60} MXN en la barbería</div>
                  </Label>
                </div>
              </div>
              <div className={`p-4 rounded-xl border-2 transition-all ${paymentOption === 'full' ? 'border-[#CE1126] bg-[#CE1126]/5' : 'border-[#2D5A27]/10'}`}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full" className="cursor-pointer flex-1">
                    <div className="font-semibold text-[#2D5A27] text-lg">Pago completo</div>
                    <div className="text-[#CE1126] font-bold text-xl">${totalPrice} MXN</div>
                    <div className="text-[#333]/50 text-sm">Todo pagado, solo llega y disfruta</div>
                  </Label>
                </div>
              </div>
            </RadioGroup>

            <PayPalButton amount={paymentOption === 'full' ? totalPrice : deposit60} onSuccess={handlePayment} />

            <div className="text-center pt-4">
              <p className="text-[#333]/50 text-sm mb-3">¿Prefieres WhatsApp?</p>
              <Button variant="outline" onClick={openWhatsApp} className="border-green-500 text-green-500 hover:bg-green-500/10 rounded-full">
                <MessageCircle className="mr-2 w-5 h-5" /> Reservar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Confirmation
  if (bookingComplete) {
    return (
      <section id="agenda" className="relative w-full py-24 md:py-32 bg-white">
        <div className="section-padding max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-[#2D5A27] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="font-outfit font-bold text-3xl text-[#2D5A27] mb-4">¡Reserva Confirmada!</h2>
          <div className="bg-white rounded-2xl p-6 mb-8 text-left border border-[#2D5A27]/10">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-[#333]/50">Barbero:</span><p className="font-semibold text-[#333]">{selectedBarber?.name}</p></div>
              <div><span className="text-[#333]/50">Servicios:</span><p className="font-semibold text-[#333]">{selectedServices.map(s => s.name).join(', ')}</p></div>
              <div><span className="text-[#333]/50">Fecha:</span><p className="font-semibold text-[#333]">{selectedDate?.toLocaleDateString('es-MX')}</p></div>
              <div><span className="text-[#333]/50">Hora:</span><p className="font-semibold text-[#333]">{selectedTime}</p></div>
              <div><span className="text-[#333]/50">Total:</span><p className="font-semibold text-[#CE1126]">${totalPrice} MXN</p></div>
              <div><span className="text-[#333]/50">Pagado:</span><p className="font-semibold text-[#2D5A27]">${paymentOption === 'full' ? totalPrice : deposit60} MXN</p></div>
            </div>
          </div>
          <Button onClick={() => { resetBooking(); setBookingComplete(false); }} className="bg-[#2D5A27] hover:bg-[#1B3A16] text-white rounded-full px-8 py-5">
            Agendar otra cita
          </Button>
        </div>
      </section>
    );
  }

  if (isProcessing) {
    return (
      <section id="agenda" className="relative w-full py-24 md:py-32 bg-white">
        <div className="section-padding max-w-md mx-auto text-center">
          <Loader2 className="w-12 h-12 text-[#CE1126] animate-spin mx-auto mb-4" />
          <p className="text-[#333]/60">Procesando tu reserva...</p>
        </div>
      </section>
    );
  }

  return null;
}
