import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material';
import FiltersPanel from '../../../components/common/FiltersPanel';
import { getTheme } from '../../../styles/theme';
import { render as customRender } from '../../../utils/test-utils';

jest.mock('@mui/material/useMediaQuery', () => {
  return jest.fn().mockImplementation(() => false);
});

jest.mock('@mui/icons-material/Add', () => () => <div data-testid="add-icon" />);
jest.mock('@mui/icons-material/School', () => () => <div data-testid="school-icon" />);
jest.mock('@mui/icons-material/Class', () => () => <div data-testid="class-icon" />);
jest.mock('@mui/icons-material/FilterList', () => () => <div data-testid="filter-icon" />);

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Box: ({ children, sx, ...props }: any) => (
    <div
      {...props}
      style={{
        ...(sx?.display && { display: sx.display }),
        ...(sx?.flexDirection && { flexDirection: sx.flexDirection }),
        ...(sx?.gap && { gap: sx.gap }),
        ...(sx?.alignItems && { alignItems: sx.alignItems }),
        ...(sx?.mb && { marginBottom: sx.mb }),
      }}
    >
      {children}
    </div>
  ),
  Paper: ({ children, sx, ...props }: any) => {
    const isDark = props['data-theme'] === 'dark';
    const style = {
      padding: sx?.p || '16px',
      borderRadius: sx?.borderRadius || '3px',
      background: isDark
        ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.98))'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.98))',
      boxShadow: isDark
        ? '0 4px 24px rgba(0, 0, 0, 0.3)'
        : '0 4px 24px rgba(0, 0, 0, 0.06)',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease-in-out',
      ...(sx?.['&:hover'] && { '&:hover': sx['&:hover'] }),
    };

    return (
      <div
        data-testid="filters-panel"
        {...props}
        style={style}
      >
        {children}
      </div>
    );
  },
  FormControl: ({ children, fullWidth, sx, ...props }: any) => (
    <div
      {...props}
      style={{
        ...(fullWidth && { width: '100%' }),
        ...(sx?.minWidth && { minWidth: sx.minWidth }),
      }}
    >
      {children}
    </div>
  ),
  InputLabel: ({ children, ...props }: any) => (
    <label {...props}>{children}</label>
  ),
  Select: ({ value, onChange, children, label, ...props }: any) => {
    const { labelId, ...restProps } = props;
    return (
      <select
        value={value}
        onChange={onChange}
        aria-label={label}
        {...restProps}
      >
        {children}
      </select>
    );
  },
  MenuItem: ({ value, children, ...props }: any) => {
    const content = typeof children === 'object' && children?.props?.label ? children.props.label : children;
    return (
      <option value={value} {...props}>
        {content}
      </option>
    );
  },
  Button: ({ children, onClick, startIcon, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {startIcon}
      {children}
    </button>
  ),
  Stack: ({ children, direction, spacing, alignItems, sx, ...props }: any) => (
    <div
      {...props}
      style={{
        ...(direction && { flexDirection: direction }),
        ...(spacing && { gap: spacing }),
        ...(alignItems && { alignItems }),
        ...(sx?.mb && { marginBottom: sx.mb }),
      }}
    >
      {children}
    </div>
  ),
  Typography: ({ children, variant, sx, ...props }: any) => {
    const Tag = variant === 'h6' ? 'h6' : 'p';
    return (
      <Tag
        {...props}
        style={{
          ...(sx?.fontWeight && { fontWeight: sx.fontWeight }),
          ...(sx?.color && { color: sx.color }),
          ...(sx?.fontSize && { fontSize: sx.fontSize }),
        }}
      >
        {children}
      </Tag>
    );
  },
  Chip: ({ label, size, sx, ...props }: any) => (
    <span
      {...props}
      style={{
        ...(sx?.backgroundColor && { backgroundColor: sx.backgroundColor }),
        ...(sx?.color && { color: sx.color }),
        ...(sx?.fontWeight && { fontWeight: sx.fontWeight }),
      }}
    >
      {label}
    </span>
  ),
}));

const defaultProps = {
  title: 'Filters',
  selectedDegree: '' as number | '',
  selectedClass: '' as number | '',
  degrees: [
    { id: 1, name: '1ª Série' },
    { id: 2, name: '2ª Série' },
  ],
  classes: [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
  ],
  onDegreeChange: jest.fn(),
  onClassChange: jest.fn(),
};

