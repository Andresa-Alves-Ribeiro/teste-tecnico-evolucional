import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export function useDarkMode() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (savedTheme) {
        const isDark = savedTheme === 'dark';
        document.documentElement.classList.toggle('dark', isDark);
        dispatch({ type: 'SET_DARK_MODE', payload: isDark });
        return;
      }

      const isDark = prefersDark;
      document.documentElement.classList.toggle('dark', isDark);
      dispatch({ type: 'SET_DARK_MODE', payload: isDark });
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    initializeTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const isDark = e.matches;
        document.documentElement.classList.toggle('dark', isDark);
        dispatch({ type: 'SET_DARK_MODE', payload: isDark });
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [dispatch]);

  const toggleDarkMode = () => {
    const newMode = !state.isDarkMode;
    dispatch({ type: 'SET_DARK_MODE', payload: newMode });
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return {
    isDarkMode: state.isDarkMode,
    toggleDarkMode,
  };
} 