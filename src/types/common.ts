export enum ActionType {
  EDIT = 'edit',
  SAVE = 'save',
  DELETE = 'delete',
  VIEW = 'view',
}

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}

export enum DegreeType {
  FUNDAMENTAL = 'fundamental',
  MEDIO = 'médio',
  TECNICO = 'técnico',
  SUPERIOR = 'superior',
}

export interface BaseEntity {
  id: string | number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student extends BaseEntity {
  degreeId: number;
  classId: number;
  status: Status;
}

export interface Teacher extends BaseEntity {
  email: string;
  subject: string;
  degrees: number[];
  classes: number[];
  status: Status;
}

export interface Degree extends BaseEntity {
  type: DegreeType;
  description?: string;
}

export interface Class extends BaseEntity {
  degreeId: number;
  capacity: number;
  currentStudents: number;
}

export type ValidationValue = string | number | boolean | null | undefined;

export interface ValidationContext {
  value: ValidationValue;
  field: string;
  formData: Record<string, ValidationValue>;
} 