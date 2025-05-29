import { useState, useEffect } from 'react';
import { Student } from '../types';

const STORAGE_KEY = 'students';

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>(() => {
    // Tenta carregar os dados do localStorage ao inicializar
    const savedStudents = localStorage.getItem(STORAGE_KEY);
    return savedStudents ? JSON.parse(savedStudents) : [];
  });
  const [degreeFilter, setDegreeFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');

  // Salva no localStorage sempre que students mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const filteredStudents = students.filter(student => {
    const matchesDegree = !degreeFilter || student.degree === degreeFilter;
    const matchesClass = !classFilter || student.class === classFilter;
    return matchesDegree && matchesClass;
  });

  const addStudent = (student: Student) => {
    setStudents(prev => [...prev, student]);
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents(prev => prev.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
  };

  const deleteStudent = (id: number) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  const clearFilters = () => {
    setDegreeFilter('');
    setClassFilter('');
  };

  return {
    students,
    filteredStudents,
    degreeFilter,
    classFilter,
    addStudent,
    updateStudent,
    deleteStudent,
    setDegreeFilter,
    setClassFilter,
    clearFilters
  };
}; 