import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export function useDarkMode() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    // Verifica se o usuário já tem uma preferência salva
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      dispatch({ type: 'TOGGLE_DARK_MODE' });
    }
  }, [dispatch]);

  const toggleDarkMode = () => {
    const newMode = !state.isDarkMode;
    dispatch({ type: 'TOGGLE_DARK_MODE' });
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return {
    isDarkMode: state.isDarkMode,
    toggleDarkMode,
  };
} 