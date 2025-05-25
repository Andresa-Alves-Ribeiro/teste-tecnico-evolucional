import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';
import { useDarkMode } from '../../hooks/useDarkMode';

// Mock the useDarkMode hook
jest.mock('../../hooks/useDarkMode');

describe('ThemeToggle Component', () => {
  const mockToggleDarkMode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders light mode icon when in dark mode', () => {
    (useDarkMode as jest.Mock).mockReturnValue({
      isDarkMode: true,
      toggleDarkMode: mockToggleDarkMode,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Mudar para tema claro');
    
    // Check for sun icon (light mode icon)
    const sunIcon = button.querySelector('svg');
    expect(sunIcon).toHaveClass('text-yellow-400');
  });

  it('renders dark mode icon when in light mode', () => {
    (useDarkMode as jest.Mock).mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Mudar para tema escuro');
    
    // Check for moon icon (dark mode icon)
    const moonIcon = button.querySelector('svg');
    expect(moonIcon).toHaveClass('text-gray-700');
  });

  it('calls toggleDarkMode when clicked', () => {
    (useDarkMode as jest.Mock).mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockToggleDarkMode).toHaveBeenCalledTimes(1);
  });

  it('applies correct button styles', () => {
    (useDarkMode as jest.Mock).mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('p-2');
    expect(button).toHaveClass('rounded-lg');
    expect(button).toHaveClass('bg-gray-200');
    expect(button).toHaveClass('dark:bg-gray-700');
    expect(button).toHaveClass('hover:bg-gray-300');
    expect(button).toHaveClass('dark:hover:bg-gray-600');
    expect(button).toHaveClass('transition-colors');
  });

  it('applies correct icon styles', () => {
    (useDarkMode as jest.Mock).mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    });

    render(<ThemeToggle />);
    const icon = screen.getByRole('button').querySelector('svg');
    expect(icon).toHaveClass('w-6');
    expect(icon).toHaveClass('h-6');
  });

  it('applies correct dark mode icon styles', () => {
    (useDarkMode as jest.Mock).mockReturnValue({
      isDarkMode: true,
      toggleDarkMode: mockToggleDarkMode,
    });

    render(<ThemeToggle />);
    const icon = screen.getByRole('button').querySelector('svg');
    expect(icon).toHaveClass('text-yellow-400');
  });

  it('applies correct light mode icon styles', () => {
    (useDarkMode as jest.Mock).mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    });

    render(<ThemeToggle />);
    const icon = screen.getByRole('button').querySelector('svg');
    expect(icon).toHaveClass('text-gray-700');
    expect(icon).toHaveClass('dark:text-gray-300');
  });
}); 