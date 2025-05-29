import React from 'react';
import { render, screen } from '@testing-library/react';
import TrendStat from '../../../components/common/TrendStat';

const renderTrendStat = (props = {}) => {
  const defaultProps = {
    title: 'Test Title',
    value: '100',
    trend: {
      value: 10,
      isPositive: true,
    },
    ...props,
  };

  return render(<TrendStat {...defaultProps} />);
};

describe('TrendStat Component', () => {
  it('renders title correctly', () => {
    renderTrendStat();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders value correctly', () => {
    renderTrendStat();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders positive trend correctly', () => {
    renderTrendStat();
    expect(screen.getByText('↑10%')).toBeInTheDocument();
  });

  it('renders negative trend correctly', () => {
    renderTrendStat({
      trend: {
        value: 10,
        isPositive: false,
      },
    });
    expect(screen.getByText('↓10%')).toBeInTheDocument();
  });

  it('renders custom period', () => {
    const customPeriod = 'desde o mês passado';
    renderTrendStat({ period: customPeriod });
    expect(screen.getByText(customPeriod)).toBeInTheDocument();
  });

  it('renders default period when not provided', () => {
    renderTrendStat();
    expect(screen.getByText('desde o último período')).toBeInTheDocument();
  });

  it('applies correct styles for positive trend', () => {
    renderTrendStat();
    const trendElement = screen.getByText('↑10%');
    expect(trendElement).toHaveClass('text-green-700');
  });

  it('applies correct styles for negative trend', () => {
    renderTrendStat({
      trend: {
        value: 10,
        isPositive: false,
      },
    });
    const trendElement = screen.getByText('↓10%');
    expect(trendElement).toHaveClass('text-red-700');
  });

  it('applies correct container styles', () => {
    renderTrendStat();
    const container = screen.getByRole('article');
    expect(container).toHaveClass('rounded-lg');
    expect(container).toHaveClass('bg-white');
    expect(container).toHaveClass('p-6');
    expect(container).toHaveClass('shadow-md');
    expect(container).toHaveClass('transition-all');
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    renderTrendStat({ className: customClass });
    const container = screen.getByRole('article');
    expect(container).toHaveClass(customClass);
  });

  it('handles numeric values', () => {
    renderTrendStat({ value: 100 });
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('handles string values', () => {
    renderTrendStat({ value: 'R$ 100' });
    expect(screen.getByText('R$ 100')).toBeInTheDocument();
  });

  it('applies correct dark mode styles', () => {
    renderTrendStat();
    const container = screen.getByRole('article');
    expect(container).toHaveClass('dark:bg-gray-900');
    
    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('dark:text-gray-300');
    
    const value = screen.getByText('100');
    expect(value).toHaveClass('dark:text-white');
  });
}); 