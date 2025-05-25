import { alpha } from '@mui/material/styles';
import { Theme } from '@mui/material';

export type ColorScheme = {
  bg: string;
  color: string;
};

export const getDegreeColor = (degreeName: string, theme: Theme): ColorScheme => {
  const lowerName = degreeName.toLowerCase();
  
  if (lowerName.includes('fundamental')) {
    return {
      bg: alpha(theme.palette.info.main, 0.1),
      color: theme.palette.info.main,
    };
  }
  if (lowerName.includes('médio')) {
    return {
      bg: alpha(theme.palette.warning.main, 0.1),
      color: theme.palette.warning.main,
    };
  }
  if (lowerName.includes('técnico')) {
    return {
      bg: alpha(theme.palette.success.main, 0.1),
      color: theme.palette.success.main,
    };
  }
  if (lowerName.includes('superior')) {
    return {
      bg: alpha(theme.palette.secondary.main, 0.1),
      color: theme.palette.secondary.main,
    };
  }
  return {
    bg: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
  };
};

export const getClassColor = (className: string, theme: Theme): ColorScheme => {
  const lowerName = className.toLowerCase();
  const hash = lowerName.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  const colorIndex = hash % 5;
  const colors = [
    { bg: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main },
    { bg: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main },
    { bg: alpha(theme.palette.success.main, 0.1), color: theme.palette.success.main },
    { bg: alpha(theme.palette.warning.main, 0.1), color: theme.palette.warning.main },
    { bg: alpha(theme.palette.info.main, 0.1), color: theme.palette.info.main },
  ];
  
  return colors[colorIndex];
};

export const getStatusColor = (status: string, theme: Theme): ColorScheme => {
  const statusColors: Record<string, ColorScheme> = {
    active: {
      bg: alpha(theme.palette.success.main, 0.1),
      color: theme.palette.success.main,
    },
    inactive: {
      bg: alpha(theme.palette.error.main, 0.1),
      color: theme.palette.error.main,
    },
    pending: {
      bg: alpha(theme.palette.warning.main, 0.1),
      color: theme.palette.warning.main,
    },
  };

  return statusColors[status.toLowerCase()] || {
    bg: alpha(theme.palette.grey[500], 0.1),
    color: theme.palette.grey[500],
  };
}; 