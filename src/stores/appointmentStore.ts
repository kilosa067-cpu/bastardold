import { create } from 'zustand';

// Types
export interface Barber {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  isPremium: boolean;
  priceMultiplier: number;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: number;
  bastardOnly?: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  barberId: string;
  serviceId: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
  paymentStatus: 'pending' | 'deposit' | 'paid';
  paymentAmount: number;
  totalAmount: number;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export type BookingStep = 'barber' | 'service' | 'date' | 'time' | 'details' | 'payment' | 'confirmation';

interface AppointmentState {
  // Appointments List
  appointments: Appointment[];
  
  // Booking Flow
  currentStep: BookingStep;
  selectedBarber: Barber | null;
  selectedServices: Service[];
  selectedDate: Date | null;
  selectedTime: string | null;
  customerData: {
    name: string;
    phone: string;
    email: string;
    notes: string;
  };
  paymentOption: 'deposit' | 'full';
  
  // Actions
  setStep: (step: BookingStep) => void;
  selectBarber: (barber: Barber | null) => void;
  addService: (service: Service) => void;
  removeService: (serviceId: string) => void;
  toggleService: (service: Service) => void;
  selectDate: (date: Date | null) => void;
  selectTime: (time: string | null) => void;
  setCustomerData: (data: Partial<AppointmentState['customerData']>) => void;
  setPaymentOption: (option: 'deposit' | 'full') => void;
  createAppointment: () => Appointment | null;
  resetBooking: () => void;
  
  // Helpers
  getAvailableSlots: (date: string, barberId: string) => TimeSlot[];
  getTotalPrice: () => number;
  getDepositAmount: () => number;
  
