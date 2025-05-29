import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import Footer from '../../../components/layout/Footer';
import { getTheme } from '../../../styles/theme';

describe('Footer Component', () => {
  const renderFooter = (isDarkMode = false) => {
    const theme = getTheme(isDarkMode ? 'dark' : 'light');
    return render(
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    );
  };

  it('renders the company name', () => {
    renderFooter();
    expect(screen.getByText('Gestão Escolar')).toBeInTheDocument();
  });

  it('renders the company description', () => {
    renderFooter();
    expect(screen.getByText(/Uma solução completa para gerenciar sua instituição de ensino/)).toBeInTheDocument();
  });

  it('renders social media icons', () => {
    renderFooter();
    expect(screen.getByTestId('FacebookIcon')).toBeInTheDocument();
    expect(screen.getByTestId('TwitterIcon')).toBeInTheDocument();
    expect(screen.getByTestId('InstagramIcon')).toBeInTheDocument();
  });

  it('renders quick links section', () => {
    renderFooter();
    expect(screen.getByText('Links Rápidos')).toBeInTheDocument();
    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Professores')).toBeInTheDocument();
    expect(screen.getByText('Alunos')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    renderFooter();
    expect(screen.getByText('Contato')).toBeInTheDocument();
    expect(screen.getByText('contato@gestaoescolar.com')).toBeInTheDocument();
    expect(screen.getByText('(123) 456-7890')).toBeInTheDocument();
    expect(screen.getByText('Rua da Educação, 123, Cidade do Aprendizado')).toBeInTheDocument();
  });

  it('renders copyright information', () => {
    renderFooter();
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Gestão Escolar. Todos os direitos reservados.`)).toBeInTheDocument();
  });

  it('renders with dark theme', () => {
    renderFooter(true);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveStyle({
      background: expect.stringContaining('linear-gradient'),
    });
  });

  it('renders with light theme', () => {
    renderFooter(false);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveStyle({
      background: expect.stringContaining('linear-gradient'),
    });
  });
}); 