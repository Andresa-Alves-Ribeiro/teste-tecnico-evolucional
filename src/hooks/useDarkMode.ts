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
    dispatch({ type: 'TOGGLE_DARK_MODE' });
    if (state.isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return {
    isDarkMode: state.isDarkMode,
    toggleDarkMode,
  };
} 