  // Admin functions (stubs for now)
  getAdminStats: () => { totalAppointments: number; totalRevenue: number; pendingAppointments: number; weeklyRevenue: number };
  cancelAppointment: (id: string) => void;
  shopSchedule: { openDays: string[]; openTime: string; closeTime: string };
  updateShopSchedule: (schedule: Partial<{ openDays: string[]; openTime: string; closeTime: string }>) => void;
}

// Sample Barbers Data
export const barbers: Barber[] = [
  {
    id: 'bastard',
    name: 'Jahzeel',
    specialty: 'Master Barber Old School',
    bio: 'Jahzeel a.k.a. Bastard Old School Master Barber con más de 13 años de experiencia. Fundador de Bastard Old School.',
    isPremium: false,
    priceMultiplier: 1,
  },
  {
    id: 'kylian',
    name: 'Kylian Ruiz L.',
    specialty: 'Nueva generación de la barbería oaxaqueña',
    bio: 'Con más de 3 años de experiencia, originario de Santa María del Tule.',
    isPremium: false,
    priceMultiplier: 1,
  },
  {
    id: 'fernando',
    name: 'Fernando Córdova Jahzeel',
    specialty: 'Técnica moderna con visión internacional',
    bio: '7 años de experiencia, formado en Cancún.',
    isPremium: false,
    priceMultiplier: 1,
  },
];

// General Services (available for all barbers)
export const generalServices: Service[] = [
  {
    id: 'creative-mayhem-cut',
    name: 'CREATIVE AND MAYHEM CUT',
    price: 350,
    description: 'Formas asimétricas, creación de movimiento sobre la textura natural del cabello, a través de capas, escalonamientos over layers, over direction, DESCONEXIONES.',
    duration: 60,
  },
  {
    id: 'savage-junior-cut',
    name: 'SAVAGE JUNIOR CUT',
    price: 300,
    description: 'Arreglo de contornos super delineados o desvanecidos sutiles, acabados naturales formales o creativos en tendencia y ajuste regular en largo.',
    duration: 40,
  },
  {
    id: 'afro-curly-hair',
    name: 'AFRO AND CURLY HAIR',
    price: 360,
    description: 'Método curly and american black hair, rebajado hecho a mano con tijeras o máquina, con fades y taper de ultra precisión en seco.',
    duration: 60,
  },
  {
    id: 'military-cut',
    name: 'MILITARY CUT',
    price: 300,
    description: 'Rasurados super finos con navaja, trimmers o shaver muy milimétricos, acabados perfectos para buzz cuts, flat tops (corte mesa).',
    duration: 50,
  },
  {
    id: 'modern-cut',
    name: 'MODERN CUT',
    price: 370,
    description: 'Aplicación de técnicas modernas en fades y taper con formas geométricas clásicas, toques en movimiento como capas o desconexiones.',
    duration: 60,
  },
  {
    id: 'regular-cut-executive',
    name: 'REGULAR CUT EXECUTIVE CONTOUR',
    price: 350,
    description: 'Rebajado de laterales y nuca media o baja con tijeras o clipper over comb finalizado con contornos super finos.',
    duration: 45,
  },
  {
    id: 'long-hair',
    name: 'LONG HAIR',
    price: 450,
    description: 'Cabelleras largas pasando los hombros o más, ajuste y limpieza de puntas o creación de formas geométricas en capas.',
    duration: 60,
  },
  {
    id: 'afeitado-tradicional',
    name: 'AFEITADO TRADICIONAL CLASSIC HOT TOWELS',
    price: 450,
    description: 'Ritual dedicado al rasurado clásico de los años 20s, cuidado de la piel y relajación del caballero. Dos toallas calientes, espuma artesanal, masaje facial.',
    duration: 40,
  },
  {
    id: 'express-cold-bear',
    name: 'EXPRESS COLD BEAR TRIM',
    price: 300,
    description: 'Aplicación de cremas y lociones frescas cítricas con espuma fría o gel, procedimiento semi húmedo o en seco.',
    duration: 25,
  },
  {
    id: 'hair-afeitado-hot',
    name: 'HAIR CUT / AFEITADO TRADICIONAL HOT',
    price: 650,
    description: 'TOTAL clean HOT CLASSIC grooming. Corte + afeitado tradicional completo con toallas calientes.',
    duration: 70,
  },
  {
    id: 'hair-express-cold',
    name: 'HAIR CUT / EXPRESS COLD BEAR TRIM',
    price: 480,
    description: 'TOTAL clean COLD grooming. Corte + arreglo express de barba en seco con productos frescos.',
    duration: 60,
  },
];

// Bastard Exclusive Services (only Jahzeel can do these)
export const bastardServices: Service[] = [
  {
    id: 'bastard-full-old',
    name: 'FULL OLD FASHIONED SERVICE',
    price: 950,
    description: 'Hair cut + afeitado tradicional completo con Jahzeel Master Barber Bastard Old School. La experiencia clásica definitiva.',
    duration: 70,
    bastardOnly: true,
  },
  {
    id: 'bastard-full-express',
    name: 'FULL EXPRESS SERVICE',
    price: 750,
    description: 'Hair cut + arreglo de barba con Jahzeel Master Barber Bastard Old School. Servicio express de alta calidad.',
    duration: 60,
    bastardOnly: true,
  },
  {
    id: 'bastard-haircut',
    name: 'HAIR CUT con Jahzeel',
    price: 500,
    description: 'Corte de cabello exclusivo con Jahzeel Master Barber Bastard Old School. Técnicas clásicas con el maestro.',
    duration: 60,
    bastardOnly: true,
  },
];

// All services combined (for export)
export const allServices: Service[] = [...generalServices, ...bastardServices];

// Initial State
const initialState: Omit<AppointmentState, keyof {
  setStep: unknown;
  selectBarber: unknown;
  addService: unknown;
  removeService: unknown;
  toggleService: unknown;
  selectDate: unknown;
  selectTime: unknown;
  setCustomerData: unknown;
  setPaymentOption: unknown;
  createAppointment: unknown;
  resetBooking: unknown;
  getAvailableSlots: unknown;
  getTotalPrice: unknown;
  getDepositAmount: unknown;
  getAdminStats: unknown;
  cancelAppointment: unknown;
  updateShopSchedule: unknown;
}> = {
  appointments: [],
  currentStep: 'service',
  selectedBarber: null,
  selectedServices: [],
  selectedDate: null,
  selectedTime: null,
  customerData: {
    name: '',
    phone: '',
    email: '',
    notes: '',
  },
  paymentOption: 'deposit',
  shopSchedule: { openDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], openTime: '09:00', closeTime: '20:00' },
};

