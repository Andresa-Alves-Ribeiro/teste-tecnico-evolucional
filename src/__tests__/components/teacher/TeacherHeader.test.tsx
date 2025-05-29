import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import TeacherHeader from '../../../components/teacher/TeacherHeader';

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
    const avatarContainer = screen.getByRole('presentation');
    expect(avatarContainer).toHaveClass('MuiAvatar-root');
  });

  it('should have correct layout structure', () => {
    renderWithTheme(<TeacherHeader />);
    const headerBox = screen.getByRole('banner');
    expect(headerBox).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '24px',
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
    const avatarContainer = screen.getByRole('presentation');
    
    expect(avatarContainer).toHaveStyle({
      width: '56px',
      height: '56px',
    });
  });

  it('should maintain styling in dark mode', () => {
    const darkTheme = createTheme({ palette: { mode: 'dark' } });
    render(
      <ThemeProvider theme={darkTheme}>
        <TeacherHeader />
      </ThemeProvider>
    );

    const headerBox = screen.getByRole('banner');
    expect(headerBox).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
    });
  });

  it('should maintain styling in light mode', () => {
    const lightTheme = createTheme({ palette: { mode: 'light' } });
    render(
      <ThemeProvider theme={lightTheme}>
        <TeacherHeader />
      </ThemeProvider>
    );

    const headerBox = screen.getByRole('banner');
    expect(headerBox).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
    });
  });
}); 