import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material';
import AddRelationshipDialog from '../../../components/teacher/AddRelationshipDialog';
import { getTheme } from '../../../styles/theme';

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Dialog: ({ children, open, onClose }: any) => (
    open ? (
      <dialog 
        data-testid="dialog" 
        open
        style={{ display: 'block', width: '100%', border: 'none', background: 'none' }}
      >
        <button
          onClick={onClose}
          onKeyDown={(e) => e.key === 'Escape' && onClose()}
          style={{ width: '100%', border: 'none', background: 'none', padding: 0 }}
        >
          {children}
        </button>
      </dialog>
    ) : null
  ),
  DialogTitle: ({ children, className }: any) => (
    <div data-testid="dialog-title" className={className}>
      {children}
    </div>
  ),
  DialogContent: ({ children }: any) => (
    <div data-testid="dialog-content">
      {children}
    </div>
  ),
  DialogActions: ({ children, className }: any) => (
    <div data-testid="dialog-actions" className={className}>
      {children}
    </div>
  ),
  Box: ({ children, className }: any) => (
    <div className={className}>
      {children}
    </div>
  ),
  FormControl: ({ children, fullWidth }: any) => (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      {children}
    </div>
  ),
  InputLabel: ({ children, id }: any) => (
    <label htmlFor={id}>{children}</label>
  ),
  Select: ({ value, onChange, children, label, id, inputProps }: any) => (
    <select
      value={value}
      onChange={onChange}
      id={id}
      aria-label={inputProps['aria-label']}
    >
      {children}
    </select>
  ),
  MenuItem: ({ value, children }: any) => (
    <option value={value}>{children}</option>
  ),
  Button: ({ children, onClick, variant, className }: any) => (
    <button
      onClick={onClick}
      data-variant={variant}
      className={className}
    >
      {children}
    </button>
  ),
}));

const mockTeachers = [
  { id: 1, name: 'Professor 1', subject: 'Matemática' },
  { id: 2, name: 'Professor 2', subject: 'Português' },
];

const mockDegrees = [
  { id: 1, name: 'Ensino Fundamental' },
  { id: 2, name: 'Ensino Médio' },
];

const mockClasses = [
  { id: 1, name: 'Turma A' },
  { id: 2, name: 'Turma B' },
];

const defaultProps = {
  open: true,
  onClose: jest.fn(),
  onAdd: jest.fn(),
  newRelationship: {},
  setNewRelationship: jest.fn(),
  teachers: mockTeachers,
  degrees: mockDegrees,
  classes: mockClasses,
};

const renderDialog = (props = {}) => {
  return render(
    <ThemeProvider theme={getTheme('light')}>
      <AddRelationshipDialog {...defaultProps} {...props} />
    </ThemeProvider>
  );
};

describe('AddRelationshipDialog', () => {
  it('renders dialog with title', () => {
    renderDialog();
    expect(screen.getByText('Adicionar Relacionamento')).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    renderDialog();
    expect(screen.getByLabelText('Professor')).toBeInTheDocument();
    expect(screen.getByLabelText('Série')).toBeInTheDocument();
    expect(screen.getByLabelText('Classe')).toBeInTheDocument();
  });

  it('renders all options in teacher select', () => {
    renderDialog();
    const teacherSelect = screen.getByLabelText('Professor');
    fireEvent.mouseDown(teacherSelect);
    expect(screen.getByText('Professor 1 - Matemática')).toBeInTheDocument();
    expect(screen.getByText('Professor 2 - Português')).toBeInTheDocument();
  });

  it('renders all options in degree select', () => {
    renderDialog();
    const degreeSelect = screen.getByLabelText('Série');
    fireEvent.mouseDown(degreeSelect);
    expect(screen.getByText('Ensino Fundamental')).toBeInTheDocument();
    expect(screen.getByText('Ensino Médio')).toBeInTheDocument();
  });

  it('renders all options in class select', () => {
    renderDialog();
    const classSelect = screen.getByLabelText('Classe');
    fireEvent.mouseDown(classSelect);
    expect(screen.getByText('Turma A')).toBeInTheDocument();
    expect(screen.getByText('Turma B')).toBeInTheDocument();
  });

  it('calls setNewRelationship when selecting a teacher', () => {
    renderDialog();
    const teacherSelect = screen.getByLabelText('Professor');
    fireEvent.change(teacherSelect, { target: { value: '1' } });
    expect(defaultProps.setNewRelationship).toHaveBeenCalledWith({
      teacherId: 1,
    });
  });

  it('calls setNewRelationship when selecting a degree', () => {
    renderDialog();
    const degreeSelect = screen.getByLabelText('Série');
    fireEvent.change(degreeSelect, { target: { value: '1' } });
    expect(defaultProps.setNewRelationship).toHaveBeenCalledWith({
      degreeId: 1,
    });
  });

  it('calls setNewRelationship when selecting a class', () => {
    renderDialog();
    const classSelect = screen.getByLabelText('Classe');
    fireEvent.change(classSelect, { target: { value: '1' } });
    expect(defaultProps.setNewRelationship).toHaveBeenCalledWith({
      classId: 1,
    });
  });

  it('calls onClose when clicking cancel button', () => {
    renderDialog();
    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onAdd when clicking add button', () => {
    renderDialog();
    const addButton = screen.getByText('Adicionar');
    fireEvent.click(addButton);
    expect(defaultProps.onAdd).toHaveBeenCalled();
  });

  it('is not visible when open is false', () => {
    renderDialog({ open: false });
    expect(screen.queryByText('Adicionar Relacionamento')).not.toBeInTheDocument();
  });

  it('maintains selected values', () => {
    const selectedRelationship = {
      teacherId: 1,
      degreeId: 1,
      classId: 1,
    };

    renderDialog({ newRelationship: selectedRelationship });

    const teacherSelect = screen.getByLabelText('Professor');
    const degreeSelect = screen.getByLabelText('Série');
    const classSelect = screen.getByLabelText('Classe');

    expect(teacherSelect).toHaveValue('1');
    expect(degreeSelect).toHaveValue('1');
    expect(classSelect).toHaveValue('1');
  });

  it('preserves existing values when updating a single field', () => {
    const initialRelationship = {
      teacherId: 1,
      degreeId: 1,
      classId: 1,
    };

    renderDialog({ newRelationship: initialRelationship });

    const classSelect = screen.getByLabelText('Classe');
    fireEvent.change(classSelect, { target: { value: '2' } });

    expect(defaultProps.setNewRelationship).toHaveBeenCalledWith({
      teacherId: 1,
      degreeId: 1,
      classId: 2,
    });
  });

  it('should have correct styling for dialog title', () => {
    renderDialog();
    const title = screen.getByTestId('dialog-title');
    expect(title).toHaveClass('bg-gray-50', 'text-gray-800', 'font-semibold');
  });

  it('should have correct styling for dialog actions', () => {
    renderDialog();
    const actions = screen.getByTestId('dialog-actions');
    expect(actions).toHaveClass('bg-gray-50', 'p-4');
  });

  it('should have correct styling for cancel button', () => {
    renderDialog();
    const cancelButton = screen.getByText('Cancelar');
    expect(cancelButton).toHaveClass('text-gray-600', 'hover:text-gray-800');
  });

  it('should have correct styling for add button', () => {
    renderDialog();
    const addButton = screen.getByText('Adicionar');
    expect(addButton).toHaveClass(
      'bg-blue-600',
      'hover:bg-blue-700',
      'text-white',
      'px-4',
      'py-2',
      'rounded-md',
    );
  });
}); 