import { createTheme, ThemeOptions } from '@mui/material/styles';

const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
    },
    secondary: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    background: {
      default: mode === 'dark' ? '#111827' : '#FFFFFF',
      paper: mode === 'dark' ? '#1F2937' : '#FFFFFF',
    },
    text: {
      primary: mode === 'dark' ? '#F9FAFB' : '#1F2937',
      secondary: mode === 'dark' ? '#D1D5DB' : '#4B5563',
    },
    divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export const getTheme = (mode: 'light' | 'dark') => createTheme(getThemeOptions(mode));