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
    title: 'Traditional Barber, No Bullcrap',
    subtitle: 'Traditional Barber, No Bullcrap',
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
      name: 'Jahzeel Macías Salazar',
      specialty: 'Master Barber Old School',
      bio: 'Jahzeel a.k.a. Bastard Old School Master Barber, con más de 13 años de experiencia y 10 años como educador global y plataformista profesional, originario de la ciudad de Oaxaca de Juárez, México. Con formación académica en Europa en el oficio de la peluquería, especializado en técnicas clásicas de corte de caballero y ritual de afeitado. Fundador y creador de Bastard Old School. Considerado uno de los mejores barberos clásicos del mundo, ha desarrollado su propio método y estilo, preservando la esencia de la barbería clásica, sus valores y filosofía. Creativo visual, músico y amante de la pintura. "La silla no hace al barbero, el espejo y las sonrisas nunca mienten".',
      image: '/images/bastard.jpg',
      isPremium: true,
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
      name: 'Fernando Córdova',
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
      description: 'Arreglo de contornos súper delineados o desvanecidos sutiles. Acabados naturales, formales o creativos en tendencia, y ajuste regular en largo.',
      duration: 40,
      icon: 'Scissors',
    },
    {
      id: 'afro-curly-hair',
      name: 'AFRO AND CURLY HAIR',
      price: 360,
      description: 'Método curly y American black hair. Rebajado hecho a mano con tijeras o máquina, con fades y taper de alta precisión en seco. Aplicación de productos especiales para cabello rizado o afro. Método base con clippers o guardas.',
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
      description: 'Aplicación de técnicas modernas en fades y taper con formas geométricas clásicas. Toques en movimiento como capas o desconexiones, generando volúmenes profundos y naturales, con acabados orgánicos y sustentables, dejando el cabello en su estado natural. Se caracteriza por el uso de lociones bifásicas, tónicos ligeros de fijación, sea salt, logrando un look manejable, o pomadas base agua o cera de abeja para un acabado más fuerte. Las técnicas de corte son mixtas.',
      duration: 60,
      icon: 'Sparkles',
    },
    {
      id: 'regular-cut-executive',
      name: 'REGULAR CUT EXECUTIVE CONTOUR',
      price: 350,
      description: 'Rebajado de laterales y nuca media o baja con tijeras o clipper over comb, finalizado con contornos súper finos y exactos, milimétricos, de menor a mayor densidad sin tocar la piel. Hechura de patillas y ajuste de cejas. Se caracteriza por elegancia y un look conservador.',
      duration: 45,
      icon: 'Award',
    },
    {
      id: 'long-hair',
      name: 'LONG HAIR',
      price: 450,
      description: 'Cabelleras largas (pasando los hombros o más). Ajuste y limpieza de puntas o creación de formas geométricas en capas, texturizados o mayor movimiento. Uso de hidratantes, mascarillas y productos para estilizado. Creación de siluetas sin reducir el largo o elaboración de flequillos.',
      duration: 60,
      icon: 'RefreshCw',
    },
    {
      id: 'afeitado-tradicional',
      name: 'AFEITADO TRADICIONAL CLASSIC HOT TOWELS AND SPECIAL FOAM',
      price: 450,
      description: 'Ritual dedicado al rasurado clásico de los años 20\'s, enfocado en el cuidado de la piel y la relajación. Combinado con técnicas exclusivas globales italianas, inglesas y japonesas, con un toque distintivo mexicano. Puede ser un rasurado doble completo o parcial, afeitando bordes o contornos de barba o forma deseada. Arreglo milimétrico de barba, bigote y cejas a mano alzada con tijeras. Fase de hidratación de piel (con cremas importadas) antes del rasurado y humectación restauradora después con sustancias especiales y esencias naturales como romero, madera y menta especiada. Aplicación de espuma artesanal, dos toallas calientes y finalización con masaje facial y after shave. Sin duda, una especialidad de la casa.',
      duration: 40,
      icon: 'Flame',
    },
    {
      id: 'express-cold-bear',
      name: 'EXPRESS COLD BEAR TRIM',
      price: 300,
      description: 'Aplicación de cremas y lociones frescas cítricas con espuma fría o gel. Procedimiento semi húmedo con sensaciones frescas o totalmente en seco. Detalles con navaja libre y talco para contornos exactos. Uso de clippers especiales para rebajar, disminuir o eliminar completamente barba y bigote, o crear formas. Formato express de alta calidad.',
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
      id: 'classic-cut-ultra-fino',
      name: 'CLASSIC CUT ULTRA FINO',
      price: 370,
      description: 'Especialidad de la casa. Corte altamente preciso y formas simétricas hechas a mano, con técnicas de comb over con tijera o máquina. Método técnico de los años 20 a los 50, experiencia única inspirada en la cultura clásica. Texturizado en seco, aplicación de lociones, tonic grooming, secado profesional y alto peinado. Asesoramiento previo al servicio y aplicación de productos dependiendo del estilo y tipo de cabello. Puedes elegir un rebajado de laterales pulido o combinarlo con fades o tapers de alta precisión, con Pompadours, Slick Backs, Side Parts, Duck Tails, Jelly Rolls, Flat Top Boogies. Look atemporal contemporáneo.',
      duration: 60,
      icon: 'Scissors',
    },
    {
      id: 'only-fade-taper',
      name: 'ONLY Fade o Taper de Alta Precisión - Skin and Razor',
      price: 350,
      description: 'Adaptación de forma y altura dependiendo de los huesos craneales y formas superiores. Puedes elegir ángulos rectos modernos de 90 grados o clásicos con peso con ángulos de 45 grados, en alturas altas, medias o bajas. El método puede variar en seco o húmedo dependiendo del tipo y densidad del cabello. Transiciones de sombras y blancos rectas, curvas o diagonales. Pulido a mano libre con tijeras. Uso de máquinas profesionales. Terminaciones de rasurado con shavers o navaja libre (aplicación de toalla caliente, crema y loción after shave). Servicio de rasurado altamente pegado a la piel.',
      duration: 45,
      icon: 'TrendingUp',
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
  ],
  
  seminarios: [
    {
      id: '1',
      title: 'SEMINARIO VISUAL EDUCATIVO LOOK AND LEARN (Diploma Oficial)',
      description: '1 día con Jahzeel Master Barber Bastard Old School. 2 cortes visuales: aprendizaje teórico y práctico de técnicas clásicas. Incluye un modelo práctico. Diploma oficial.',
      date: 'Consultar fechas',
      price: 6000,
    },
    {
      id: '2',
      title: 'TALLER TEÓRICO PRÁCTICO WORKSHOP (Certificado Oficial)',
      description: '3 días con Jahzeel Master Barber Bastard Old School. Día 1: Look and Learn — 1 corte realizado por Jahzeel. Día 2: Workshop guiado — 2 cortes paso a paso (modelos o maniquí). Día 3: Evaluación — 1 corte en tiempo real. Incluye modelo. Certificado oficial.',
      date: 'Consultar fechas',
      price: 13000,
    },
    {
      id: '3',
      title: '1 SEMANA FULL TÉCNICAS (Constancia + Certificado Oficial)',
      description: '6 días con Jahzeel Master Barber Bastard Old School. Práctica full time durante 6 días. Incluye modelos. Constancia oficial de horas. Diploma oficial de curso completo. Certificado oficial de dominio de técnicas y método.',
      date: 'Consultar fechas',
      price: 19000,
    },
  ],
  
  contact: {
    phone: '+52 951 422 2457',
    email: 'jahzeelbarberclassic@gmail.com',
    address: 'Oaxaca de Juárez, Oaxaca, México',
    instagram: 'https://www.instagram.com/bastardoldschool?igsh=MW5teDVmM3MyYnR2ag==',
    whatsapp: 'https://wa.me/529514222457',
    locationUrl: 'https://share.google/Am8SUKjLlmSundmzr',
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

// Exportar configuración por defecto para refeiguración por defecto para referencia
export { defaultConfig };
