import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import Layout from './Layout';
import { AppProvider } from '../../context/AppContext';

// Mock dos componentes filhos
jest.mock('./Header', () => () => <div data-testid="mock-header">Header</div>);
jest.mock('./Footer', () => () => <div data-testid="mock-footer">Footer</div>);
jest.mock('../common/SmoothScroll', () => ({ children }: { children: React.ReactNode }) => (
  <div data-testid="mock-smooth-scroll">{children}</div>
));

describe('Layout', () => {
  const theme = createTheme();

  const renderWithProviders = (children: React.ReactNode) => {
    return render(
      <ThemeProvider theme={theme}>
        <AppProvider>
          {children}
        </AppProvider>
      </ThemeProvider>
    );
  };

  it('should render all layout components', () => {
    renderWithProviders(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByTestId('mock-smooth-scroll')).toBeInTheDocument();
  });

  it('should render children content', () => {
    renderWithProviders(
      <Layout>
        <div data-testid="test-content">Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should have correct layout structure', () => {
    const { container } = renderWithProviders(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Verifica se o container principal tem a estrutura correta
    const mainContainer = container.firstChild?.firstChild;
    expect(mainContainer).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    });

    // Verifica se o conteúdo principal está dentro de um Container do MUI
    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
  });

  it('should handle multiple children', () => {
    renderWithProviders(
      <Layout>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </Layout>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });
}); 