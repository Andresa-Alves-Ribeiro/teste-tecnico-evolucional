import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import TeacherStats from './TeacherStats';

// Mock do componente StatsCards
jest.mock('../common/StatsCards', () => {
  return function MockStatsCards({ stats }: { stats: any[] }) {
    return (
      <div data-testid="mock-stats-cards">
        {stats.map((stat, index) => (
          <div key={index} data-testid={`stat-card-${index}`}>
            <h3>{stat.title}</h3>
            <p>{stat.value}</p>
            <div data-testid={`stat-icon-${index}`} />
          </div>
        ))}
      </div>
    );
  };
});

describe('TeacherStats', () => {
  const theme = createTheme();

  const defaultProps = {
    totalTeachers: 10,
    totalDegrees: 5,
    totalClasses: 8,
    totalRelationships: 15,
  };

  const renderWithTheme = (children: React.ReactNode) => {
    return render(
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    );
  };

  it('should render all stats cards', () => {
    renderWithTheme(<TeacherStats {...defaultProps} />);

    const statsCards = screen.getByTestId('mock-stats-cards');
    expect(statsCards).toBeInTheDocument();

    expect(screen.getByText('Total de Professores')).toBeInTheDocument();
    expect(screen.getByText('Séries Ativas')).toBeInTheDocument();
    expect(screen.getByText('Turmas Ativas')).toBeInTheDocument();
    expect(screen.getByText('Relações Ativas')).toBeInTheDocument();
  });

  it('should display correct values', () => {
    renderWithTheme(<TeacherStats {...defaultProps} />);

    const statCards = screen.getAllByTestId(/^stat-card-\d+$/);
    expect(statCards[0]).toHaveTextContent('10'); // totalTeachers
    expect(statCards[1]).toHaveTextContent('5'); // totalDegrees
    expect(statCards[2]).toHaveTextContent('8'); // totalClasses
    expect(statCards[3]).toHaveTextContent('15'); // totalRelationships
  });

  it('should pass correct props to StatsCards', () => {
    renderWithTheme(<TeacherStats {...defaultProps} />);

    const statCards = screen.getAllByTestId(/^stat-card-\d+$/);
    expect(statCards).toHaveLength(4);

    // Verifica se os ícones estão presentes
    const statIcons = screen.getAllByTestId(/^stat-icon-\d+$/);
    expect(statIcons).toHaveLength(4);
  });

  it('should handle zero values', () => {
    const zeroProps = {
      totalTeachers: 0,
      totalDegrees: 0,
      totalClasses: 0,
      totalRelationships: 0,
    };

    renderWithTheme(<TeacherStats {...zeroProps} />);

    const statCards = screen.getAllByTestId(/^stat-card-\d+$/);
    expect(statCards[0]).toHaveTextContent('0');
    expect(statCards[1]).toHaveTextContent('0');
    expect(statCards[2]).toHaveTextContent('0');
    expect(statCards[3]).toHaveTextContent('0');
  });

  it('should handle large numbers', () => {
    const largeProps = {
      totalTeachers: 1000,
      totalDegrees: 500,
      totalClasses: 800,
      totalRelationships: 1500,
    };

    renderWithTheme(<TeacherStats {...largeProps} />);

    const statCards = screen.getAllByTestId(/^stat-card-\d+$/);
    expect(statCards[0]).toHaveTextContent('1000');
    expect(statCards[1]).toHaveTextContent('500');
    expect(statCards[2]).toHaveTextContent('800');
    expect(statCards[3]).toHaveTextContent('1500');
  });

  it('should maintain correct order of stats', () => {
    renderWithTheme(<TeacherStats {...defaultProps} />);

    const statCards = screen.getAllByTestId(/^stat-card-\d+$/);
    const firstCard = statCards[0];
    const secondCard = statCards[1];
    const thirdCard = statCards[2];
    const fourthCard = statCards[3];

    expect(firstCard).toHaveTextContent('Total de Professores');
    expect(secondCard).toHaveTextContent('Séries Ativas');
    expect(thirdCard).toHaveTextContent('Turmas Ativas');
    expect(fourthCard).toHaveTextContent('Relações Ativas');
  });
}); 