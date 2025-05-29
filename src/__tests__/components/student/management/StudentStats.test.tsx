import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import StudentStats from '../../../../components/student/management/StudentStats';

// Mock dos ícones
jest.mock('@mui/icons-material/People', () => () => <div data-testid="people-icon" />);
jest.mock('@mui/icons-material/School', () => () => <div data-testid="school-icon" />);
jest.mock('@mui/icons-material/Class', () => () => <div data-testid="class-icon" />);
jest.mock('@mui/icons-material/Groups', () => () => <div data-testid="groups-icon" />);

describe('StudentStats', () => {
  const theme = createTheme();

  const defaultProps = {
    totalStudents: 100,
    totalDegrees: 5,
    totalClasses: 10,
  };

  const renderWithTheme = (children: React.ReactNode) => {
    return render(
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    );
  };

  it('should render all stats cards', () => {
    renderWithTheme(<StudentStats {...defaultProps} />);

    expect(screen.getByText('Total de Alunos')).toBeInTheDocument();
    expect(screen.getByText('Séries Ativas')).toBeInTheDocument();
    expect(screen.getByText('Turmas Ativas')).toBeInTheDocument();
    expect(screen.getByText('Média por Turma')).toBeInTheDocument();
  });

  it('should display correct values', () => {
    renderWithTheme(<StudentStats {...defaultProps} />);

    const cards = screen.getAllByTestId('stats-card');
    const values = cards.map(card => within(card).getByRole('heading', { level: 4 }).textContent);
    
    expect(values).toContain('100');
    expect(values).toContain('5');
    expect(values).toContain('10');
    expect(values).toContain('10');
  });

  it('should render all icons', () => {
    renderWithTheme(<StudentStats {...defaultProps} />);

    expect(screen.getByTestId('people-icon')).toBeInTheDocument();
    expect(screen.getByTestId('school-icon')).toBeInTheDocument();
    expect(screen.getByTestId('class-icon')).toBeInTheDocument();
    expect(screen.getByTestId('groups-icon')).toBeInTheDocument();
  });

  it('should handle zero values', () => {
    const zeroProps = {
      totalStudents: 0,
      totalDegrees: 0,
      totalClasses: 0,
    };

    renderWithTheme(<StudentStats {...zeroProps} />);

    const cards = screen.getAllByTestId('stats-card');
    const values = cards.map(card => within(card).getByRole('heading', { level: 4 }).textContent);
    
    expect(values.every(value => value === '0')).toBe(true);
  });

  it('should handle large numbers', () => {
    const largeProps = {
      totalStudents: 1000000,
      totalDegrees: 500,
      totalClasses: 1000,
    };

    renderWithTheme(<StudentStats {...largeProps} />);

    const cards = screen.getAllByTestId('stats-card');
    const values = cards.map(card => within(card).getByRole('heading', { level: 4 }).textContent);
    
    expect(values).toContain('1.000.000');
    expect(values).toContain('500');
    expect(values).toContain('1.000');
    expect(values).toContain('1.000');
  });
}); 