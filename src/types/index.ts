type TableValue = string | number | boolean | null | undefined;

export interface TableItem {
    id: number;
    teacherId?: number;
    degreeId?: number;
    classId?: number;
    name?: string;
    subject?: string;
    [key: string]: TableValue;
}

export interface Student {
    id: number;
    name: string;
    degreeId: number;
    classId: number;
    ra?: number;
    status?: 'ACTIVE' | 'INACTIVE' | 'PENDING';
    [key: string]: any;
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
  [key: string]: TableValue;
} 