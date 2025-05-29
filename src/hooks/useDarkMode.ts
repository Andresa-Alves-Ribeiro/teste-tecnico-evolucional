import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export function useDarkMode() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    // Verifica se o usuário já tem uma preferência salva
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Se não houver tema salvo, usa a preferência do sistema
    if (!savedTheme) {
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        dispatch({ type: 'TOGGLE_DARK_MODE' });
      }
      return;
    }

    // Se houver tema salvo, aplica ele
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      if (!state.isDarkMode) {
        dispatch({ type: 'TOGGLE_DARK_MODE' });
      }
    } else {
      document.documentElement.classList.remove('dark');
      if (state.isDarkMode) {
        dispatch({ type: 'TOGGLE_DARK_MODE' });
      }
    }
  }, [dispatch, state.isDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !state.isDarkMode;
    dispatch({ type: 'SET_DARK_MODE', payload: newMode });
    
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