/** @jsxImportSource react */
import React, { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useDarkMode } from '../../hooks/useDarkMode';
import { AppProvider } from '../../context/AppContext';

describe('useDarkMode', () => {
  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <AppProvider>{children}</AppProvider>
  );

  beforeEach(() => {
    localStorage.clear();
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

  it('should toggle dark mode', async () => {
    const { result } = renderHook(() => useDarkMode(), { wrapper });
    
    expect(result.current.isDarkMode).toBe(false);
    
    await act(async () => {
      result.current.toggleDarkMode();
    });
    expect(result.current.isDarkMode).toBe(true);
    
    await act(async () => {
      result.current.toggleDarkMode();
    });
    expect(result.current.isDarkMode).toBe(false);
  });

  it('should persist dark mode preference', async () => {
    const { result } = renderHook(() => useDarkMode(), { wrapper });
    
    await act(async () => {
      result.current.toggleDarkMode();
    });
    expect(localStorage.getItem('theme')).toBe('dark');
    
    await act(async () => {
      result.current.toggleDarkMode();
    });
    expect(localStorage.getItem('theme')).toBe('light');
  });
}); 