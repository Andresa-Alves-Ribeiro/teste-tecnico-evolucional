import React from 'react';
import { render, screen } from '@testing-library/react';
import Stats from '../../../components/common/Stats';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const mockItems = [
  {
    label: 'Total Users',
    value: 1234,
    icon: <TrendingUpIcon />,
    change: {
      value: 12,
      isPositive: true,
    },
  },
  {
    label: 'Revenue',
    value: 'R$ 5.678',
    icon: <TrendingDownIcon />,
    change: {
      value: 5,
      isPositive: false,
    },
  },
];

const renderStats = (props = {}) => {
  const defaultProps = {
    items: mockItems,
    ...props,
  };

  return render(<Stats {...defaultProps} />);
};

describe('Stats Component', () => {
  it('renders all stat items', () => {
    renderStats();
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });

  it('renders values correctly', () => {
    renderStats();
    expect(screen.getByText('1234')).toBeInTheDocument();
    expect(screen.getByText('R$ 5.678')).toBeInTheDocument();
  });

  it('renders icons', () => {
    renderStats();
    const icons = screen.getAllByTestId('TrendingUpIcon');
    expect(icons).toHaveLength(1);
  });

  it('renders positive change correctly', () => {
    renderStats();
    expect(screen.getByText('↑12%')).toBeInTheDocument();
  });

  it('renders negative change correctly', () => {
    renderStats();
    expect(screen.getByText('↓5%')).toBeInTheDocument();
  });

  it('applies correct grid layout', () => {
    renderStats();
    const container = screen.getByRole('list');
    expect(container).toHaveClass('grid');
    expect(container).toHaveClass('grid-cols-1');
    expect(container).toHaveClass('sm:grid-cols-2');
    expect(container).toHaveClass('lg:grid-cols-2');
  });

  it('applies correct card styles', () => {
    renderStats();
    const cards = screen.getAllByRole('listitem');
    const card = cards[0];
    expect(card).toHaveClass('rounded-lg');
    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('px-4');
    expect(card).toHaveClass('py-5');
    expect(card).toHaveClass('shadow');
    expect(card).toHaveClass('transition-all');
  });

  it('applies correct icon container styles', () => {
    renderStats();
    const iconContainers = screen.getAllByTestId('icon-container');
    const firstContainer = iconContainers[0];
    expect(firstContainer).toHaveClass('rounded-md');
    expect(firstContainer).toHaveClass('bg-primary-light/10');
    expect(firstContainer).toHaveClass('p-3');
  });

  it('applies correct label styles', () => {
    renderStats();
    const label = screen.getByText('Total Users');
    expect(label).toHaveClass('text-sm');
    expect(label).toHaveClass('font-medium');
    expect(label).toHaveClass('text-gray-600');
  });

  it('applies correct value styles', () => {
    renderStats();
    const value = screen.getByText('1234');
    expect(value).toHaveClass('text-2xl');
    expect(value).toHaveClass('font-semibold');
    expect(value).toHaveClass('text-gray-900');
  });

  it('applies correct change styles for positive change', () => {
    renderStats();
    const change = screen.getByText('↑12%');
    expect(change).toHaveClass('text-green-700');
  });

  it('applies correct change styles for negative change', () => {
    renderStats();
    const change = screen.getByText('↓5%');
    expect(change).toHaveClass('text-red-700');
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    renderStats({ className: customClass });
    const container = screen.getByRole('list');
    expect(container).toHaveClass(customClass);
  });

  it('applies correct dark mode styles', () => {
    renderStats();
    const cards = screen.getAllByRole('listitem');
    const card = cards[0];
    expect(card).toHaveClass('dark:bg-gray-900');
    
    const label = screen.getByText('Total Users');
    expect(label).toHaveClass('dark:text-gray-300');
    
    const value = screen.getByText('1234');
    expect(value).toHaveClass('dark:text-white');
  });

  it('handles items without change', () => {
    const itemsWithoutChange = [
      {
        label: 'Total Users',
        value: 1234,
        icon: <TrendingUpIcon />,
      },
    ];
    renderStats({ items: itemsWithoutChange });
    expect(screen.queryByText('↑')).not.toBeInTheDocument();
    expect(screen.queryByText('↓')).not.toBeInTheDocument();
  });

  it('handles items without icon', () => {
    const itemsWithoutIcon = [
      {
        label: 'Total Users',
        value: 1234,
      },
    ];
    renderStats({ items: itemsWithoutIcon });
    const label = screen.getByText('Total Users');
    expect(label).not.toHaveClass('ml-16');
  });
}); 