const renderFiltersPanel = async (props = {}, theme: 'light' | 'dark' = 'light') => {
  return customRender(
    <ThemeProvider theme={getTheme(theme)}>
      <FiltersPanel {...defaultProps} {...props} />
    </ThemeProvider>
  );
};

describe('FiltersPanel', () => {
  it('renders with title', async () => {
    await renderFiltersPanel();
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('renders all filters', async () => {
    await renderFiltersPanel();
    expect(screen.getByLabelText('Série')).toBeInTheDocument();
    expect(screen.getByLabelText('Classe')).toBeInTheDocument();
  });

  it('calls onDegreeChange when selecting a degree', async () => {
    await renderFiltersPanel();
    const degreeSelect = screen.getByLabelText('Série');
    fireEvent.change(degreeSelect, { target: { value: '1' } });
    expect(defaultProps.onDegreeChange).toHaveBeenCalledWith('1');
  });

  it('calls onClassChange when selecting a class', async () => {
    await renderFiltersPanel();
    const classSelect = screen.getByLabelText('Classe');
    fireEvent.change(classSelect, { target: { value: '1' } });
    expect(defaultProps.onClassChange).toHaveBeenCalledWith('1');
  });

  it('renders action button when provided', async () => {
    const actionButton = {
      label: 'Action',
      onClick: jest.fn(),
    };
    await renderFiltersPanel({ actionButton });
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('should handle empty selections', async () => {
    await renderFiltersPanel();
    const degreeSelect = screen.getByLabelText('Série');
    const classSelect = screen.getByLabelText('Classe');
    
    fireEvent.change(degreeSelect, { target: { value: '' } });
    fireEvent.change(classSelect, { target: { value: '' } });
    
    expect(defaultProps.onDegreeChange).toHaveBeenCalledWith('');
    expect(defaultProps.onClassChange).toHaveBeenCalledWith('');
  });

  it('should maintain selected values', async () => {
    await renderFiltersPanel({
      selectedDegree: '1',
      selectedClass: '1',
    });
    
    const degreeSelect = screen.getByLabelText('Série');
    const classSelect = screen.getByLabelText('Classe');
    
    expect(degreeSelect).toHaveValue('1');
    expect(classSelect).toHaveValue('1');
  });

  it('should render all icons', async () => {
    await renderFiltersPanel();
    expect(screen.getByTestId('filter-icon')).toBeInTheDocument();
    expect(screen.getAllByTestId('school-icon')).toHaveLength(1);
    expect(screen.getAllByTestId('class-icon')).toHaveLength(1);
  });

  it('should render degree select with all options', async () => {
    await renderFiltersPanel();
    
    const degreeSelect = screen.getByLabelText('Série');
    expect(degreeSelect).toBeInTheDocument();
    
    fireEvent.mouseDown(degreeSelect);
    
    expect(screen.getByText('Todas as Séries')).toBeInTheDocument();
    expect(screen.getByText('1ª Série')).toBeInTheDocument();
    expect(screen.getByText('2ª Série')).toBeInTheDocument();
  });

  it('should render class select with all options', async () => {
    await renderFiltersPanel();
    
    const classSelect = screen.getByLabelText('Classe');
    expect(classSelect).toBeInTheDocument();
    
    fireEvent.mouseDown(classSelect);
    
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('should have correct styling in dark mode', async () => {
    await renderFiltersPanel({}, 'dark');
    const panel = screen.getByTestId('filters-panel');
    const style = panel.getAttribute('style');
    expect(style).toContain('border-radius: 3px');
    expect(style).toContain('box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3)');
    expect(style).toContain('border: 1px solid rgba(255, 255, 255, 0.2)');
  });

  it('should have correct styling in light mode', async () => {
    await renderFiltersPanel({}, 'light');
    const panel = screen.getByTestId('filters-panel');
    const style = panel.getAttribute('style');
    expect(style).toContain('border-radius: 3px');
    expect(style).toContain('box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06)');
    expect(style).toContain('border: 1px solid rgba(0, 0, 0, 0.1)');
  });

  it('should render action button with icon', async () => {
    const actionButton = {
      label: 'Add New',
      onClick: jest.fn(),
      icon: <div data-testid="custom-icon" />,
    };
    await renderFiltersPanel({ actionButton });
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('should render action button with default icon when not provided', async () => {
    const actionButton = {
      label: 'Add New',
      onClick: jest.fn(),
    };
    await renderFiltersPanel({ actionButton });
    expect(screen.getByTestId('add-icon')).toBeInTheDocument();
  });
}); 