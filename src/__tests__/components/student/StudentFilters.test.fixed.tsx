import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StudentFilters from '../../../components/student/StudentFilters';

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValue(false),
}));

const mockDegrees = [
  { id: 1, name: 'Degree 1' },
  { id: 2, name: 'Degree 2' },
];

const mockClasses = [
  { id: 1, name: 'Class 1' },
  { id: 2, name: 'Class 2' },
];

describe('StudentFilters Component', () => {
  const defaultProps = {
    selectedDegree: '' as number | '',
    selectedClass: '' as number | '',
    degrees: mockDegrees,
    classes: mockClasses,
    onDegreeChange: jest.fn(),
    onClassChange: jest.fn(),
    onGenerateStudents: jest.fn(),
  };

  it('renders the component with title', () => {
    render(<StudentFilters {...defaultProps} />);
    expect(screen.getByText('Filtros de Alunos')).toBeInTheDocument();
  });

  it('renders the generate students button', () => {
    render(<StudentFilters {...defaultProps} />);
    expect(screen.getByText('Gerar 300 Novos Alunos')).toBeInTheDocument();
  });

  it('calls onGenerateStudents when button is clicked', () => {
    render(<StudentFilters {...defaultProps} />);
    fireEvent.click(screen.getByText('Gerar 300 Novos Alunos'));
    expect(defaultProps.onGenerateStudents).toHaveBeenCalled();
  });

  it('passes correct props to FiltersPanel', () => {
    render(<StudentFilters {...defaultProps} />);
    expect(screen.getByRole('heading', { name: 'Filtros de Alunos' })).toBeInTheDocument();
  });
}); 