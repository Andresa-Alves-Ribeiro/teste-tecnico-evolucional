import { Degree, Class, Student, Teacher, Relationship } from '../types';

export const degrees: Degree[] = [
  { id: 1, name: '1º Ano' },
  { id: 2, name: '2º Ano' },
  { id: 3, name: '3º Ano' },
  { id: 4, name: '4º Ano' },
  { id: 5, name: '5º Ano' },
];

export const classes: Class[] = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
];

export const students: Student[] = [
  { id: 1, name: 'João Silva', degreeId: 1, classId: 1 },
  { id: 2, name: 'Maria Santos', degreeId: 1, classId: 2 },
  { id: 3, name: 'Pedro Oliveira', degreeId: 2, classId: 1 },
  { id: 4, name: 'Ana Costa', degreeId: 2, classId: 3 },
  { id: 5, name: 'Lucas Pereira', degreeId: 3, classId: 2 },
];

export const teachers: Teacher[] = [
  { id: 1, name: 'Prof. Carlos', subject: 'Matemática' },
  { id: 2, name: 'Prof. Ana', subject: 'Português' },
  { id: 3, name: 'Prof. João', subject: 'História' },
];

export const relationships: Relationship[] = [
  { id: 1, teacherId: 1, degreeId: 1, classId: 1 },
  { id: 2, teacherId: 1, degreeId: 1, classId: 2 },
  { id: 3, teacherId: 2, degreeId: 2, classId: 1 },
  { id: 4, teacherId: 2, degreeId: 2, classId: 3 },
  { id: 5, teacherId: 3, degreeId: 3, classId: 2 },
]; 