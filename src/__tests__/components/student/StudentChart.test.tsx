import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import StudentChart from '../../../components/student/StudentChart';

jest.mock('@mui/icons-material/School', () => () => <div data-testid="school-icon" />);
jest.mock('@mui/icons-material/TrendingUp', () => () => <div data-testid="trending-up-icon" />);
jest.mock('@mui/icons-material/People', () => () => <div data-testid="people-icon" />);
jest.mock('@mui/icons-material/Info', () => () => <div data-testid="info-icon" />);

jest.mock('recharts', () => ({
  BarChart: ({ children }: { children: React.ReactNode }) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
  ReferenceLine: () => <div data-testid="reference-line" />,
}));

jest.mock('@mui/material/useMediaQuery', () => {
  return jest.fn().mockImplementation(() => false);
});

describe('StudentChart', () => {
  const theme = createTheme();

  const mockChartData = [
    { name: 'Turma A', students: 30 },
    { name: 'Turma B', students: 25 },
    { name: 'Turma C', students: 35 },
  ];

  const renderWithTheme = (children: React.ReactNode) => {
    return render(
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    );
  };

  const renderStudentChart = (props = {}) => {
    return renderWithTheme(
      <StudentChart
        chartData={mockChartData}
        loading={false}
        {...props}
      />
    );
  };

  it('should render loading state', () => {
    renderWithTheme(<StudentChart chartData={[]} loading={true} />);
    
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons).toHaveLength(2);
    expect(skeletons[0]).toBeInTheDocument();
    expect(skeletons[1]).toBeInTheDocument();
  });

  it('should render empty state', () => {
    renderWithTheme(<StudentChart chartData={[]} />);
    
    expect(screen.getByText('Nenhum dado disponível')).toBeInTheDocument();
    expect(screen.getByText('Não há dados de alunos para exibir no momento')).toBeInTheDocument();
    expect(screen.getByTestId('info-icon')).toBeInTheDocument();
  });

  it('should render chart with data', () => {
    renderStudentChart();
    expect(screen.getByText('Total: 90 alunos')).toBeInTheDocument();
    expect(screen.getByText('Média: 30,0 alunos')).toBeInTheDocument();
  });

  it('should render all chart components', () => {
    renderStudentChart();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  it('should display correct total and average', () => {
    renderStudentChart();
    expect(screen.getByText('Total: 90 alunos')).toBeInTheDocument();
    expect(screen.getByText('Média: 30,0 alunos')).toBeInTheDocument();
  });

  it('should render all icons', () => {
    renderStudentChart();
    expect(screen.getByTestId('school-icon')).toBeInTheDocument();
    expect(screen.getByTestId('trending-up-icon')).toBeInTheDocument();
    expect(screen.getByTestId('people-icon')).toBeInTheDocument();
  });

  it('should handle single data point', () => {
    renderStudentChart({
      chartData: [{ name: 'Jan', students: 100 }],
    });
    expect(screen.getByText('Total: 100 alunos')).toBeInTheDocument();
    expect(screen.getByText('Média: 100,0 alunos')).toBeInTheDocument();
  });

  it('should handle large numbers', () => {
    renderStudentChart({
      chartData: [
        { name: 'Jan', students: 1000000 },
        { name: 'Feb', students: 2000000 },
      ],
    });
    expect(screen.getByText('Total: 3000000 alunos')).toBeInTheDocument();
    expect(screen.getByText('Média: 1.500.000,0 alunos')).toBeInTheDocument();
  });
}); 