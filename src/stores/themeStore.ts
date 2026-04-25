import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Paleta de colores por defecto (la actual)
export const defaultColors = {
  // Colores principales
  moss: '#4A6B5A',
  mossLight: '#5A7B6A',
  mossDark: '#3A5B4A',
  
  // Colores de acento
  clay: '#E07A5F',
  clayLight: '#E99A85',
  clayDark: '#C45A3F',
  
  // Colores de fondo
  cream: '#FAF8F3',
  creamDark: '#F2F0E9',
  
  // Colores de texto
  charcoal: '#2D2D2D',
  charcoalDark: '#1A1A1A',
  
  // Colores de estado
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

// Paletas predefinidas
export const presetThemes = {
  default: defaultColors,
  
  // Tema oscuro elegante
  dark: {
    moss: '#2D4A3E',
    mossLight: '#3D5A4E',
    mossDark: '#1D3A2E',
    clay: '#C85A3F',
    clayLight: '#D87A5F',
    clayDark: '#A84A2F',
    cream: '#1A1A1A',
    creamDark: '#0D0D0D',
    charcoal: '#FAF8F3',
    charcoalDark: '#E8E6DF',
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // Tema cálido (tonos tierra)
  warm: {
    moss: '#6B5B4A',
    mossLight: '#7B6B5A',
    mossDark: '#5B4B3A',
    clay: '#D97A5F',
    clayLight: '#E99A7F',
    clayDark: '#B95A3F',
    cream: '#FDF8F0',
    creamDark: '#F5EFE5',
    charcoal: '#3D3530',
    charcoalDark: '#2D2520',
    success: '#65A30D',
    warning: '#D97706',
    error: '#DC2626',
    info: '#0891B2',
  },
  
  // Tema azul marino
  navy: {
    moss: '#2C4A6B',
    mossLight: '#3C5A7B',
    mossDark: '#1C3A5B',
    clay: '#D4A574',
    clayLight: '#E4B584',
    clayDark: '#B48554',
    cream: '#F8FAFC',
    creamDark: '#EEF2F6',
    charcoal: '#1E293B',
    charcoalDark: '#0F172A',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // Tema vintage
  vintage: {
    moss: '#5A4A3A',
    mossLight: '#6A5A4A',
    mossDark: '#4A3A2A',
    clay: '#B85C50',
    clayLight: '#C87C70',
    clayDark: '#984C40',
    cream: '#FAF6F0',
    creamDark: '#F0EAE0',
    charcoal: '#3D3530',
    charcoalDark: '#2D2520',
    success: '#6B8E23',
    warning: '#CD853F',
    error: '#B22222',
    info: '#4682B4',
  },
};

export type ColorTheme = typeof defaultColors;
export type PresetThemeName = keyof typeof presetThemes;

interface ThemeState extends ColorTheme {
  // Nombre del tema actual
  currentThemeName: string;
  
  // Actions
  updateColor: (key: keyof ColorTheme, value: string) => void;
  updateColors: (colors: Partial<ColorTheme>) => void;
  applyPreset: (presetName: PresetThemeName) => void;
  resetToDefault: () => void;
  
  // Helpers
  getCSSVariables: () => Record<string, string>;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      ...defaultColors,
      currentThemeName: 'default',
      
      updateColor: (key, value) => {
        set({ 
          [key]: value,
          currentThemeName: 'custom'
        } as Partial<ThemeState>);
        // Aplicar cambios inmediatamente
        applyThemeToDOM({ ...get(), [key]: value });
      },
      
      updateColors: (colors) => {
        set({ 
          ...colors,
          currentThemeName: 'custom'
        });
        // Aplicar cambios inmediatamente
        applyThemeToDOM({ ...get(), ...colors });
      },
      
      applyPreset: (presetName) => {
        const preset = presetThemes[presetName];
        if (preset) {
          set({ 
            ...preset, 
            currentThemeName: presetName 
          });
          applyThemeToDOM(preset);
        }
      },
      
      resetToDefault: () => {
        set({ 
          ...defaultColors, 
          currentThemeName: 'default' 
        });
        applyThemeToDOM(defaultColors);
      },
      
      getCSSVariables: () => {
        const state = get();
        return {
          '--moss': state.moss,
          '--moss-light': state.mossLight,
          '--moss-dark': state.mossDark,
          '--clay': state.clay,
          '--clay-light': state.clayLight,
          '--clay-dark': state.clayDark,
          '--cream': state.cream,
          '--cream-dark': state.creamDark,
          '--charcoal': state.charcoal,
          '--charcoal-dark': state.charcoalDark,
          '--success': state.success,
          '--warning': state.warning,
          '--error': state.error,
          '--info': state.info,
        };
      },
    }),
    {
      name: 'bastard-theme',
      onRehydrateStorage: () => (state) => {
        // Aplicar tema al cargar la página
        if (state) {
          applyThemeToDOM(state as ColorTheme);
        }
      },
    }
  )
);

// Función para aplicar el tema al DOM
export function applyThemeToDOM(theme: Partial<ColorTheme>) {
  const root = document.documentElement;
  
  if (theme.moss) root.style.setProperty('--moss', theme.moss);
  if (theme.mossLight) root.style.setProperty('--moss-light', theme.mossLight);
  if (theme.mossDark) root.style.setProperty('--moss-dark', theme.mossDark);
  if (theme.clay) root.style.setProperty('--clay', theme.clay);
  if (theme.clayLight) root.style.setProperty('--clay-light', theme.clayLight);
  if (theme.clayDark) root.style.setProperty('--clay-dark', theme.clayDark);
  if (theme.cream) root.style.setProperty('--cream', theme.cream);
  if (theme.creamDark) root.style.setProperty('--cream-dark', theme.creamDark);
  if (theme.charcoal) root.style.setProperty('--charcoal', theme.charcoal);
  if (theme.charcoalDark) root.style.setProperty('--charcoal-dark', theme.charcoalDark);
  if (theme.success) root.style.setProperty('--success', theme.success);
  if (theme.warning) root.style.setProperty('--warning', theme.warning);
  if (theme.error) root.style.setProperty('--error', theme.error);
  if (theme.info) root.style.setProperty('--info', theme.info);
}

// Hook para inicializar el tema
export function useInitializeTheme() {
  const theme = useThemeStore();
  
  return () => {
    applyThemeToDOM(theme);
  };
}
