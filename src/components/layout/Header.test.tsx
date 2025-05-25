import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { AppProvider } from '../../context/AppContext';
import * as useMediaQuery from '@mui/material/useMediaQuery';
import * as useLocation from 'react-router-dom';

// Mock do useMediaQuery
jest.mock('@mui/material/useMediaQuery', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock do useLocation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

// Mock do useDarkMode
jest.mock('../../hooks/useDarkMode', () => ({
  useDarkMode: jest.fn(),
}));

describe('Header', () => {
  const theme = createTheme();
  const mockToggleDarkMode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    const { useDarkMode } = require('../../hooks/useDarkMode');
    useDarkMode.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    });
    (useLocation.useLocation as jest.Mock).mockReturnValue({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
    });
  });

  const renderWithProviders = (children: React.ReactNode) => {
    return render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppProvider>
            {children}
          </AppProvider>
        </BrowserRouter>
      </ThemeProvider>
    );
  };

  it('should render logo and navigation items', () => {
    renderWithProviders(<Header />);

    expect(screen.getByText('EduGestão')).toBeInTheDocument();
    expect(screen.getByText('Gerenciar Alunos')).toBeInTheDocument();
    expect(screen.getByText('Gerenciar Professores')).toBeInTheDocument();
  });

  it('should render mobile menu button on small screens', () => {
    (useMediaQuery.default as jest.Mock).mockReturnValue(true);

    renderWithProviders(<Header />);

    const menuButton = screen.getByLabelText('menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('should open mobile menu when clicking menu button', () => {
    (useMediaQuery.default as jest.Mock).mockReturnValue(true);

    renderWithProviders(<Header />);

    const menuButton = screen.getByLabelText('menu');
    fireEvent.click(menuButton);

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('should close mobile menu when clicking menu item', () => {
    (useMediaQuery.default as jest.Mock).mockReturnValue(true);

    renderWithProviders(<Header />);

    const menuButton = screen.getByLabelText('menu');
    fireEvent.click(menuButton);

    const menuItem = screen.getByText('Gerenciar Alunos');
    fireEvent.click(menuItem);

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should render desktop navigation on large screens', () => {
    (useMediaQuery.default as jest.Mock).mockReturnValue(false);

    renderWithProviders(<Header />);

    expect(screen.queryByLabelText('menu')).not.toBeInTheDocument();
    expect(screen.getByText('Gerenciar Alunos')).toBeInTheDocument();
    expect(screen.getByText('Gerenciar Professores')).toBeInTheDocument();
  });

  it('should highlight active navigation item', () => {
    renderWithProviders(<Header />);

    const activeLink = screen.getByText('Gerenciar Alunos');
    expect(activeLink).toHaveStyle({
      position: 'relative',
    });
  });

  it('should render theme toggle button', () => {
    renderWithProviders(<Header />);

    const themeToggle = screen.getByTestId('theme-toggle');
    expect(themeToggle).toBeInTheDocument();
  });

  it('should call toggleDarkMode when clicking theme toggle', () => {
    renderWithProviders(<Header />);

    const themeToggle = screen.getByTestId('theme-toggle');
    fireEvent.click(themeToggle);

    expect(mockToggleDarkMode).toHaveBeenCalled();
  });
}); 