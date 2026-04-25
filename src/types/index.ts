// Barber Types
export interface Barber {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image?: string;
  isPremium: boolean;
  priceMultiplier: number;
}

// Service Types
export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: number;
  icon?: string;
}

// Appointment Types
export interface Appointment {
  id: string;
  barberId: string;
  serviceId: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  paymentStatus: 'pending' | 'deposit' | 'paid';
  paymentAmount: number;
  totalAmount: number;
  createdAt: string;
  status: 'confirmed' | 'cancelled' | 'completed';
}

// Time Slot Types
export interface TimeSlot {
  time: string;
  available: boolean;
}

// Day Schedule Types
export interface DaySchedule {
  date: string;
  slots: TimeSlot[];
}

// Blog/Education Types
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image?: string;
  publishedAt: string;
}

// Admin Types
export interface AdminStats {
  totalAppointments: number;
  totalRevenue: number;
  pendingAppointments: number;
  todayAppointments: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
}

export interface BarberSchedule {
  barberId: string;
  workingHours: {
    start: string;
    end: string;
  };
  breaks: {
    start: string;
    end: string;
  }[];
  daysOff: string[];
}

// Booking Flow Types
export type BookingStep = 
  | 'barber'
  | 'service'
  | 'date'
  | 'time'
  | 'details'
  | 'payment'
  | 'confirmation';

export interface BookingState {
  step: BookingStep;
  selectedBarber: Barber | null;
  selectedService: Service | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  customerData: {
    name: string;
    phone: string;
    email: string;
    notes: string;
  };
  paymentOption: 'deposit' | 'full';
}
