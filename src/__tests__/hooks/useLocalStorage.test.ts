import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should initialize with initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));

    expect(result.current[0]).toBe('initialValue');
    expect(localStorage.getItem('testKey')).toBeNull();
  });

  it('should initialize with value from localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify('storedValue'));
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));

    expect(result.current[0]).toBe('storedValue');
  });

  it('should update value in localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));

    act(() => {
      result.current[1]('newValue');
    });

    expect(result.current[0]).toBe('newValue');
    expect(JSON.parse(localStorage.getItem('testKey')!)).toBe('newValue');
  });

  it('should handle function updates', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 1));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(2);
    expect(JSON.parse(localStorage.getItem('testKey')!)).toBe(2);
  });

  it('should handle complex objects', () => {
    const initialValue = { name: 'Test', count: 0 };
    const { result } = renderHook(() => useLocalStorage('testKey', initialValue));

    act(() => {
      result.current[1]({ name: 'Updated', count: 1 });
    });

    expect(result.current[0]).toEqual({ name: 'Updated', count: 1 });
    expect(JSON.parse(localStorage.getItem('testKey')!)).toEqual({ name: 'Updated', count: 1 });
  });

  it('should handle errors when localStorage is not available', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const originalLocalStorage = window.localStorage;
    
    // @ts-ignore
    delete window.localStorage;

    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));

    expect(result.current[0]).toBe('initialValue');
    expect(consoleSpy).toHaveBeenCalled();

    window.localStorage = originalLocalStorage;
    consoleSpy.mockRestore();
  });

  it('should update value when key changes', () => {
    const { result, rerender } = renderHook(
      ({ key }) => useLocalStorage(key, 'initialValue'),
      { initialProps: { key: 'key1' } }
    );

    localStorage.setItem('key2', JSON.stringify('value2'));

    rerender({ key: 'key2' });

    expect(result.current[0]).toBe('value2');
  });
}); 