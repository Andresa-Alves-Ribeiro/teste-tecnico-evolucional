import { renderHook, act } from '@testing-library/react';
import { usePagination } from './usePagination';

describe('usePagination', () => {
  const mockData = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, value: `Item ${i + 1}` }));

  it('should initialize with correct values', () => {
    const { result } = renderHook(() => usePagination({ data: mockData, itemsPerPage: 3 }));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(4);
    expect(result.current.currentItems).toHaveLength(3);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.hasPreviousPage).toBe(false);
  });

  it('should initialize with custom initial page', () => {
    const { result } = renderHook(() => usePagination({ data: mockData, itemsPerPage: 3, initialPage: 2 }));

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentItems).toHaveLength(3);
    expect(result.current.currentItems[0].id).toBe(4);
  });

  it('should navigate to next page', () => {
    const { result } = renderHook(() => usePagination({ data: mockData, itemsPerPage: 3 }));

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentItems[0].id).toBe(4);
    expect(result.current.hasPreviousPage).toBe(true);
  });

  it('should navigate to previous page', () => {
    const { result } = renderHook(() => usePagination({ data: mockData, itemsPerPage: 3, initialPage: 2 }));

    act(() => {
      result.current.previousPage();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.currentItems[0].id).toBe(1);
    expect(result.current.hasPreviousPage).toBe(false);
  });

  it('should go to specific page', () => {
    const { result } = renderHook(() => usePagination({ data: mockData, itemsPerPage: 3 }));

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.currentItems[0].id).toBe(7);
  });

  it('should not go to invalid pages', () => {
    const { result } = renderHook(() => usePagination({ data: mockData, itemsPerPage: 3 }));

    act(() => {
      result.current.goToPage(0);
    });
    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.goToPage(5);
    });
    expect(result.current.currentPage).toBe(1);
  });

  it('should handle empty data array', () => {
    const { result } = renderHook(() => usePagination({ data: [], itemsPerPage: 3 }));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(0);
    expect(result.current.currentItems).toHaveLength(0);
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.hasPreviousPage).toBe(false);
  });
}); 