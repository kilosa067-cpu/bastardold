import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Admin Auth
interface AdminState {
  isLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;

  // Shop Schedule
  schedule: {
    monday: { open: string; close: string; isOpen: boolean };
    tuesday: { open: string; close: string; isOpen: boolean };
    wednesday: { open: string; close: string; isOpen: boolean };
    thursday: { open: string; close: string; isOpen: boolean };
    friday: { open: string; close: string; isOpen: boolean };
    saturday: { open: string; close: string; isOpen: boolean };
    sunday: { open: string; close: string; isOpen: boolean };
  };
  updateSchedule: (day: string, field: 'open' | 'close' | 'isOpen', value: string | boolean) => void;

  // News Management
  news: Array<{
    id: string;
    title: string;
    excerpt: string;
    url: string;
    source: string;
    date: string;
    image?: string;
  }>;
  addNews: (newsItem: Omit<AdminState['news'][0], 'id'>) => void;
  updateNews: (id: string, newsItem: Partial<AdminState['news'][0]>) => void;
  removeNews: (id: string) => void;

  // Video Background
  heroVideoUrl: string;
  setHeroVideoUrl: (url: string) => void;

  // PayPal Config
  paypalConfig: {
    clientId: string;
    enabled: boolean;
  };
  updatePaypalConfig: (config: Partial<AdminState['paypalConfig']>) => void;

  // Email Config
  emailConfig: {
    smtpHost: string;
    smtpPort: string;
    smtpUser: string;
    smtpPass: string;
    notificationEmail: string;
    enabled: boolean;
  };
  updateEmailConfig: (config: Partial<AdminState['emailConfig']>) => void;

  // Contact Info
  contactInfo: {
    phone: string;
    whatsapp: string;
    instagram: string;
    gmail: string;
    mapsUrl: string;
  };
  updateContactInfo: (info: Partial<AdminState['contactInfo']>) => void;
}

const DEFAULT_PASSWORD = 'bastard2024';

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      // Auth
      isLoggedIn: false,
      login: (password) => {
        if (password === DEFAULT_PASSWORD) {
          set({ isLoggedIn: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isLoggedIn: false }),

      // Schedule
      schedule: {
        monday: { open: '09:00', close: '20:00', isOpen: true },
        tuesday: { open: '09:00', close: '20:00', isOpen: true },
        wednesday: { open: '09:00', close: '20:00', isOpen: true },
        thursday: { open: '09:00', close: '20:00', isOpen: true },
        friday: { open: '09:00', close: '20:00', isOpen: true },
        saturday: { open: '09:00', close: '20:00', isOpen: true },
        sunday: { open: '09:00', close: '20:00', isOpen: false },
      },
      updateSchedule: (day, field, value) =>
        set((state) => ({
          schedule: {
            ...state.schedule,
            [day]: { ...state.schedule[day as keyof typeof state.schedule], [field]: value },
          },
        })),

      // News
      news: [
        {
          id: '1',
          title: 'Bastard, el peluquero de Oaxaca catalogado entre los mejores del mundo',
          excerpt: 'Jahzeel Macias Salazar, mejor conocido como "Bastard", ha sido reconocido internacionalmente por su estilo unico y su contribucion a la cultura barbera.',
          url: 'https://www.nvinoticias.com/oaxaca/general/bastard-el-peluquero-de-oaxaca-catalogado-entre-los-mejores-del-mundo/150499',
          source: 'NVI Noticias',
          date: '2024-01-15',
          image: '/images/bastard.jpg',
        },
      ],
      addNews: (newsItem) =>
        set((state) => ({
          news: [{ ...newsItem, id: `news-${Date.now()}` }, ...state.news],
        })),
      updateNews: (id, newsItem) =>
        set((state) => ({
          news: state.news.map((n) => (n.id === id ? { ...n, ...newsItem } : n)),
        })),
      removeNews: (id) =>
        set((state) => ({
          news: state.news.filter((n) => n.id !== id),
        })),

      // Video
      heroVideoUrl: '/videos/hero-video.mp4',
      setHeroVideoUrl: (url) => set({ heroVideoUrl: url }),

      // PayPal
      paypalConfig: {
        clientId: '',
        enabled: false,
      },
      updatePaypalConfig: (config) =>
        set((state) => ({
          paypalConfig: { ...state.paypalConfig, ...config },
        })),

      // Email
      emailConfig: {
        smtpHost: '',
        smtpPort: '587',
        smtpUser: '',
        smtpPass: '',
        notificationEmail: 'jahzeelbarberclassic@gmail.com',
        enabled: false,
      },
      updateEmailConfig: (config) =>
        set((state) => ({
          emailConfig: { ...state.emailConfig, ...config },
        })),

      // Contact
      contactInfo: {
        phone: '951 422 2457',
        whatsapp: '529514222457',
        instagram: 'https://www.instagram.com/bastardoldschool?igsh=MW5teDVmM3MyYnR2ag==',
        gmail: 'jahzeelbarberclassic@gmail.com',
        mapsUrl: 'https://share.google/Am8SUKjLlmSundmzr',
      },
      updateContactInfo: (info) =>
        set((state) => ({
          contactInfo: { ...state.contactInfo, ...info },
        })),
    }),
    {
      name: 'bastard-admin',
    }
  )
);
