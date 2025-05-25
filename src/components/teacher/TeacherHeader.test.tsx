import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import TeacherHeader from './TeacherHeader';

describe('TeacherHeader', () => {
  const theme = createTheme();

  const renderWithTheme = (children: React.ReactNode) => {
    return render(
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    );
  };

  it('should render the header with correct title', () => {
    renderWithTheme(<TeacherHeader />);
    expect(screen.getByText('Gerenciamento de Professores')).toBeInTheDocument();
  });

  it('should render the avatar with SchoolIcon', () => {
    renderWithTheme(<TeacherHeader />);
    const avatar = screen.getByTestId('SchoolIcon');
    expect(avatar).toBeInTheDocument();
    expect(avatar.closest('.MuiAvatar-root')).toHaveClass('MuiAvatar-root');
  });

  it('should have correct layout structure', () => {
    const { container } = renderWithTheme(<TeacherHeader />);
    
    const headerBox = container.firstChild;
    expect(headerBox).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      gap: '16px', // 2 * 8px (theme spacing)
      marginBottom: '24px', // 3 * 8px (theme spacing)
    });
  });

  it('should have responsive typography', () => {
    renderWithTheme(<TeacherHeader />);
    const title = screen.getByText('Gerenciamento de Professores');
    
    expect(title).toHaveStyle({
      fontSize: expect.stringMatching(/1\.75rem|2rem|2\.25rem/),
      fontWeight: '700',
      letterSpacing: '-0.5px',
    });
  });

  it('should have correct avatar styling', () => {
    renderWithTheme(<TeacherHeader />);
    const avatar = screen.getByTestId('SchoolIcon').closest('.MuiAvatar-root');
    
    expect(avatar).toHaveStyle({
      width: '56px',
      height: '56px',
    });
  });

  it('should maintain styling in dark mode', () => {
    const darkTheme = createTheme({ palette: { mode: 'dark' } });
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <TeacherHeader />
      </ThemeProvider>
    );

    const headerBox = container.firstChild;
    expect(headerBox).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
    });
  });

  it('should maintain styling in light mode', () => {
    const lightTheme = createTheme({ palette: { mode: 'light' } });
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <TeacherHeader />
      </ThemeProvider>
    );

    const headerBox = container.firstChild;
    expect(headerBox).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
    });
  });
}); 