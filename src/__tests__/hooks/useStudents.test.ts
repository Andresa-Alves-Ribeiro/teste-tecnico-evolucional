import { renderHook, act } from '@testing-library/react';
import { useStudents } from '../../hooks/useStudents';

describe('useStudents', () => {
  const mockStudents = [
    { id: 1, name: 'John Doe', degreeId: 1, classId: 1, degree: '1ª Série', class: 'A' },
    { id: 2, name: 'Jane Smith', degreeId: 2, classId: 2, degree: '2ª Série', class: 'B' },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty students array', () => {
    const { result } = renderHook(() => useStudents());
    expect(result.current.students).toEqual([]);
  });

  it('should add a new student', () => {
    const { result } = renderHook(() => useStudents());

    act(() => {
      result.current.addStudent(mockStudents[0]);
    });

    expect(result.current.students).toHaveLength(1);
    expect(result.current.students[0]).toEqual(mockStudents[0]);
  });

  it('should update an existing student', () => {
    const { result } = renderHook(() => useStudents());

    act(() => {
      result.current.addStudent(mockStudents[0]);
    });

    const updatedStudent = { ...mockStudents[0], name: 'John Updated' };

    act(() => {
      result.current.updateStudent(updatedStudent);
    });

    expect(result.current.students).toHaveLength(1);
    expect(result.current.students[0]).toEqual(updatedStudent);
  });

  it('should delete a student', () => {
    const { result } = renderHook(() => useStudents());

    act(() => {
      result.current.addStudent(mockStudents[0]);
      result.current.addStudent(mockStudents[1]);
    });

    expect(result.current.students).toHaveLength(2);

    act(() => {
      result.current.deleteStudent(mockStudents[0].id);
    });

    expect(result.current.students).toHaveLength(1);
    expect(result.current.students[0]).toEqual(mockStudents[1]);
  });

  it('should filter students by degree', () => {
    const { result } = renderHook(() => useStudents());

    act(() => {
      result.current.addStudent(mockStudents[0]);
      result.current.addStudent(mockStudents[1]);
    });

    act(() => {
      result.current.setDegreeFilter('1ª Série');
    });

    expect(result.current.filteredStudents).toHaveLength(1);
    expect(result.current.filteredStudents[0]).toEqual(mockStudents[0]);
  });

  it('should filter students by class', () => {
    const { result } = renderHook(() => useStudents());

    act(() => {
      result.current.addStudent(mockStudents[0]);
      result.current.addStudent(mockStudents[1]);
    });

    act(() => {
      result.current.setClassFilter('A');
    });

    expect(result.current.filteredStudents).toHaveLength(1);
    expect(result.current.filteredStudents[0]).toEqual(mockStudents[0]);
  });

  it('should clear filters', () => {
    const { result } = renderHook(() => useStudents());

    act(() => {
      result.current.addStudent(mockStudents[0]);
      result.current.addStudent(mockStudents[1]);
      result.current.setDegreeFilter('1ª Série');
      result.current.setClassFilter('A');
    });

    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.degreeFilter).toBe('');
    expect(result.current.classFilter).toBe('');
    expect(result.current.filteredStudents).toHaveLength(2);
  });

  it('should persist students in localStorage', () => {
    const { result } = renderHook(() => useStudents());

    act(() => {
      result.current.addStudent(mockStudents[0]);
    });

    const storedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    expect(storedStudents).toHaveLength(1);
    expect(storedStudents[0]).toEqual(mockStudents[0]);
  });
}); 