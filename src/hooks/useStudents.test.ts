import { renderHook, act } from '@testing-library/react';
import { useStudents } from './useStudents';

describe('useStudents', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('should fetch students successfully', async () => {
    const mockStudents = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockStudents,
    });

    const { result } = renderHook(() => useStudents());

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.students).toEqual(mockStudents);
  });

  it('should handle fetch error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useStudents());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Erro ao carregar estudantes');
    expect(result.current.students).toEqual([]);
  });

  it('should add a new student', () => {
    const { result } = renderHook(() => useStudents());
    const newStudent = { id: '3', name: 'New Student', email: 'new@example.com' };

    act(() => {
      result.current.addStudent(newStudent);
    });

    expect(result.current.students).toContainEqual(newStudent);
  });

  it('should update an existing student', () => {
    const { result } = renderHook(() => useStudents());
    const student = { id: '1', name: 'Old Name', email: 'old@example.com' };
    const updatedStudent = { ...student, name: 'New Name' };

    act(() => {
      result.current.addStudent(student);
      result.current.updateStudent('1', updatedStudent);
    });

    expect(result.current.students).toContainEqual(updatedStudent);
    expect(result.current.students).not.toContainEqual(student);
  });

  it('should delete a student', () => {
    const { result } = renderHook(() => useStudents());
    const student = { id: '1', name: 'Test Student', email: 'test@example.com' };

    act(() => {
      result.current.addStudent(student);
      result.current.deleteStudent('1');
    });

    expect(result.current.students).not.toContainEqual(student);
  });
}); 