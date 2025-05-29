import { Theme } from '@mui/material';
import { getDegreeColor } from '../../utils/colors';

describe('Color Utils', () => {
  const mockTheme = {
    palette: {
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
      success: { main: '#4caf50' },
      warning: { main: '#ff9800' },
      error: { main: '#f44336' },
      info: { main: '#2196f3' },
      grey: { 500: '#9e9e9e' },
    },
  } as Theme;

  describe('getDegreeColor', () => {
    it('should return info color for fundamental degree', () => {
      const result = getDegreeColor('Ensino Fundamental', mockTheme);
      expect(result.color).toBe(mockTheme.palette.info.main);
    });

    it('should return warning color for médio degree', () => {
      const result = getDegreeColor('Ensino Médio', mockTheme);
      expect(result.color).toBe(mockTheme.palette.warning.main);
    });

    it('should return success color for técnico degree', () => {
      const result = getDegreeColor('Ensino Técnico', mockTheme);
      expect(result.color).toBe(mockTheme.palette.success.main);
    });

    it('should return secondary color for superior degree', () => {
      const result = getDegreeColor('Ensino Superior', mockTheme);
      expect(result.color).toBe(mockTheme.palette.secondary.main);
    });

    it('should return primary color for unknown degree', () => {
      const result = getDegreeColor('Unknown Degree', mockTheme);
      expect(result.color).toBe(mockTheme.palette.primary.main);
    });
  });
}); 