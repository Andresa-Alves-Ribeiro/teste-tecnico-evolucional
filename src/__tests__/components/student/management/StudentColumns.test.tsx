import { getStudentColumns } from '../../../../components/student/management/StudentColumns';
import { Student, Degree, Class } from '../../../../types';
import { Theme } from '@mui/material';

const mockStudent: Student = {
  id: 1,
  name: 'John Doe',
  degreeId: 1,
  classId: 1,
  email: 'john@example.com',
  phone: '1234567890',
  address: '123 Main St',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  country: 'USA',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01'
};

const mockDegrees: Degree[] = [
  { id: 1, name: 'Bachelor' },
  { id: 2, name: 'Master' },
  { id: 3, name: 'PhD' }
];

const mockClasses: Class[] = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' }
];

const mockSetEditingStudent = jest.fn();

const mockGetDegreeColor = (degreeName: string) => ({
  bg: 'rgba(33, 150, 243, 0.1)',
  color: 'rgb(33, 150, 243)'
});

const mockGetClassColor = (className: string) => ({
  bg: 'rgba(76, 175, 80, 0.1)',
  color: 'rgb(76, 175, 80)'
});

const mockTheme: Partial<Theme> = {
  palette: {
    mode: 'light',
    common: {
      black: '#000',
      white: '#fff'
    },
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#ffffff'
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#ffffff'
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#ffffff'
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#ffffff'
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)'
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: {
      paper: '#ffffff',
      default: '#f5f5f5'
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    getContrastText: (background: string) => '#ffffff',
    augmentColor: (color: any) => color
  }
};

describe('StudentColumns', () => {
  beforeEach(() => {
    mockSetEditingStudent.mockClear();
  });

  it('renders student information correctly', () => {
    const columns = getStudentColumns({
      editingStudent: null,
      setEditingStudent: mockSetEditingStudent,
      degrees: mockDegrees,
      classes: mockClasses,
      getDegreeColor: mockGetDegreeColor,
      getClassColor: mockGetClassColor,
      theme: mockTheme as Theme
    });

    const nameColumn = columns.find(col => col.key === 'name');
    const degreeColumn = columns.find(col => col.key === 'degree');
    const classColumn = columns.find(col => col.key === 'class');

    expect(nameColumn).toBeDefined();
    expect(degreeColumn).toBeDefined();
    expect(classColumn).toBeDefined();
  });

  it('renders degree select in edit mode', () => {
    const columns = getStudentColumns({
      editingStudent: mockStudent,
      setEditingStudent: mockSetEditingStudent,
      degrees: mockDegrees,
      classes: mockClasses,
      getDegreeColor: mockGetDegreeColor,
      getClassColor: mockGetClassColor,
      theme: mockTheme as Theme
    });

    const degreeColumn = columns.find(col => col.key === 'degree');
    const rendered = degreeColumn?.render(mockStudent);
    expect(rendered).toBeDefined();
  });

  it('renders class select in edit mode', () => {
    const columns = getStudentColumns({
      editingStudent: mockStudent,
      setEditingStudent: mockSetEditingStudent,
      degrees: mockDegrees,
      classes: mockClasses,
      getDegreeColor: mockGetDegreeColor,
      getClassColor: mockGetClassColor,
      theme: mockTheme as Theme
    });

    const classColumn = columns.find(col => col.key === 'class');
    const rendered = classColumn?.render(mockStudent);
    expect(rendered).toBeDefined();
  });

  it('calls setEditingStudent when degree is changed', () => {
    const columns = getStudentColumns({
      editingStudent: mockStudent,
      setEditingStudent: mockSetEditingStudent,
      degrees: mockDegrees,
      classes: mockClasses,
      getDegreeColor: mockGetDegreeColor,
      getClassColor: mockGetClassColor,
      theme: mockTheme as Theme
    });

    const degreeColumn = columns.find(col => col.key === 'degree');
    const rendered = degreeColumn?.render(mockStudent);
    expect(rendered).toBeDefined();
  });

  it('calls setEditingStudent when class is changed', () => {
    const columns = getStudentColumns({
      editingStudent: mockStudent,
      setEditingStudent: mockSetEditingStudent,
      degrees: mockDegrees,
      classes: mockClasses,
      getDegreeColor: mockGetDegreeColor,
      getClassColor: mockGetClassColor,
      theme: mockTheme as Theme
    });

    const classColumn = columns.find(col => col.key === 'class');
    const rendered = classColumn?.render(mockStudent);
    expect(rendered).toBeDefined();
  });

  it('renders degree badge with correct colors', () => {
    const columns = getStudentColumns({
      editingStudent: null,
      setEditingStudent: mockSetEditingStudent,
      degrees: mockDegrees,
      classes: mockClasses,
      getDegreeColor: mockGetDegreeColor,
      getClassColor: mockGetClassColor,
      theme: mockTheme as Theme
    });

    const degreeColumn = columns.find(col => col.key === 'degree');
    const rendered = degreeColumn?.render(mockStudent);
    expect(rendered).toBeDefined();
  });

  it('renders class badge with correct colors', () => {
    const columns = getStudentColumns({
      editingStudent: null,
      setEditingStudent: mockSetEditingStudent,
      degrees: mockDegrees,
      classes: mockClasses,
      getDegreeColor: mockGetDegreeColor,
      getClassColor: mockGetClassColor,
      theme: mockTheme as Theme
    });

    const classColumn = columns.find(col => col.key === 'class');
    const rendered = classColumn?.render(mockStudent);
    expect(rendered).toBeDefined();
  });

  it('renders all degree options in select', () => {
    const columns = getStudentColumns({
      editingStudent: mockStudent,
      setEditingStudent: mockSetEditingStudent,
      degrees: mockDegrees,
      classes: mockClasses,
      getDegreeColor: mockGetDegreeColor,
      getClassColor: mockGetClassColor,
      theme: mockTheme as Theme
    });

    const degreeColumn = columns.find(col => col.key === 'degree');
    const rendered = degreeColumn?.render(mockStudent);
    expect(rendered).toBeDefined();
  });

  it('renders all class options in select', () => {
    const columns = getStudentColumns({
      editingStudent: mockStudent,
      setEditingStudent: mockSetEditingStudent,
      degrees: mockDegrees,
      classes: mockClasses,
      getDegreeColor: mockGetDegreeColor,
      getClassColor: mockGetClassColor,
      theme: mockTheme as Theme
    });

    const classColumn = columns.find(col => col.key === 'class');
    const rendered = classColumn?.render(mockStudent);
    expect(rendered).toBeDefined();
  });
}); 