// Generate available time slots for a date
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateTimeSlots = (_date: string, _barberId: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 20; // 8 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      // Simulate some slots being unavailable
      const isAvailable = Math.random() > 0.3;
      slots.push({ time, available: isAvailable });
    }
  }
  
  return slots;
};

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  ...initialState,

  // Actions
  setStep: (step) => set({ currentStep: step }),

  selectBarber: (barber) => {
    // If selecting a non-Bastard barber, remove any Bastard-only services
    if (barber && barber.id !== 'bastard') {
      const currentServices = get().selectedServices;
      const filteredServices = currentServices.filter(s => !s.bastardOnly);
      set({ 
        selectedBarber: barber,
        selectedServices: filteredServices,
      });
    } else {
      set({ selectedBarber: barber });
    }
  },

  addService: (service) => set((state) => ({
    selectedServices: [...state.selectedServices, service],
  })),

  removeService: (serviceId) => set((state) => ({
    selectedServices: state.selectedServices.filter(s => s.id !== serviceId),
  })),

  toggleService: (service) => set((state) => {
    const exists = state.selectedServices.find(s => s.id === service.id);
    if (exists) {
      return { selectedServices: state.selectedServices.filter(s => s.id !== service.id) };
    }
    // If adding a Bastard-only service, auto-select Jahzeel
    if (service.bastardOnly) {
      const jahzeel = barbers.find(b => b.id === 'bastard');
      return { 
        selectedServices: [...state.selectedServices, service],
        selectedBarber: jahzeel || state.selectedBarber,
      };
    }
    return { selectedServices: [...state.selectedServices, service] };
  }),

  selectDate: (date) => set({ selectedDate: date }),

  selectTime: (time) => set({ selectedTime: time }),

  setCustomerData: (data) => set((state) => ({
    customerData: { ...state.customerData, ...data },
  })),

  setPaymentOption: (option) => set({ paymentOption: option }),

  getTotalPrice: () => {
    const state = get();
    return state.selectedServices.reduce((sum, s) => sum + s.price, 0);
  },

  getDepositAmount: () => {
    const state = get();
    const total = state.selectedServices.reduce((sum, s) => sum + s.price, 0);
    return Math.round(total * 0.6);
  },

  createAppointment: () => {
    const state = get();
    const servicesToBook = state.selectedServices;
    
    if (servicesToBook.length === 0 || !state.selectedDate || !state.selectedTime) {
      return null;
    }

    // Auto-select Jahzeel if Bastard-only services are selected
    let barber = state.selectedBarber;
    const hasBastardServices = servicesToBook.some(s => s.bastardOnly);
    if (hasBastardServices) {
      barber = barbers.find(b => b.id === 'bastard') || barber;
    }
    if (!barber) return null;
    
    const total = servicesToBook.reduce((sum, s) => sum + s.price, 0);
    const depositAmount = Math.round(total * 0.6);
    
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      barberId: barber.id,
      serviceId: servicesToBook.map(s => s.id).join(','),
      date: state.selectedDate.toISOString().split('T')[0],
      time: state.selectedTime,
      customerName: state.customerData.name,
      customerPhone: state.customerData.phone,
      customerEmail: state.customerData.email,
      notes: state.customerData.notes,
      paymentStatus: state.paymentOption === 'full' ? 'paid' : 'deposit',
      paymentAmount: state.paymentOption === 'full' ? total : depositAmount,
      totalAmount: total,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };
    
    set((state) => ({
      appointments: [...state.appointments, newAppointment],
      currentStep: 'confirmation',
    }));
    
    return newAppointment;
  },

  resetBooking: () => set({
    currentStep: 'service',
    selectedBarber: null,
    selectedServices: [],
    selectedDate: null,
    selectedTime: null,
    customerData: {
      name: '',
      phone: '',
      email: '',
      notes: '',
    },
    paymentOption: 'deposit',
  }),

  getAvailableSlots: (date: string, barberId: string) => {
    return generateTimeSlots(date, barberId);
  },
  
  getAdminStats: () => {
    const state = get();
    const totalAppointments = state.appointments.length;
    const pendingAppointments = state.appointments.filter(a => a.status === 'pending').length;
    const totalRevenue = state.appointments.reduce((sum, a) => sum + a.totalAmount, 0);
    const weeklyRevenue = state.appointments.reduce((sum, a) => sum + a.paymentAmount, 0);
    return { totalAppointments, totalRevenue, pendingAppointments, weeklyRevenue };
  },
  
  cancelAppointment: (id: string) => set((state) => ({
    appointments: state.appointments.filter(a => a.id !== id),
  })),
  
  shopSchedule: { openDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], openTime: '09:00', closeTime: '20:00' },
  
  updateShopSchedule: (schedule) => set((state) => ({ shopSchedule: { ...state.shopSchedule, ...schedule } })),
}));

export default useAppointmentStore;
