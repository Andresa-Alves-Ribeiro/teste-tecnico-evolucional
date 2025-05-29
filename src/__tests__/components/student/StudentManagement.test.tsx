import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import StudentManagement from '../../../components/student/StudentManagement';
import { getTheme } from '../../../styles/theme';

jest.mock('../../../components/student/management/StudentHeader', () => () => <div data-testid="student-header">Student Header</div>);
jest.mock('../../../components/student/management/StudentStats', () => ({ totalStudents, totalDegrees, totalClasses }: any) => (
  <div data-testid="student-stats">
    <div data-testid="total-students">{totalStudents}</div>
    <div data-testid="total-degrees">{totalDegrees}</div>
    <div data-testid="total-classes">{totalClasses}</div>
  </div>
));
jest.mock('../../../components/student/StudentFilters', () => ({ onDegreeChange, onClassChange, onGenerateStudents }: any) => (
  <div data-testid="student-filters">
    <button onClick={() => onDegreeChange(1)} data-testid="degree-filter">Filter by Degree</button>
    <button onClick={() => onClassChange(1)} data-testid="class-filter">Filter by Class</button>
    <button onClick={onGenerateStudents} data-testid="generate-students">Generate Students</button>
  </div>
));
jest.mock('../../../components/student/StudentChart', () => ({ chartData }: any) => (
  <div data-testid="student-chart">{JSON.stringify(chartData)}</div>
));
jest.mock('../../../components/common/DataTable', () => ({ items, onEdit, onSave, editingItem, onEditingItemChange, getDegreeColor, getClassColor }: any) => (
  <div data-testid="data-table">
    <div data-testid="table-items">{items.length}</div>
    <button onClick={() => onEdit(items[0])} data-testid="edit-button">Edit</button>
    <button onClick={() => onSave(items[0])} data-testid="save-button">Save</button>
    <div data-testid="editing-item">{editingItem ? 'editing' : 'not editing'}</div>
    <button onClick={() => onEditingItemChange(items[0])} data-testid="editing-item-change">Change Editing Item</button>
  </div>
));

const renderStudentManagement = () => {
  return render(
    <ThemeProvider theme={getTheme('light')}>
      <StudentManagement />
    </ThemeProvider>
  );
};

describe('StudentManagement Component', () => {
  it('renders all main components', () => {
    renderStudentManagement();
    expect(screen.getByTestId('student-header')).toBeInTheDocument();
    expect(screen.getByTestId('student-stats')).toBeInTheDocument();
    expect(screen.getByTestId('student-filters')).toBeInTheDocument();
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
    expect(screen.getByTestId('student-chart')).toBeInTheDocument();
  });

  it('filters students by degree', async () => {
    renderStudentManagement();
    const degreeFilter = screen.getByTestId('degree-filter');
    
    await userEvent.click(degreeFilter);
    
    await waitFor(() => {
      const tableItems = screen.getByTestId('table-items');
      expect(tableItems).toBeInTheDocument();
    });
  });

  it('filters students by class', async () => {
    renderStudentManagement();
    const classFilter = screen.getByTestId('class-filter');
    
    await userEvent.click(classFilter);
    
    await waitFor(() => {
      const tableItems = screen.getByTestId('table-items');
      expect(tableItems).toBeInTheDocument();
    });
  });

  it('generates random students', async () => {
    renderStudentManagement();
    const generateButton = screen.getByTestId('generate-students');
    
    await userEvent.click(generateButton);
    
    await waitFor(() => {
      const totalStudents = screen.getByTestId('total-students');
      expect(parseInt(totalStudents.textContent ?? '0')).toBeGreaterThan(0);
    });
  });

  it('handles student editing', async () => {
    renderStudentManagement();
    const editButton = screen.getByTestId('edit-button');
    
    await userEvent.click(editButton);
    
    const saveButton = screen.getByTestId('save-button');
    
    await userEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('data-table')).toBeInTheDocument();
    });
  });

  it('updates chart data when students change', async () => {
    renderStudentManagement();
    const generateButton = screen.getByTestId('generate-students');
    
    await userEvent.click(generateButton);
    
    await waitFor(() => {
      const chart = screen.getByTestId('student-chart');
      expect(chart.textContent).not.toBe('[]');
    });
  });
}); 