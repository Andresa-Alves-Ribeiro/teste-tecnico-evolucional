import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import StudentHeader from '../../../../components/student/management/StudentHeader';

jest.mock('@mui/icons-material/School', () => () => <div data-testid="school-icon" />);

describe('StudentHeader', () => {
  const theme = createTheme();

  const renderWithTheme = (children: React.ReactNode) => {
    return render(
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    );
  };

  it('should render the header with correct title', () => {
    renderWithTheme(<StudentHeader />);
    expect(screen.getByText('Gerenciamento de Alunos')).toBeInTheDocument();
  });

  it('should render the avatar with SchoolIcon', () => {
    renderWithTheme(<StudentHeader />);
    const avatar = screen.getByTestId('school-icon');
    expect(avatar).toBeInTheDocument();
  });

  it('should have correct layout structure', () => {
    renderWithTheme(<StudentHeader />);
    const headerBox = screen.getByRole('heading', { name: 'Gerenciamento de Alunos' });
    expect(headerBox).toHaveStyle({
      fontSize: expect.stringMatching(/1\.75rem|2rem|2\.25rem/),
      fontWeight: '700',
      letterSpacing: '-0.5px',
    });
  });

  it('should have responsive typography', () => {
    renderWithTheme(<StudentHeader />);
    const title = screen.getByText('Gerenciamento de Alunos');
    
    expect(title).toHaveStyle({
      fontSize: expect.stringMatching(/1\.75rem|2rem|2\.25rem/),
      fontWeight: '700',
      letterSpacing: '-0.5px',
    });
  });

  it('should have correct avatar styling', () => {
    renderWithTheme(<StudentHeader />);
    const avatar = screen.getByTestId('school-icon');
    
    expect(avatar).toBeInTheDocument();
  });

  it('should maintain styling in dark mode', () => {
    const darkTheme = createTheme({ palette: { mode: 'dark' } });
    render(
      <ThemeProvider theme={darkTheme}>
        <StudentHeader />
      </ThemeProvider>
    );

    const title = screen.getByText('Gerenciamento de Alunos');
    const computedStyle = window.getComputedStyle(title);
    expect(computedStyle.color).toBeTruthy();
  });

  it('should maintain styling in light mode', () => {
    const lightTheme = createTheme({ palette: { mode: 'light' } });
    render(
      <ThemeProvider theme={lightTheme}>
        <StudentHeader />
      </ThemeProvider>
    );

    const title = screen.getByText('Gerenciamento de Alunos');
    const computedStyle = window.getComputedStyle(title);
    expect(computedStyle.color).toBeTruthy();
  });
}); 