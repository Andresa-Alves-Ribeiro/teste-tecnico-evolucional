import { useState, useEffect } from 'react';
import { Student } from '../types/Student';

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Aqui você pode implementar a chamada à API real
        const response = await fetch('/api/students');
        const data = await response.json();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar estudantes');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const addStudent = (student: Student) => {
    setStudents(prev => [...prev, student]);
  };

  const updateStudent = (id: string, updatedStudent: Student) => {
    setStudents(prev => prev.map(student => 
      student.id === id ? updatedStudent : student
    ));
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  return {
    students,
    loading,
    error,
    addStudent,
    updateStudent,
    deleteStudent
  };
}; 