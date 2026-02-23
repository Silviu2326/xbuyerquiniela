import { getFlagUrl, FLAG_MAP } from '../data/flags';

// Formatear números con separador de miles
export const formatNumber = (num: number): string => {
  return num.toLocaleString('es-ES');
};

// Obtener iniciales de un nombre
export const getInitials = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Obtener URL de bandera por nombre de país
export const getFlagImage = (country: string, size: number = 40): string => {
  const code = FLAG_MAP[country];
  if (!code) return '';
  return getFlagUrl(code, size);
};

// LocalStorage helpers
export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

export const saveToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};
