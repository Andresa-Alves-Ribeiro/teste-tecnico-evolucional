import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import StudentFiltersAndChart from '../../../../components/student/management/StudentFiltersAndChart';

jest.mock('../../../../components/student/StudentFilters', () => {
  return function MockStudentFilters({
    selectedDegree,
    selectedClass,
    degrees,
    classes,
    onDegreeChange,
    onClassChange,
    onGenerateStudents,
  }: any) {
    return (
      <div data-testid="mock-student-filters">
        <div data-testid="selected-degree">{selectedDegree}</div>
        <div data-testid="selected-class">{selectedClass}</div>
        <div data-testid="degrees-count">{degrees.length}</div>
        <div data-testid="classes-count">{classes.length}</div>
        <button onClick={() => onDegreeChange('')}>Change Degree</button>
        <button onClick={() => onClassChange('')}>Change Class</button>
        <button onClick={onGenerateStudents}>Generate Students</button>
      </div>
    );
  };
});

jest.mock('../../../../components/student/StudentChart', () => {
  return function MockStudentChart({ chartData }: any) {
    return (
      <div data-testid="mock-student-chart">
        <div data-testid="chart-data-length">{chartData.length}</div>
      </div>
    );
  };
});

jest.mock('@mui/icons-material/School', () => () => <div data-testid="school-icon" />);

describe('StudentFiltersAndChart', () => {
  const theme = createTheme();

  const defaultProps = {
    selectedDegree: '' as number | '',
    selectedClass: '' as number | '',
    degrees: [
      { id: 1, name: 'Degree 1' },
      { id: 2, name: 'Degree 2' },
    ],
    classes: [
      { id: 1, name: 'Class 1' },
      { id: 2, name: 'Class 2' },
    ],
    chartData: [
      { name: 'Category 1', students: 10 },
      { name: 'Category 2', students: 20 },
    ],
    onDegreeChange: jest.fn(),
    onClassChange: jest.fn(),
    onGenerateStudents: jest.fn(),
  };

  const renderWithTheme = (children: React.ReactNode) => {
    return render(
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    );
  };

  it('should render the component with correct title', () => {
    renderWithTheme(<StudentFiltersAndChart {...defaultProps} />);
    expect(screen.getByText('Gestão de Alunos')).toBeInTheDocument();
  });

  it('should render the school icon', () => {
    renderWithTheme(<StudentFiltersAndChart {...defaultProps} />);
    expect(screen.getByTestId('school-icon')).toBeInTheDocument();
  });

  it('should render StudentFilters with correct props', () => {
    renderWithTheme(<StudentFiltersAndChart {...defaultProps} />);
    
    const filters = screen.getByTestId('mock-student-filters');
    expect(filters).toBeInTheDocument();
    
    expect(screen.getByTestId('selected-degree')).toHaveTextContent('');
    expect(screen.getByTestId('selected-class')).toHaveTextContent('');
    expect(screen.getByTestId('degrees-count')).toHaveTextContent('2');
    expect(screen.getByTestId('classes-count')).toHaveTextContent('2');
  });

  it('should render StudentChart with correct props', () => {
    renderWithTheme(<StudentFiltersAndChart {...defaultProps} />);
    
    const chart = screen.getByTestId('mock-student-chart');
    expect(chart).toBeInTheDocument();
    expect(screen.getByTestId('chart-data-length')).toHaveTextContent('2');
  });

  it('should pass selected values to StudentFilters', () => {
    renderWithTheme(
      <StudentFiltersAndChart
        {...defaultProps}
        selectedDegree={1}
        selectedClass={2}
      />
    );
    
    expect(screen.getByTestId('selected-degree')).toHaveTextContent('1');
    expect(screen.getByTestId('selected-class')).toHaveTextContent('2');
  });

  it('should call onDegreeChange when degree is changed', () => {
    renderWithTheme(<StudentFiltersAndChart {...defaultProps} />);
    
    const changeDegreeButton = screen.getByText('Change Degree');
    changeDegreeButton.click();
    
    expect(defaultProps.onDegreeChange).toHaveBeenCalledWith('');
  });

  it('should call onClassChange when class is changed', () => {
    renderWithTheme(<StudentFiltersAndChart {...defaultProps} />);
    
    const changeClassButton = screen.getByText('Change Class');
    changeClassButton.click();
    
    expect(defaultProps.onClassChange).toHaveBeenCalledWith('');
  });

  it('should call onGenerateStudents when generate button is clicked', () => {
    renderWithTheme(<StudentFiltersAndChart {...defaultProps} />);
    
    const generateButton = screen.getByText('Generate Students');
    generateButton.click();
    
    expect(defaultProps.onGenerateStudents).toHaveBeenCalled();
  });

  it('should have correct styling in dark mode', () => {
    const darkTheme = createTheme({ palette: { mode: 'dark' } });
    render(
      <ThemeProvider theme={darkTheme}>
        <StudentFiltersAndChart {...defaultProps} />
      </ThemeProvider>
    );

    const paper = screen.getByTestId('student-filters-chart-paper');
    expect(paper).toHaveStyle({
      background: expect.stringContaining('linear-gradient'),
    });
  });

  it('should have correct styling in light mode', () => {
    const lightTheme = createTheme({ palette: { mode: 'light' } });
    render(
      <ThemeProvider theme={lightTheme}>
        <StudentFiltersAndChart {...defaultProps} />
      </ThemeProvider>
    );

    const paper = screen.getByTestId('student-filters-chart-paper');
    expect(paper).toHaveStyle({
      background: expect.stringContaining('linear-gradient'),
    });
  });

  it('should handle empty chart data', () => {
    renderWithTheme(
      <StudentFiltersAndChart
        {...defaultProps}
        chartData={[]}
      />
    );
    
    expect(screen.getByTestId('chart-data-length')).toHaveTextContent('0');
  });

  it('should maintain layout structure', () => {
    renderWithTheme(<StudentFiltersAndChart {...defaultProps} />);
    
    const mainBox = screen.getByTestId('student-filters-chart-container');
    expect(mainBox).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
    });
  });
}); 