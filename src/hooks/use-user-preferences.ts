import { useState, useEffect } from 'react';

export interface UserPreferences {
  currency: 'MXN' | 'USD';
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  compactView: boolean;
}

const DEFAULT_PREFS: UserPreferences = {
  currency: 'MXN',
  theme: 'system',
  notifications: true,
  compactView: false,
};

const STORAGE_KEY = 'afortu_user_preferences';

/**
 * Hook para manejar preferencias del usuario almacenadas en localStorage
 */
export function useUserPreferences() {
  const [prefs, setPrefs] = useState<UserPreferences>(DEFAULT_PREFS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPrefs({ ...DEFAULT_PREFS, ...JSON.parse(stored) });
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const update = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    const updated = { ...prefs, [key]: value };
    setPrefs(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving user preferences:', error);
    }
  };

  const reset = () => {
    setPrefs(DEFAULT_PREFS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error resetting user preferences:', error);
    }
  };

  return {
    prefs,
    update,
    reset,
    isLoaded,
  };
}
