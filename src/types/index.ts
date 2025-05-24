export interface Student {
  id: number;
  name: string;
  degreeId: number;
  classId: number;
}

export interface Degree {
  id: number;
  name: string;
}

export interface Class {
  id: number;
  name: string;
}

export interface Teacher {
  id: number;
  name: string;
  subject: string;
}

export interface Relationship {
  id: number;
  teacherId: number;
  degreeId: number;
  classId: number;
} 