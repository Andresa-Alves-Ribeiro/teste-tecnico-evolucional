import { Theme } from '@mui/material';
import { getDegreeColor, getClassColor, getStatusColor } from './colors';

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

  describe('getClassColor', () => {
    it('should return consistent colors for same class name', () => {
      const result1 = getClassColor('Class A', mockTheme);
      const result2 = getClassColor('Class A', mockTheme);
      expect(result1).toEqual(result2);
    });

    it('should return different colors for different class names', () => {
      const result1 = getClassColor('Class A', mockTheme);
      const result2 = getClassColor('Class B', mockTheme);
      expect(result1).not.toEqual(result2);
    });

    it('should return one of the predefined colors', () => {
      const result = getClassColor('Test Class', mockTheme);
      const validColors = [
        mockTheme.palette.primary.main,
        mockTheme.palette.secondary.main,
        mockTheme.palette.success.main,
        mockTheme.palette.warning.main,
        mockTheme.palette.info.main,
      ];
      expect(validColors).toContain(result.color);
    });
  });

  describe('getStatusColor', () => {
    it('should return success color for active status', () => {
      const result = getStatusColor('active', mockTheme);
      expect(result.color).toBe(mockTheme.palette.success.main);
    });

    it('should return error color for inactive status', () => {
      const result = getStatusColor('inactive', mockTheme);
      expect(result.color).toBe(mockTheme.palette.error.main);
    });

    it('should return warning color for pending status', () => {
      const result = getStatusColor('pending', mockTheme);
      expect(result.color).toBe(mockTheme.palette.warning.main);
    });

    it('should return grey color for unknown status', () => {
      const result = getStatusColor('unknown', mockTheme);
      expect(result.color).toBe(mockTheme.palette.grey[500]);
    });

    it('should be case insensitive', () => {
      const result1 = getStatusColor('ACTIVE', mockTheme);
      const result2 = getStatusColor('active', mockTheme);
      expect(result1).toEqual(result2);
    });
  });
}); 