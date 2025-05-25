import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import StudentStats from './StudentStats';

// Mock dos ícones
jest.mock('@mui/icons-material/People', () => () => <div data-testid="people-icon" />);
jest.mock('@mui/icons-material/Class', () => () => <div data-testid="class-icon" />);
jest.mock('@mui/icons-material/Groups', () => () => <div data-testid="groups-icon" />);
jest.mock('@mui/icons-material/School', () => () => <div data-testid="school-icon" />);

// Mock do componente StatsCards
jest.mock('../../common/StatsCards', () => {
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

    const statsCards = screen.getByTestId('mock-stats-cards');
    expect(statsCards).toBeInTheDocument();

    expect(screen.getByText('Total de Alunos')).toBeInTheDocument();
    expect(screen.getByText('Séries Ativas')).toBeInTheDocument();
    expect(screen.getByText('Turmas Ativas')).toBeInTheDocument();
    expect(screen.getByText('Média por Turma')).toBeInTheDocument();
  });

  it('should display correct values', () => {
    renderWithTheme(<StudentStats {...defaultProps} />);

    const statCards = screen.getAllByTestId(/^stat-card-\d+$/);
    expect(statCards[0]).toHaveTextContent('100'); // totalStudents
    expect(statCards[1]).toHaveTextContent('5'); // totalDegrees
    expect(statCards[2]).toHaveTextContent('10'); // totalClasses
    expect(statCards[3]).toHaveTextContent('10'); // average per class (100/10)
  });

  it('should pass correct props to StatsCards', () => {
    renderWithTheme(<StudentStats {...defaultProps} />);

    const statCards = screen.getAllByTestId(/^stat-card-\d+$/);
    expect(statCards).toHaveLength(4);

    // Verifica se os ícones estão presentes
    const statIcons = screen.getAllByTestId(/^stat-icon-\d+$/);
    expect(statIcons).toHaveLength(4);
  });

  it('should handle zero values', () => {
    const zeroProps = {
      totalStudents: 0,
      totalDegrees: 0,
      totalClasses: 0,
    };

    renderWithTheme(<StudentStats {...zeroProps} />);

    const statCards = screen.getAllByTestId(/^stat-card-\d+$/);
    expect(statCards[0]).toHaveTextContent('0');
    expect(statCards[1]).toHaveTextContent('0');
    expect(statCards[2]).toHaveTextContent('0');
    expect(statCards[3]).toHaveTextContent('0');
  });

  it('should handle large numbers', () => {
    const largeProps = {
      totalStudents: 1000,
      totalDegrees: 50,
      totalClasses: 100,
    };

    renderWithTheme(<StudentStats {...largeProps} />);

    const statCards = screen.getAllByTestId(/^stat-card-\d+$/);
    expect(statCards[0]).toHaveTextContent('1000');
    expect(statCards[1]).toHaveTextContent('50');
    expect(statCards[2]).toHaveTextContent('100');
    expect(statCards[3]).toHaveTextContent('10'); // average per class (1000/100)
  });

  it('should maintain correct order of stats', () => {
    renderWithTheme(<StudentStats {...defaultProps} />);

    const statCards = screen.getAllByTestId(/^stat-card-\d+$/);
    const firstCard = statCards[0];
    const secondCard = statCards[1];
    const thirdCard = statCards[2];
    const fourthCard = statCards[3];

    expect(firstCard).toHaveTextContent('Total de Alunos');
    expect(secondCard).toHaveTextContent('Séries Ativas');
    expect(thirdCard).toHaveTextContent('Turmas Ativas');
    expect(fourthCard).toHaveTextContent('Média por Turma');
  });

  it('should round average per class correctly', () => {
    const props = {
      totalStudents: 95,
      totalDegrees: 5,
      totalClasses: 10,
    };

    renderWithTheme(<StudentStats {...props} />);

    const statCards = screen.getAllByTestId(/^stat-card-\d+$/);
    expect(statCards[3]).toHaveTextContent('10'); // 95/10 rounded to 10
  });
}); 