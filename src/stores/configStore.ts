import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Tipos para la configuración
export interface BarberConfig {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image: string;
  isPremium: boolean;
  priceMultiplier: number;
}

export interface ServiceConfig {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: number;
  icon: string;
  image?: string;
}

export interface SeminarioConfig {
  id: string;
  title: string;
  description: string;
  image?: string;
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
  // Hero
  hero: HeroConfig;
  
  // Historia
  historia: HistoriaConfig;
  
  // Barberos
  barbers: BarberConfig[];
  
  // Servicios
  services: ServiceConfig[];
  
  // Noticias
  news: NewsItem[];
  
  // Seminarios
  seminarios: SeminarioConfig[];
  
  // Contacto
  contact: {
    phone: string;
    email: string;
    address: string;
    instagram: string;
    whatsapp: string;
    locationUrl: string;
  };
  
  // Notificaciones
  notifications: {
    emailEnabled: boolean;
    reminderHours: number;
    smtpConfig?: {
      host: string;
      port: number;
      user: string;
      pass: string;
    };
  };
}

// Configuración inicial por defecto
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
    quote: 'Somos amantes de la cultura clásica, de la buena imagen y del vestir.',
    paragraphs: [
      'Bastard Old School es una marca personal dedicada a la preservación de los valores auténticos de la barbería tradicional y el corte clásico —desde los años 20 hasta finales de los 50— adaptados a la identidad e imagen del caballero contemporáneo. El cabello y el vello facial son nuestra máxima expresión de masculinidad.',
      'Fundada el 25 de julio de 2014 en Oaxaca, México, por Jahzeel Macías Salazar, conocido artísticamente como Bastard.',
      'El nombre nace como una sátira social hacia los grupos de "etiqueta". Bastard representa un ser y una actitud única: ser auténtico, sin estereotipos, sin dogmas. Un concepto autogestivo que ha revolucionado la cultura barbera en la ciudad.',
    ],
    image: '/images/bastard.jpg',
    year: '2014',
    location: 'Oaxaca, México',
  },
  
  barbers: [
    {
      id: 'bastard',
      name: 'Jahzeel',
      specialty: 'Master Barber Old School',
      bio: 'Jahzeel a.k.a. Bastard Old School Master Barber con más de 13 años de experiencia y 10 años como educador global y plataformista profesional, originario de la Cd. de Oaxaca de Juárez, México. Con formación académica en Europa en el oficio de la peluquería, especializado en técnicas clásicas en corte de cabello de caballero y ritual de afeitado. Fundador y Creador de Bastard Old School. Considerado uno de los mejores Barberos Clásicos en todo el Mundo. Desarrollando su propio método y estilo, preservando la cuna de la barbería clásica, sus valores y filosofía. Creativo visual, Músico y amante de la Pintura. "La silla no hace al barbero, el espejo y las sonrisas nunca mienten".',
      image: '/images/bastard.jpg',
      isPremium: false,
      priceMultiplier: 1,
    },
    {
      id: 'kylian',
      name: 'Kylian Ruiz L.',
      specialty: 'Nueva generación de la barbería oaxaqueña',
      bio: 'Con más de 3 años de experiencia, Kylian Ruiz, originario de Santa María del Tule, representa una nueva generación dentro de la barbería oaxaqueña.',
      image: '/images/kilo.jpg',
      isPremium: false,
      priceMultiplier: 1,
    },
    {
      id: 'fernando',
      name: 'Fernando Córdova Jahzeel',
      specialty: 'Técnica moderna con visión internacional',
      bio: 'Barbero originario de Oaxaca de Juárez, con una trayectoria de 7 años en el oficio. Parte de su formación y experiencia se desarrolló en Cancún, donde perfeccionó su técnica y amplió su visión dentro de la barbería moderna.',
      image: '/images/fer.jpg',
      isPremium: false,
      priceMultiplier: 1,
    },
  ],
  
  services: [
    {
      id: 'creative-mayhem-cut',
      name: 'CREATIVE AND MAYHEM CUT',
      price: 350,
      description: 'Formas asimétricas, creación de movimiento sobre la textura natural del cabello, a través de capas, escalonamientos over layers, over direction, DESCONEXIONES. Uso de pointings and deep, slides, free razor, texturas profundas, twins cut. Diagramas squares, triángulos o redondos: Shaggys, Moods, wolfs, croops, mullets, punks, pixies, texture bobs. Se crea armonía entre formas desiguales, técnicas mixtas de corte y herramientas.',
      duration: 60,
      icon: 'Scissors',
    },
    {
      id: 'savage-junior-cut',
      name: 'SAVAGE JUNIOR CUT',
      price: 300,
      description: 'Arreglo de contornos super delineados o desvanecidos sutiles, acabados naturales formales o creativos en tendencia y ajuste regular en largo.',
      duration: 40,
      icon: 'Scissors',
    },
    {
      id: 'afro-curly-hair',
      name: 'AFRO AND CURLY HAIR',
      price: 360,
      description: 'Método curly and american black hair, rebajado hecho a mano con tijeras o máquina, con fades y taper de ultra precisión en seco, aplicación de productos especiales para cabello rizado o afro. Método base clippers o guardas.',
      duration: 60,
      icon: 'User',
    },
    {
      id: 'military-cut',
      name: 'MILITARY CUT',
      price: 300,
      description: 'Rasurados super finos con navaja, trimmers o shaver muy milimétricos, acabados perfectos para buzz cuts, flat tops (corte mesa). Pueden tener un look totalmente con máquinas o reducir la parte superior frontal y cúspide con tijera haciendo una reducción muy corta o mediana. En caso de llevar rasurado con navaja libre en la nuca y laterales se aplica una toalla caliente, crema y loción after shave.',
      duration: 50,
      icon: 'TrendingUp',
    },
    {
      id: 'modern-cut',
      name: 'MODERN CUT',
      price: 370,
      description: 'Aplicación de técnicas modernas en fades y taper con formas geométricas clásicas, toques en movimiento como capas o desconexiones, generando volúmenes profundos y naturales, acabados orgánicos y sustentables, dejando el cabello en su estado natural. Se caracteriza por usar lociones bifásicas, tónicos ligeros de fijación, sea salt, dejando un look manejable o pomadas base agua o cera de abeja para darle un look más fuerte. Las técnicas de corte son mixtas.',
      duration: 60,
      icon: 'Sparkles',
    },
    {
      id: 'regular-cut-executive',
      name: 'REGULAR CUT EXECUTIVE CONTOUR',
      price: 350,
      description: 'Rebajado de laterales y nuca media o baja con tijeras o clipper over comb finalizado con contornos super finos y exactos milimétricos de menor a mayor densidad sin tocar la piel, hechura de las patillas, ajuste de cejas. Se caracteriza por llevar elegancia y un look conservador.',
      duration: 45,
      icon: 'Award',
    },
    {
      id: 'long-hair',
      name: 'LONG HAIR',
      price: 450,
      description: 'Cabelleras largas pasando los hombros o más, ajuste y limpieza de puntas o creación de formas geométricas en capas, texturizados o extra movimiento, uso de hidratantes, mascarillas y productos para su estilizado, creación de siluetas sin reducir el largo o hechuras de flequillos.',
      duration: 60,
      icon: 'RefreshCw',
    },
    {
      id: 'afeitado-tradicional',
      name: 'AFEITADO TRADICIONAL CLASSIC HOT TOWELS AND SPECIAL FOAM',
      price: 450,
      description: 'Ritual dedicado al rasurado clásico de los años 20s, cuidado de la piel y relajación del caballero. Combinado con técnicas exclusivas globales italianas, inglesas y japonesas con un toque distintivo mexicano. Puede ser un rasurado doble completo o parcial, afeitando los bordes o contornos de la barba o forma deseada, arreglo milimétrico de barba, bigote y cejas a mano alzada con tijeras, face de hidratación de piel con cremas importadas antes del rasurado y humectación restauradora después con sustancias especiales y esencias naturales romero, madera, menta especiada. Aplicación de espuma artesanal, con dos toallas calientes, finalizando con masaje facial con lociones y after shave.',
      duration: 40,
      icon: 'Flame',
    },
    {
      id: 'express-cold-bear',
      name: 'EXPRESS COLD BEAR TRIM',
      price: 300,
      description: 'Aplicación de cremas y lociones frescas cítricas con espuma fría o gel, procedimiento semi húmedo con sensaciones frescas o totalmente en seco. Detalles con navaja libre con talco para acabados en contornos exactos, se utilizan clippers especiales para el rebajado, disminución o quitar completamente la barba y bigote o creación de formas. Formato express de alta calidad en seco.',
      duration: 25,
      icon: 'Flame',
    },
    {
      id: 'hair-afeitado-hot',
      name: 'HAIR CUT / AFEITADO TRADICIONAL CLASSIC HOT TOWELS AND SPECIAL FOAM',
      price: 650,
      description: 'TOTAL clean HOT CLASSIC grooming. Corte de cabello + afeitado tradicional completo con toallas calientes y espuma artesanal.',
      duration: 70,
      icon: 'Flame',
    },
    {
      id: 'hair-express-cold',
      name: 'HAIR CUT / EXPRESS COLD BEAR TRIM',
      price: 480,
      description: 'TOTAL clean COLD grooming. Corte de cabello + arreglo express de barba en seco con productos frescos.',
      duration: 60,
      icon: 'Flame',
    },
    {
      id: 'bastard-full-old',
      name: 'FULL OLD FASHIONED SERVICE con Jahzeel Master Barber Bastard Old School',
      price: 950,
      description: 'Hair cut + afeitado tradicional completo con Jahzeel Master Barber Bastard Old School. La experiencia clásica definitiva.',
      duration: 70,
      icon: 'Flame',
    },
    {
      id: 'bastard-full-express',
      name: 'FULL EXPRESS SERVICE con Jahzeel Master Barber Bastard Old School',
      price: 750,
      description: 'Hair cut + arreglo de barba con Jahzeel Master Barber Bastard Old School. Servicio express de alta calidad.',
      duration: 60,
      icon: 'Flame',
    },
    {
      id: 'bastard-haircut',
      name: 'HAIR CUT con Jahzeel Master Barber Bastard Old School',
      price: 500,
      description: 'Corte de cabello exclusivo con Jahzeel Master Barber Bastard Old School. Técnicas clásicas con el maestro.',
      duration: 60,
      icon: 'Scissors',
    },
  ],
  
  news: [
    {
      id: '1',
      title: 'Bastard, el peluquero de Oaxaca catalogado entre los mejores del mundo',
      excerpt: 'Jahzeel Macías Salazar, mejor conocido como "Bastard", ha sido reconocido internacionalmente por su estilo único y su contribución a la cultura barbera.',
      url: 'https://www.nvinoticias.com/oaxaca/general/bastard-el-peluquero-de-oaxaca-catalogado-entre-los-mejores-del-mundo/150499',
      source: 'NVI Noticias',
      date: '2024-01-15',
      image: '/images/bastard.jpg',
    },
    {
      id: '2',
      title: 'Workshop de Barbería Old School',
      excerpt: 'Únete a nuestro próximo workshop donde aprenderás las técnicas clásicas de la barbería tradicional directamente de los mejores.',
      url: '#',
      source: 'Bastard Old School',
      date: '2024-12-20',
      image: '/images/noticia1.jpg',
    },
    {
      id: '3',
      title: 'Nueva colección de cortes 2024',
      excerpt: 'Descubre los estilos más solicitados este año y encuentra el look perfecto para ti.',
      url: '#',
      source: 'Bastard Old School',
      date: '2024-11-10',
      image: '/images/noticia2.jpg',
    },
  ],
  
  seminarios: [
    {
      id: '1',
      title: 'Master Class: Fade de Precisión',
      description: 'Aprende las técnicas avanzadas de fade con Bastard. Desde los fundamentos hasta los detalles que marcan la diferencia. Incluye práctica en modelos reales.',
      date: 'Próximamente',
      price: 2500,
    },
  ],
  
  contact: {
    phone: '+52 951 123 4567',
    email: 'hola@bastardoldschool.com',
    address: 'Oaxaca de Juárez, Oaxaca, México',
    instagram: 'https://www.instagram.com/bastardoldschool/',
    whatsapp: 'https://wa.me/529511234567',
    locationUrl: 'https://share.google/dV49v5RQN3UvxQhN6',
  },
  
  notifications: {
    emailEnabled: false,
    reminderHours: 24,
  },
};

