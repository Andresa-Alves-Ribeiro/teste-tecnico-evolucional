import { createTheme } from '@mui/material/styles';

// Cores principais
const primaryColors = {
  light: '#2563eb',
  dark: '#3b82f6',
};

const secondaryColors = {
  light: '#7c3aed',
  dark: '#8b5cf6',
};

// Cores de status
const statusColors = {
  success: {
    light: '#059669',
    dark: '#10b981',
  },
  error: {
    light: '#dc2626',
    dark: '#ef4444',
  },
  warning: {
    light: '#d97706',
    dark: '#f59e0b',
  },
  info: {
    light: '#0284c7',
    dark: '#0ea5e9',
  },
};

// Cores de texto
const textColors = {
  primary: {
    light: '#1f2937',
    dark: '#f3f4f6',
  },
  secondary: {
    light: '#4b5563',
    dark: '#d1d5db',
  },
};

// Cores de fundo
const backgroundColors = {
  default: {
    light: '#ffffff',
    dark: '#111827',
  },
  paper: {
    light: '#f9fafb',
    dark: '#1f2937',
  },
};

// Transições
const transitions = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
};

// Estilos comuns
const commonStyles = {
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    xl: '16px',
    xxl: '24px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
};

const shadows: [
  "none",
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
] = [
  'none',
  '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
];

// Criar tema claro
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: primaryColors.light,
    },
    secondary: {
      main: secondaryColors.light,
    },
    error: {
      main: statusColors.error.light,
    },
    warning: {
      main: statusColors.warning.light,
    },
    info: {
      main: statusColors.info.light,
    },
    success: {
      main: statusColors.success.light,
    },
    text: {
      primary: textColors.primary.light,
      secondary: textColors.secondary.light,
    },
    background: {
      default: backgroundColors.default.light,
      paper: backgroundColors.paper.light,
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: parseInt(commonStyles.borderRadius.medium),
  },
  spacing: (factor: number) => `${factor * 8}px`,
  shadows,
});

// Criar tema escuro
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: primaryColors.dark,
    },
    secondary: {
      main: secondaryColors.dark,
    },
    error: {
      main: statusColors.error.dark,
    },
    warning: {
      main: statusColors.warning.dark,
    },
    info: {
      main: statusColors.info.dark,
    },
    success: {
      main: statusColors.success.dark,
    },
    text: {
      primary: textColors.primary.dark,
      secondary: textColors.secondary.dark,
    },
    background: {
      default: backgroundColors.default.dark,
      paper: backgroundColors.paper.dark,
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: parseInt(commonStyles.borderRadius.medium),
  },
  spacing: (factor: number) => `${factor * 8}px`,
  shadows,
});

// Exportar estilos comuns para uso em componentes
export const styles = {
  ...commonStyles,
  transitions,
  colors: {
    primary: primaryColors,
    secondary: secondaryColors,
    status: statusColors,
    text: textColors,
    background: backgroundColors,
  },
}; 