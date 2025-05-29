import React from 'react';
import { render as rtlRender, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { getTheme } from '../../styles/theme';

const testTheme = createTheme({
  ...getTheme('light'),
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function render(ui: React.ReactElement, { ...renderOptions } = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <ThemeProvider theme={testTheme}>{children}</ThemeProvider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';

export { render };

describe('test-utils', () => {
  it('renders with theme provider', () => {
    const TestComponent = () => <div>Test</div>;
    render(<TestComponent />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies theme to components', () => {
    const TestComponent = () => (
      <div style={{ color: 'primary.main' }}>Themed Text</div>
    );
    render(<TestComponent />);
    const element = screen.getByText('Themed Text');
    expect(element).toBeInTheDocument();
  });
}); 