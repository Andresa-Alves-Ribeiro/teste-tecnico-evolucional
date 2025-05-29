import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import TeacherManagement from '../../../components/teacher/TeacherManagement';
import { getTheme } from '../../../styles/theme';

jest.mock('../../../components/teacher/TeacherHeader', () => () => <div data-testid="teacher-header">Teacher Header</div>);
jest.mock('../../../components/teacher/TeacherStats', () => ({ totalTeachers, totalRelationships }: any) => (
  <div data-testid="teacher-stats">
    <div data-testid="total-teachers">{totalTeachers}</div>
    <div data-testid="total-relationships">{totalRelationships}</div>
  </div>
));
jest.mock('../../../components/teacher/TeacherFilters', () => ({ onDegreeChange, onClassChange, onAddClick }: any) => (
  <div data-testid="teacher-filters">
    <button onClick={() => onDegreeChange(1)} data-testid="degree-filter">Filter by Degree</button>
    <button onClick={() => onClassChange(1)} data-testid="class-filter">Filter by Class</button>
    <button onClick={onAddClick} data-testid="add-relationship">Add Relationship</button>
  </div>
));
jest.mock('../../../components/teacher/AddRelationshipDialog', () => ({ open, onClose, onAdd }: any) => (
  open ? (
    <div data-testid="add-relationship-dialog">
      <button 
        onClick={() => {
          onAdd();
          onClose();
        }} 
        data-testid="save-relationship"
      >
        Save
      </button>
      <button onClick={onClose} data-testid="close-dialog">Close</button>
    </div>
  ) : null
));
jest.mock('../../../components/common/DataTable', () => ({ items, columns }: any) => (
  <div data-testid="data-table">
    <div data-testid="table-items">{items.length}</div>
    {items.map((item: any, index: number) => (
      <div key={index} data-testid="table-row">
        {columns.map((col: any) => (
          <div key={col.key} data-testid={`cell-${col.key}`}>
            {col.render ? col.render(item) : item[col.key]}
          </div>
        ))}
      </div>
    ))}
  </div>
));

const renderTeacherManagement = () => {
  return render(
    <ThemeProvider theme={getTheme('light')}>
      <TeacherManagement />
    </ThemeProvider>
  );
};

describe('TeacherManagement Component', () => {
  it('renders all main components', () => {
    renderTeacherManagement();
    expect(screen.getByTestId('teacher-header')).toBeInTheDocument();
    expect(screen.getByTestId('teacher-stats')).toBeInTheDocument();
    expect(screen.getByTestId('teacher-filters')).toBeInTheDocument();
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });

  it('filters relationships by degree', async () => {
    renderTeacherManagement();
    const degreeFilter = screen.getByTestId('degree-filter');
    await userEvent.click(degreeFilter);
    
    await waitFor(() => {
      const tableItems = screen.getByTestId('table-items');
      expect(tableItems).toBeInTheDocument();
    });
  });

  it('filters relationships by class', async () => {
    renderTeacherManagement();
    const classFilter = screen.getByTestId('class-filter');
    await userEvent.click(classFilter);
    
    await waitFor(() => {
      const tableItems = screen.getByTestId('table-items');
      expect(tableItems).toBeInTheDocument();
    });
  });

  it('opens add relationship dialog', async () => {
    renderTeacherManagement();
    const addButton = screen.getByTestId('add-relationship');
    await userEvent.click(addButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('add-relationship-dialog')).toBeInTheDocument();
    });
  });

  it('adds a new relationship', async () => {
    renderTeacherManagement();
    const addButton = screen.getByTestId('add-relationship');
    await userEvent.click(addButton);
    
    const saveButton = await screen.findByTestId('save-relationship');
    await userEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.queryByTestId('add-relationship-dialog')).not.toBeInTheDocument();
    });
  });

  it('displays teacher information correctly', () => {
    renderTeacherManagement();
    const tableRows = screen.getAllByTestId('table-row');
    expect(tableRows.length).toBeGreaterThan(0);
    
    const firstRow = tableRows[0];
    expect(firstRow).toHaveTextContent(/Prof\./);
    expect(firstRow).toHaveTextContent(/Ensino/);
    expect(firstRow).toHaveTextContent(/Ano/);
  });

  it('applies correct styling to degree and class cells', () => {
    renderTeacherManagement();
    const degreeCells = screen.getAllByTestId('cell-degree');
    const classCells = screen.getAllByTestId('cell-class');
    
    expect(degreeCells.length).toBeGreaterThan(0);
    expect(classCells.length).toBeGreaterThan(0);
    
    degreeCells.forEach(cell => {
      expect(cell).toHaveStyle({
        backgroundColor: expect.any(String),
        color: expect.any(String),
      });
    });
    
    classCells.forEach(cell => {
      expect(cell).toHaveStyle({
        backgroundColor: expect.any(String),
        color: expect.any(String),
      });
    });
  });
}); 