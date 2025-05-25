import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import TeacherFilters from './TeacherFilters';

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

describe('TeacherFilters', () => {
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
    onAddClick: jest.fn(),
  };

  const renderWithTheme = (children: React.ReactNode) => {
    return render(
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    );
  };

  it('should render FiltersPanel with correct title', () => {
    renderWithTheme(<TeacherFilters {...defaultProps} />);
    expect(screen.getByText('Filtros de Professores')).toBeInTheDocument();
  });

  it('should pass correct props to FiltersPanel', () => {
    renderWithTheme(<TeacherFilters {...defaultProps} />);

    const filtersPanel = screen.getByTestId('mock-filters-panel');
    expect(filtersPanel).toBeInTheDocument();

    const degreeSelect = screen.getByTestId('degree-select');
    const classSelect = screen.getByTestId('class-select');

    expect(degreeSelect).toHaveValue('1');
    expect(classSelect).toHaveValue('1');
  });

  it('should handle degree change', () => {
    renderWithTheme(<TeacherFilters {...defaultProps} />);

    const degreeSelect = screen.getByTestId('degree-select');
    fireEvent.change(degreeSelect, { target: { value: '1' } });

    expect(defaultProps.onDegreeChange).toHaveBeenCalledWith(1);
  });

  it('should handle class change', () => {
    renderWithTheme(<TeacherFilters {...defaultProps} />);

    const classSelect = screen.getByTestId('class-select');
    fireEvent.change(classSelect, { target: { value: '1' } });

    expect(defaultProps.onClassChange).toHaveBeenCalledWith(1);
  });

  it('should handle add button click', () => {
    renderWithTheme(<TeacherFilters {...defaultProps} />);

    const addButton = screen.getByText('Adicionar Relacionamento');
    fireEvent.click(addButton);

    expect(defaultProps.onAddClick).toHaveBeenCalled();
  });

  it('should render all degree options', () => {
    renderWithTheme(<TeacherFilters {...defaultProps} />);

    const degreeSelect = screen.getByTestId('degree-select');
    expect(degreeSelect).toHaveLength(2);
    expect(screen.getByText('Ensino Fundamental')).toBeInTheDocument();
    expect(screen.getByText('Ensino Médio')).toBeInTheDocument();
  });

  it('should render all class options', () => {
    renderWithTheme(<TeacherFilters {...defaultProps} />);

    const classSelect = screen.getByTestId('class-select');
    expect(classSelect).toHaveLength(2);
    expect(screen.getByText('Turma A')).toBeInTheDocument();
    expect(screen.getByText('Turma B')).toBeInTheDocument();
  });

  it('should handle empty selections', () => {
    renderWithTheme(<TeacherFilters {...defaultProps} />);

    const degreeSelect = screen.getByTestId('degree-select');
    const classSelect = screen.getByTestId('class-select');

    fireEvent.change(degreeSelect, { target: { value: '' } });
    fireEvent.change(classSelect, { target: { value: '' } });

    expect(defaultProps.onDegreeChange).toHaveBeenCalledWith('');
    expect(defaultProps.onClassChange).toHaveBeenCalledWith('');
  });
}); 