import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatsCards from '../../../components/common/StatsCards';
import PeopleIcon from '@mui/icons-material/People';
import { getTheme } from '../../../styles/theme';
import { ThemeProvider } from '@mui/material/styles';

const defaultStats = [
  {
    title: 'Total Users',
    value: 1234,
    icon: PeopleIcon,
    color: '#2196f3',
  },
];

const renderStatsCards = (props = {}) => {
  const theme = getTheme('dark');
  return render(
    <ThemeProvider theme={theme}>
      <StatsCards stats={defaultStats} {...props} />
    </ThemeProvider>
  );
};

describe('StatsCards Component', () => {
  it('renders all stats cards', () => {
    renderStatsCards();
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    const value = screen.getByRole('heading', { level: 4 });
    expect(value).toHaveTextContent('1.234');
  });

  it('applies correct grid layout', () => {
    renderStatsCards();
    const container = screen.getByTestId('stats-container');
    expect(container).toHaveStyle({
      display: 'grid',
      gap: '24px',
      marginBottom: '32px',
    });
  });

  it('applies correct card styles', () => {
    renderStatsCards();
    const cards = screen.getAllByTestId('stats-card');
    const card = cards[0];
    
    // Check if the card has the required styles
    const computedStyle = window.getComputedStyle(card);
    expect(computedStyle.padding).toBe('24px');
    expect(computedStyle.borderRadius).toBe('12px');
    expect(computedStyle.transition).toBe('all 0.3s ease-in-out');
    expect(computedStyle.backgroundColor).toBe('rgb(31, 41, 55)');
  });

  it('applies correct avatar styles', () => {
    renderStatsCards();
    const avatar = screen.getByTestId('stats-avatar');
    expect(avatar).toHaveStyle({
      width: '48px',
      height: '48px',
    });
  });

  it('applies correct typography styles', () => {
    renderStatsCards();
    const value = screen.getByRole('heading', { level: 4 });
    expect(value).toHaveStyle({
      fontWeight: '700',
      marginBottom: '4px',
    });
  });

  it('renders with dark theme', () => {
    renderStatsCards();
    const cards = screen.getAllByTestId('stats-card');
    const computedStyle = window.getComputedStyle(cards[0]);
    expect(computedStyle.border).toBe('1px solid rgba(255, 255, 255, 0.2)');
  });

  it('applies hover styles', () => {
    renderStatsCards();
    const cards = screen.getAllByTestId('stats-card');
    expect(cards[0]).toHaveStyle({
      transition: 'all 0.3s ease-in-out',
    });
  });

  it('applies correct dark mode styles for avatar', () => {
    renderStatsCards();
    const avatar = screen.getByTestId('stats-avatar');
    const computedStyle = window.getComputedStyle(avatar);
    expect(computedStyle.backgroundColor).toBe('rgb(33, 150, 243)');
    expect(computedStyle.color).toBe('rgb(255, 255, 255)');
  });

  it('applies correct dark mode styles for typography', () => {
    renderStatsCards();
    const value = screen.getByRole('heading', { level: 4 });
    const computedStyle = window.getComputedStyle(value);
    expect(computedStyle.color).toBe('rgb(255, 255, 255)');
  });
}); 