interface ConfigState extends SiteConfig {
  // Actions
  updateHero: (hero: Partial<HeroConfig>) => void;
  updateHistoria: (historia: Partial<HistoriaConfig>) => void;
  updateBarber: (id: string, barber: Partial<BarberConfig>) => void;
  addBarber: (barber: BarberConfig) => void;
  removeBarber: (id: string) => void;
  updateService: (id: string, service: Partial<ServiceConfig>) => void;
  addService: (service: ServiceConfig) => void;
  removeService: (id: string) => void;
  updateContact: (contact: Partial<SiteConfig['contact']>) => void;
  addNews: (news: NewsItem) => void;
  removeNews: (id: string) => void;
  addSeminario: (seminario: SeminarioConfig) => void;
  updateSeminario: (id: string, seminario: Partial<SeminarioConfig>) => void;
  removeSeminario: (id: string) => void;
  updateNotifications: (notifications: Partial<SiteConfig['notifications']>) => void;
  resetToDefaults: () => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      ...defaultConfig,
      
      updateHero: (hero) => set((state) => ({ 
        hero: { ...state.hero, ...hero } 
      })),
      
      updateHistoria: (historia) => set((state) => ({ 
        historia: { ...state.historia, ...historia } 
      })),
      
      updateBarber: (id, barber) => set((state) => ({
        barbers: state.barbers.map(b => b.id === id ? { ...b, ...barber } : b)
      })),
      
