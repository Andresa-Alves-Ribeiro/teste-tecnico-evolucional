import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import TeacherFilters from '../../../components/teacher/TeacherFilters';

// Mock do componente FiltersPanel
jest.mock('../../../components/common/FiltersPanel', () => {
  return function MockFiltersPanel({
    title,
    selectedDegree,
    selectedClass,
    degrees,
    classes,
    onDegreeChange,
    onClassChange,
    actionButton,
  }: {
    title: string;
    selectedDegree: number | '';
    selectedClass: number | '';
    degrees: any[];
    classes: any[];
    onDegreeChange: (value: number | '') => void;
    onClassChange: (value: number | '') => void;
    actionButton?: {
      label: string;
      onClick: () => void;
      icon?: React.ReactNode;
    };
  }) {
    return (
      <div data-testid="mock-filters-panel">
        <h2>{title}</h2>
        <select
          data-testid="degree-select"
          value={selectedDegree}
          onChange={(e) => onDegreeChange(Number(e.target.value) || '')}
        >
          <option value="">Todas as Séries</option>
          {degrees.map((degree) => (
            <option key={degree.id} value={degree.id}>
              {degree.name}
            </option>
          ))}
        </select>
        <select
          data-testid="class-select"
          value={selectedClass}
          onChange={(e) => onClassChange(Number(e.target.value) || '')}
        >
          <option value="">Todas as Turmas</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
        {actionButton && (
          <button
            data-testid="action-button"
            onClick={actionButton.onClick}
          >
            {actionButton.label}
          </button>
        )}
      </div>
    );
  };
});

describe('TeacherFilters', () => {
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

    expect(degreeSelect).toHaveValue('');
    expect(classSelect).toHaveValue('');
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
    const options = within(degreeSelect).getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(screen.getByText('Degree 1')).toBeInTheDocument();
    expect(screen.getByText('Degree 2')).toBeInTheDocument();
  });

  it('should render all class options', () => {
    renderWithTheme(<TeacherFilters {...defaultProps} />);

    const classSelect = screen.getByTestId('class-select');
    const options = within(classSelect).getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(screen.getByText('Class 1')).toBeInTheDocument();
    expect(screen.getByText('Class 2')).toBeInTheDocument();
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