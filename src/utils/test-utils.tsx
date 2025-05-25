import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import { getTheme } from '../styles/theme';

// Mock matchMedia
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

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider theme={getTheme()}>
        <AppProvider>{children}</AppProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

const customRender = async (ui: React.ReactElement, options = {}) => {
  const result = render(ui, { wrapper: AllTheProviders, ...options });
  return result;
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render }; 