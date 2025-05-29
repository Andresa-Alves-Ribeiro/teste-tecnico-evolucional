import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import App from '../App';
import { AppProvider } from '../context/AppContext';
import { getTheme } from '../styles/theme';

jest.mock('@mui/material/useMediaQuery', () => {
  return jest.fn().mockImplementation(() => false);
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }: any) => <div>{children}</div>,
  Routes: ({ children }: any) => <div>{children}</div>,
  Route: ({ element }: any) => <div>{element}</div>,
  useNavigate: () => jest.fn(),
}));

jest.mock('../components/student/StudentManagement', () => () => (
  <div data-testid="student-management">Student Management</div>
));

jest.mock('../components/teacher/TeacherManagement', () => () => (
  <div data-testid="teacher-management">Teacher Management</div>
));

jest.mock('../components/layout/Layout', () => ({ children }: any) => (
  <div data-testid="layout">{children}</div>
));

jest.mock('../components/common/ActionFeedback', () => ({ open, message, severity }: any) => (
  open ? <div data-testid="feedback-message">{message}</div> : null
));

jest.mock('../components/common/Loading', () => ({ fullScreen }: any) => (
  fullScreen ? <div data-testid="loading-skeleton">Loading...</div> : null
));

jest.mock('../components/common/PageTransition', () => ({ children }: any) => (
  <div data-testid="page-transition">{children}</div>
));

const renderApp = () => {
  return render(
    <ThemeProvider theme={getTheme('light')}>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  );
};

describe('App Component', () => {
  it('renders student management by default', () => {
    renderApp();
    expect(screen.getByTestId('student-management')).toBeInTheDocument();
  });

  it('renders layout component', () => {
    renderApp();
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('renders page transition component', () => {
    renderApp();
    const pageTransitions = screen.getAllByTestId('page-transition');
    expect(pageTransitions.length).toBeGreaterThan(0);
    expect(pageTransitions[0]).toBeInTheDocument();
  });

  it('does not show loading component by default', () => {
    renderApp();
    expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
  });

  it('does not show feedback message by default', () => {
    renderApp();
    expect(screen.queryByTestId('feedback-message')).not.toBeInTheDocument();
  });
}); 