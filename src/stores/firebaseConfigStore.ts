import { create } from 'zustand';

// Tipos
export interface BarberConfig {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image: string;
  isPremium: boolean;
  priceMultiplier: number;
  order?: number;
}

export interface ServiceConfig {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: number;
  icon: string;
  image?: string;
  order?: number;
}

export interface SeminarioConfig {
  id: string;
  title: string;
  description: string;
  image: string;
  date?: string;
  price?: number;
}

export interface HeroConfig {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  backgroundImage: string;
}

export interface HistoriaConfig {
  title: string;
  quote: string;
  paragraphs: string[];
  image: string;
  year: string;
  location: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  source: string;
  date: string;
  image?: string;
}

export interface SiteConfig {
  hero: HeroConfig;
  historia: HistoriaConfig;
  contact: {
    phone: string;
    email: string;
    address: string;
    instagram: string;
    whatsapp: string;
    locationUrl: string;
  };
  shopSchedule: {
    openTime: string;
    closeTime: string;
    daysOpen: number[];
  };
}

// Configuración por defecto
const defaultConfig: SiteConfig = {
  hero: {
    title: 'Barbería no es moda. Es ritual.',
    subtitle: 'Tradición clásica. Precisión moderna. Agenda digital sin fricción.',
    ctaPrimary: 'Agendar Cita',
    ctaSecondary: 'Conoce la Historia',
    backgroundImage: '/images/entrada.jpg',
  },
  historia: {
    title: 'La historia de Bastard',
    quote: '"SOMOS AMANTES DE LA CULTURA CLÁSICA, de la buena imagen y del vestir"',
    paragraphs: [
      'Es una marca personal dedicada a la preservación de los valores reales de la barbería tradicional y corte clásico (años 20\'s a finales de los 50\'s).',
      'Creada el 25 de Julio del 2014 en la ciudad de Oaxaca, México por Jahzeel Macias Salazar a.k.a. Bastard.',
      'Nace como una sátira o despectivo social a los grupos sociales de "etiqueta". Bastard es un ser y actitud única.',
    ],
    image: '/images/bastard.jpg',
    year: '2014',
    location: 'Oaxaca, México',
  },
  contact: {
    phone: '+52 951 123 4567',
    email: 'hola@bastardoldschool.com',
    address: 'Oaxaca de Juárez, Oaxaca, México',
    instagram: 'https://www.instagram.com/bastardoldschool/',
    whatsapp: 'https://wa.me/5219511234567',
    locationUrl: 'https://share.google/dV49v5RQN3UvxQhN6',
  },
  shopSchedule: {
    openTime: '09:00',
    closeTime: '20:00',
    daysOpen: [1, 2, 3, 4, 5, 6],
  },
};

interface FirebaseConfigState {
  // Auth
  user: { email: string | null; uid: string; displayName: string | null } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Data
  config: SiteConfig;
  barbers: BarberConfig[];
  services: ServiceConfig[];
  seminarios: SeminarioConfig[];
  news: NewsItem[];
  
  // Actions - Auth
  initializeAuth: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  
  // Actions - Config
  loadConfig: () => Promise<void>;
  updateHero: (hero: Partial<HeroConfig>) => Promise<void>;
  updateHistoria: (historia: Partial<HistoriaConfig>) => Promise<void>;
  updateContact: (contact: Partial<SiteConfig['contact']>) => Promise<void>;
  updateShopSchedule: (schedule: Partial<SiteConfig['shopSchedule']>) => Promise<void>;
  
  // Actions - Barbers
  loadBarbers: () => Promise<void>;
  addBarber: (barber: Omit<BarberConfig, 'id'>) => Promise<void>;
  updateBarber: (id: string, barber: Partial<BarberConfig>) => Promise<void>;
  removeBarber: (id: string) => Promise<void>;
  uploadBarberImage: (barberId: string, file: File) => Promise<string | null>;
  
  // Actions - Services
  loadServices: () => Promise<void>;
  addService: (service: Omit<ServiceConfig, 'id'>) => Promise<void>;
  updateService: (id: string, service: Partial<ServiceConfig>) => Promise<void>;
  removeService: (id: string) => Promise<void>;
  uploadServiceImage: (serviceId: string, file: File) => Promise<string | null>;
  
