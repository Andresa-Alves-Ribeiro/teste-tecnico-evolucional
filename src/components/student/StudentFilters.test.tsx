import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import StudentFilters from './StudentFilters';

// Mock do componente FiltersPanel
jest.mock('../common/FiltersPanel', () => {
  return function MockFiltersPanel({
    title,
    selectedDegree,
    selectedClass,
    degrees,
    classes,
    onDegreeChange,
    onClassChange,
    actionButton,
  }: any) {
    return (
      <div data-testid="mock-filters-panel">
        <h2>{title}</h2>
        <select
          data-testid="degree-select"
          value={selectedDegree}
          onChange={(e) => onDegreeChange(e.target.value ? Number(e.target.value) : '')}
        >
          <option value="">Selecione uma série</option>
          {degrees.map((degree: any) => (
            <option key={degree.id} value={degree.id}>
              {degree.name}
            </option>
          ))}
        </select>
        <select
          data-testid="class-select"
          value={selectedClass}
          onChange={(e) => onClassChange(e.target.value ? Number(e.target.value) : '')}
        >
          <option value="">Selecione uma turma</option>
          {classes.map((cls: any) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
        <button onClick={actionButton.onClick}>{actionButton.label}</button>
      </div>
    );
  };
});

describe('StudentFilters', () => {
  const theme = createTheme();

  const mockDegrees = [
    { id: 1, name: 'Ensino Fundamental' },
    { id: 2, name: 'Ensino Médio' },
  ];

  const mockClasses = [
    { id: 1, name: 'Turma A' },
    { id: 2, name: 'Turma B' },
  ];

  const defaultProps = {
    selectedDegree: '',
    selectedClass: '',
    degrees: mockDegrees,
    classes: mockClasses,
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

  it('should render FiltersPanel with correct title', () => {
    renderWithTheme(<StudentFilters {...defaultProps} />);
    expect(screen.getByText('Filtros de Alunos')).toBeInTheDocument();
  });

  it('should pass correct props to FiltersPanel', () => {
    renderWithTheme(<StudentFilters {...defaultProps} />);

    const filtersPanel = screen.getByTestId('mock-filters-panel');
    expect(filtersPanel).toBeInTheDocument();

    const degreeSelect = screen.getByTestId('degree-select');
    const classSelect = screen.getByTestId('class-select');

    expect(degreeSelect).toHaveValue('');
    expect(classSelect).toHaveValue('');
  });

  it('should handle degree change', () => {
    renderWithTheme(<StudentFilters {...defaultProps} />);

    const degreeSelect = screen.getByTestId('degree-select');
    fireEvent.change(degreeSelect, { target: { value: '1' } });

    expect(defaultProps.onDegreeChange).toHaveBeenCalledWith(1);
  });

  it('should handle class change', () => {
    renderWithTheme(<StudentFilters {...defaultProps} />);

    const classSelect = screen.getByTestId('class-select');
    fireEvent.change(classSelect, { target: { value: '1' } });

    expect(defaultProps.onClassChange).toHaveBeenCalledWith(1);
  });

  it('should handle generate students button click', () => {
    renderWithTheme(<StudentFilters {...defaultProps} />);

    const generateButton = screen.getByText('Gerar Alunos');
    fireEvent.click(generateButton);

    expect(defaultProps.onGenerateStudents).toHaveBeenCalled();
  });

  it('should render all degree options', () => {
    renderWithTheme(<StudentFilters {...defaultProps} />);

    const degreeSelect = screen.getByTestId('degree-select');
    expect(degreeSelect).toHaveLength(3);
    expect(screen.getByText('Selecione uma série')).toBeInTheDocument();
    expect(screen.getByText('Ensino Fundamental')).toBeInTheDocument();
    expect(screen.getByText('Ensino Médio')).toBeInTheDocument();
  });

  it('should render all class options', () => {
    renderWithTheme(<StudentFilters {...defaultProps} />);

    const classSelect = screen.getByTestId('class-select');
    expect(classSelect).toHaveLength(3);
    expect(screen.getByText('Selecione uma turma')).toBeInTheDocument();
    expect(screen.getByText('Turma A')).toBeInTheDocument();
    expect(screen.getByText('Turma B')).toBeInTheDocument();
  });

  it('should handle empty selections', () => {
    renderWithTheme(<StudentFilters {...defaultProps} />);

    const degreeSelect = screen.getByTestId('degree-select');
    const classSelect = screen.getByTestId('class-select');

    fireEvent.change(degreeSelect, { target: { value: '' } });
    fireEvent.change(classSelect, { target: { value: '' } });

    expect(defaultProps.onDegreeChange).toHaveBeenCalledWith('');
    expect(defaultProps.onClassChange).toHaveBeenCalledWith('');
  });

  it('should maintain selected values', () => {
    renderWithTheme(
      <StudentFilters
        {...defaultProps}
        selectedDegree={1}
        selectedClass={1}
      />
    );

    const degreeSelect = screen.getByTestId('degree-select');
    const classSelect = screen.getByTestId('class-select');

    expect(degreeSelect).toHaveValue('1');
    expect(classSelect).toHaveValue('1');
  });
}); 