      addBarber: (barber) => set((state) => ({
        barbers: [...state.barbers, barber]
      })),
      
      removeBarber: (id) => set((state) => ({
        barbers: state.barbers.filter(b => b.id !== id)
      })),
      
      updateService: (id, service) => set((state) => ({
        services: state.services.map(s => s.id === id ? { ...s, ...service } : s)
      })),
      
      addService: (service) => set((state) => ({
        services: [...state.services, service]
      })),
      
      removeService: (id) => set((state) => ({
        services: state.services.filter(s => s.id !== id)
      })),
      
      updateContact: (contact) => set((state) => ({
        contact: { ...state.contact, ...contact }
      })),
      
      addNews: (news) => set((state) => ({
        news: [news, ...state.news]
      })),
      
      removeNews: (id) => set((state) => ({
        news: state.news.filter(n => n.id !== id)
      })),
      
      addSeminario: (seminario) => set((state) => ({
        seminarios: [...state.seminarios, seminario]
      })),
      
      updateSeminario: (id, seminario) => set((state) => ({
        seminarios: state.seminarios.map(s => s.id === id ? { ...s, ...seminario } : s)
      })),
      
      removeSeminario: (id) => set((state) => ({
        seminarios: state.seminarios.filter(s => s.id !== id)
      })),
      
      updateNotifications: (notifications) => set((state) => ({
        notifications: { ...state.notifications, ...notifications }
      })),
      
      resetToDefaults: () => set(defaultConfig),
    }),
    {
      name: 'bastard-config',
    }
  )
);

// Exportar configuración por defecto para referencia
export { defaultConfig };
