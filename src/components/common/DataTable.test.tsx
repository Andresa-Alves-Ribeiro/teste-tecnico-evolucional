import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../utils/test-utils';
import DataTable from './DataTable';

// Mock useMediaQuery
jest.mock('@mui/material/useMediaQuery', () => {
  return jest.fn().mockImplementation(() => false);
});

const mockData = [
  { id: 1, name: 'John Doe', degree: 'Bachelor', class: 'A' },
  { id: 2, name: 'Jane Smith', degree: 'Master', class: 'B' },
];

const mockColumns = [
  { key: 'name', label: 'Name', width: 200 },
  { key: 'degree', label: 'Degree', width: 150 },
  { key: 'class', label: 'Class', width: 100 },
];

const renderDataTable = (props = {}) => {
  return render(
    <DataTable
      title="Test Table"
      items={mockData}
      columns={mockColumns}
      onEdit={() => { }}
      onSave={() => { }}
      onShowDetails={() => { }}
      {...props}
    />
  );
};

describe('DataTable Component', () => {
  it('renders table with title', () => {
    renderDataTable();
    expect(screen.getByText('Test Table')).toBeInTheDocument();
  });

  it('renders all items', () => {
    renderDataTable();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders all columns', () => {
    renderDataTable();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Degree')).toBeInTheDocument();
    expect(screen.getByText('Class')).toBeInTheDocument();
  });

  it('handles edit mode correctly', () => {
    const onEdit = jest.fn();
    renderDataTable({ onEdit });

    const editButton = screen.getAllByRole('button', { name: /editar/i })[0];
    fireEvent.click(editButton);

    expect(onEdit).toHaveBeenCalledWith(mockData[0]);
  });

  it('handles save action correctly', () => {
    const onSave = jest.fn();
    renderDataTable({ onSave, editingItem: mockData[0] });

    const saveButton = screen.getByRole('button', { name: /salvar/i });
    fireEvent.click(saveButton);

    expect(onSave).toHaveBeenCalledWith(mockData[0]);
  });

  it('handles show details action correctly', () => {
    const onShowDetails = jest.fn();
    renderDataTable({ onShowDetails });

    const detailsButton = screen.getAllByRole('button', { name: /ver detalhes/i })[0];
    fireEvent.click(detailsButton);

    expect(onShowDetails).toHaveBeenCalledWith(mockData[0].id);
  });

  it('applies degree color styling correctly', () => {
    const getDegreeColor = (degree: string) => ({
      bg: 'rgba(25, 118, 210, 0.1)',
      color: 'rgb(31, 41, 55)',
    });
    renderDataTable({ getDegreeColor });
    const degreeCell = screen.getByText('Bachelor');
    expect(degreeCell).toHaveStyle({
      color: 'rgb(31, 41, 55)',
    });
  });

  it('applies class color styling correctly', () => {
    const getClassColor = (className: string) => ({
      bg: 'rgba(25, 118, 210, 0.1)',
      color: 'rgb(31, 41, 55)',
    });
    renderDataTable({ getClassColor });
    const classCell = screen.getByText('A');
    expect(classCell).toHaveStyle({
      color: 'rgb(31, 41, 55)',
    });
  });
}); 