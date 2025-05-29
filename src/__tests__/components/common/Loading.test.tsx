import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../../../components/common/Loading';

describe('Loading Component', () => {
  it('renders with default props', () => {
    render(<Loading />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveClass('flex items-center justify-center p-4');
  });

  it('renders in fullscreen mode', () => {
    render(<Loading fullScreen />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toHaveClass('fixed inset-0 flex items-center justify-center bg-black/30 dark:bg-black/60 backdrop-blur-sm z-50 transition-all duration-200');
  });

  it('contains loading spinner', () => {
    render(<Loading />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('rounded-full h-12 w-12 border-4');
  });

  it('contains pulse animation', () => {
    render(<Loading />);
    const pulse = screen.getByTestId('loading-pulse');
    expect(pulse).toBeInTheDocument();
    expect(pulse).toHaveClass('absolute inset-0 rounded-full');
  });

  it('has correct accessibility text', () => {
    render(<Loading />);
    const srText = screen.getByText('Carregando...');
    expect(srText).toHaveClass('sr-only');
  });

  it('applies correct border colors', () => {
    render(<Loading />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('border-gray-200 dark:border-gray-700 border-t-primary-light dark:border-t-primary-dark');
  });

  it('applies correct background colors', () => {
    render(<Loading />);
    const pulse = screen.getByTestId('loading-pulse');
    expect(pulse).toHaveClass('bg-primary-light/10 dark:bg-primary-dark/10');
  });

  it('maintains consistent structure in both modes', () => {
    const { rerender } = render(<Loading />);
    const defaultStructure = screen.getByRole('status').innerHTML;
    
    rerender(<Loading fullScreen />);
    const fullScreenStructure = screen.getByRole('status').innerHTML;
    
    expect(defaultStructure).toBe(fullScreenStructure);
  });
}); 