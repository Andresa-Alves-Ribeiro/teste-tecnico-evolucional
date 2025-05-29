import React from 'react';
import { render, screen } from '@testing-library/react';
import StatCard from '../../../components/common/StatCard';

const renderStatCard = (props = {}) => {
  const defaultProps = {
    title: 'Test Title',
    value: '100',
    ...props,
  };

  return render(<StatCard {...defaultProps} />);
};

describe('StatCard Component', () => {
  it('renders title correctly', () => {
    renderStatCard();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders value correctly', () => {
    renderStatCard();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    const description = 'Test Description';
    renderStatCard({ description });
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    renderStatCard();
    const descriptionElement = screen.queryByText('Test Description');
    expect(descriptionElement).not.toBeInTheDocument();
  });

  it('applies correct container styles', () => {
    renderStatCard();
    const container = screen.getByRole('article');
    expect(container).toHaveClass('rounded-lg');
    expect(container).toHaveClass('bg-white');
    expect(container).toHaveClass('p-6');
    expect(container).toHaveClass('shadow-md');
    expect(container).toHaveClass('transition-all');
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    renderStatCard({ className: customClass });
    const container = screen.getByRole('article');
    expect(container).toHaveClass(customClass);
  });

  it('handles numeric values', () => {
    renderStatCard({ value: 100 });
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('handles string values', () => {
    renderStatCard({ value: 'R$ 100' });
    expect(screen.getByText('R$ 100')).toBeInTheDocument();
  });

  it('applies correct title styles', () => {
    renderStatCard();
    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('text-sm');
    expect(title).toHaveClass('font-medium');
    expect(title).toHaveClass('text-gray-500');
  });

  it('applies correct value styles', () => {
    renderStatCard();
    const value = screen.getByText('100');
    expect(value).toHaveClass('text-2xl');
    expect(value).toHaveClass('font-semibold');
    expect(value).toHaveClass('text-gray-900');
  });

  it('applies correct description styles', () => {
    renderStatCard({ description: 'Test Description' });
    const description = screen.getByText('Test Description');
    expect(description).toHaveClass('text-sm');
    expect(description).toHaveClass('text-gray-500');
  });

  it('applies correct dark mode styles', () => {
    renderStatCard();
    const container = screen.getByRole('article');
    expect(container).toHaveClass('dark:bg-gray-800');
    
    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('dark:text-gray-400');
    
    const value = screen.getByText('100');
    expect(value).toHaveClass('dark:text-gray-100');
  });

  it('applies correct dark mode styles for description', () => {
    renderStatCard({ description: 'Test Description' });
    const description = screen.getByText('Test Description');
    expect(description).toHaveClass('dark:text-gray-400');
  });
}); 