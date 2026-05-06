import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Paleta de colores por defecto (blanco, verde, rojo)
export const defaultColors = {
  // Colores principales (verde)
  moss: '#2D5A27',
  mossLight: '#4A7A3A',
  mossDark: '#1B3A16',
  
  // Colores de acento (rojo)
  clay: '#CE1126',
  clayLight: '#E03A4A',
  clayDark: '#A00D1E',
  
  // Colores de fondo (blanco)
  cream: '#FAFAFA',
  creamDark: '#F2F2F2',
  
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
        applyThemeToDOM({ ...get(), [key]: value });
      },
      
      updateColors: (colors) => {
        set({ 
          ...colors,
          currentThemeName: 'custom'
        });
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
