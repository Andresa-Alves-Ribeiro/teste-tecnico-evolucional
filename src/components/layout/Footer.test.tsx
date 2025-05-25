import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import Footer from './Footer';

describe('Footer', () => {
  const theme = createTheme();

  const renderWithTheme = (children: React.ReactNode) => {
    return render(
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    );
  };

  it('should render company information', () => {
    renderWithTheme(<Footer />);

    expect(screen.getByText('Gestão Escolar')).toBeInTheDocument();
    expect(screen.getByText(/Uma solução completa para gerenciar sua instituição de ensino/)).toBeInTheDocument();
  });

  it('should render social media links', () => {
    renderWithTheme(<Footer />);

    expect(screen.getByTestId('FacebookIcon')).toBeInTheDocument();
    expect(screen.getByTestId('TwitterIcon')).toBeInTheDocument();
    expect(screen.getByTestId('InstagramIcon')).toBeInTheDocument();
  });

  it('should render quick links section', () => {
    renderWithTheme(<Footer />);

    expect(screen.getByText('Links Rápidos')).toBeInTheDocument();
    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Professores')).toBeInTheDocument();
    expect(screen.getByText('Alunos')).toBeInTheDocument();
  });

  it('should render contact information', () => {
    renderWithTheme(<Footer />);

    expect(screen.getByText('Contato')).toBeInTheDocument();
    expect(screen.getByText('contato@gestaoescolar.com')).toBeInTheDocument();
    expect(screen.getByText('(123) 456-7890')).toBeInTheDocument();
    expect(screen.getByText('Rua da Educação, 123, Cidade do Aprendizado')).toBeInTheDocument();
  });

  it('should render copyright information', () => {
    renderWithTheme(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Gestão Escolar. Todos os direitos reservados.`)).toBeInTheDocument();
  });

  it('should render all sections in correct order', () => {
    const { container } = renderWithTheme(<Footer />);

    const sections = container.querySelectorAll('.MuiGrid-item');
    expect(sections).toHaveLength(3); // Company Info, Quick Links, Contact Info
  });

  it('should have correct styling for dark mode', () => {
    const darkTheme = createTheme({ palette: { mode: 'dark' } });
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <Footer />
      </ThemeProvider>
    );

    const footer = container.firstChild;
    expect(footer).toHaveStyle({
      background: expect.stringContaining('linear-gradient'),
    });
  });

  it('should have correct styling for light mode', () => {
    const lightTheme = createTheme({ palette: { mode: 'light' } });
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Footer />
      </ThemeProvider>
    );

    const footer = container.firstChild;
    expect(footer).toHaveStyle({
      background: expect.stringContaining('linear-gradient'),
    });
  });

  it('should render all icons', () => {
    renderWithTheme(<Footer />);

    expect(screen.getByTestId('FacebookIcon')).toBeInTheDocument();
    expect(screen.getByTestId('TwitterIcon')).toBeInTheDocument();
    expect(screen.getByTestId('InstagramIcon')).toBeInTheDocument();
    expect(screen.getByTestId('EmailIcon')).toBeInTheDocument();
    expect(screen.getByTestId('PhoneIcon')).toBeInTheDocument();
    expect(screen.getByTestId('LocationOnIcon')).toBeInTheDocument();
    expect(screen.getAllByTestId('ArrowForwardIcon')).toHaveLength(3);
  });
}); 