  // Actions - Seminarios
  loadSeminarios: () => Promise<void>;
  addSeminario: (seminario: Omit<SeminarioConfig, 'id'>) => Promise<void>;
  updateSeminario: (id: string, seminario: Partial<SeminarioConfig>) => Promise<void>;
  removeSeminario: (id: string) => Promise<void>;
  uploadSeminarioImage: (seminarioId: string, file: File) => Promise<string | null>;
}

// Mock Firebase functions (offline mode)
const mockAuthChange = (callback: (user: any) => void) => {
  setTimeout(() => callback(null), 100);
};

const mockLogin = async (_email: string, _password: string) => {
  return { success: false, error: 'Firebase no configurado - modo offline' } as { success: boolean; error?: string; user?: any };
};

const mockLogout = async () => {};

export const useFirebaseConfigStore = create<FirebaseConfigState>((set, get) => ({
  // Auth
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  // Data
  config: defaultConfig,
  barbers: [],
  services: [],
  seminarios: [],
  news: [],
  
  // Initialize Auth
  initializeAuth: () => {
    try {
      mockAuthChange((user) => {
        set({ user, isAuthenticated: !!user, isLoading: false });
      });
    } catch {
      set({ isLoading: false });
    }
  },
  
  // Login
  login: async (email, password): Promise<{ success: boolean; error?: string }> => {
    const result = await mockLogin(email, password);
    if (result.success) {
      set({ user: result.user, isAuthenticated: true });
      return { success: true };
    }
    return { success: false, error: result.error };
  },
  
  // Logout
  logout: async () => {
    await mockLogout();
    set({ user: null, isAuthenticated: false });
  },
  
  // Load Config
  loadConfig: async () => {
    set({ config: defaultConfig });
  },
  
  // Update Hero
  updateHero: async (hero) => {
    const { config } = get();
    const newConfig = { ...config, hero: { ...config.hero, ...hero } };
    set({ config: newConfig });
  },
  
  // Update Historia
  updateHistoria: async (historia) => {
    const { config } = get();
    const newConfig = { ...config, historia: { ...config.historia, ...historia } };
    set({ config: newConfig });
  },
  
  // Update Contact
  updateContact: async (contact) => {
    const { config } = get();
    const newConfig = { ...config, contact: { ...config.contact, ...contact } };
    set({ config: newConfig });
  },
  
  // Update Shop Schedule
  updateShopSchedule: async (schedule) => {
    const { config } = get();
    const newConfig = { ...config, shopSchedule: { ...config.shopSchedule, ...schedule } };
    set({ config: newConfig });
  },
  
  // Load Barbers
  loadBarbers: async () => {
    set({ barbers: [] });
  },
  
  // Add Barber
  addBarber: async (_barber) => {},
  
  // Update Barber
  updateBarber: async (_id, _barber) => {},
  
  // Remove Barber
  removeBarber: async (_id) => {},
  
  // Upload Barber Image
  uploadBarberImage: async (_barberId, _file): Promise<string | null> => {
    return null;
  },
  
  // Load Services
  loadServices: async () => {
    set({ services: [] });
  },
  
  // Add Service
  addService: async (_service) => {},
  
  // Update Service
  updateService: async (_id, _service) => {},
  
  // Remove Service
  removeService: async (_id) => {},
  
  // Upload Service Image
  uploadServiceImage: async (_serviceId, _file): Promise<string | null> => {
    return null;
  },
  
  // Load Seminarios
  loadSeminarios: async () => {
    set({ seminarios: [] });
  },
  
  // Add Seminario
  addSeminario: async (_seminario) => {},
  
  // Update Seminario
  updateSeminario: async (_id, _seminario) => {},
  
  // Remove Seminario
  removeSeminario: async (_id) => {},
  
  // Upload Seminario Image
  uploadSeminarioImage: async (_seminarioId, _file): Promise<string | null> => {
    return null;
  },
}));
