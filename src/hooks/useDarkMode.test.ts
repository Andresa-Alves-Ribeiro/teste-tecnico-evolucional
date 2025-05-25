import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useDarkMode } from './useDarkMode';
import { AppProvider } from '../context/AppContext';

describe('useDarkMode', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(AppProvider, null, children);
  };

  beforeEach(() => {
    localStorage.clear();
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should initialize with system preference', () => {
    const { result } = renderHook(() => useDarkMode(), { wrapper });
    expect(result.current.isDarkMode).toBe(false);
  });

  it('should toggle dark mode', () => {
    const { result } = renderHook(() => useDarkMode(), { wrapper });
    
    expect(result.current.isDarkMode).toBe(false);
    
    result.current.toggleDarkMode();
    expect(result.current.isDarkMode).toBe(true);
    
    result.current.toggleDarkMode();
    expect(result.current.isDarkMode).toBe(false);
  });

  it('should persist dark mode preference', () => {
    const { result } = renderHook(() => useDarkMode(), { wrapper });
    
    result.current.toggleDarkMode();
    expect(localStorage.getItem('theme')).toBe('dark');
    
    result.current.toggleDarkMode();
    expect(localStorage.getItem('theme')).toBe('light');
  });
}); 