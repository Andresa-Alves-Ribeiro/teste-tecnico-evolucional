import { TableValue } from '../components/table';

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
  BACHELOR = 'bachelor',
  MASTER = 'master',
  DOCTORATE = 'doctorate',
}

export interface BaseEntity {
  id: string | number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Student extends BaseEntity {
  degreeId: number;
  classId: number;
  status: Status;
  degree?: Degree;
  class?: Class;
  [key: string]: TableValue | Degree | Class | undefined;
}

export interface Teacher extends BaseEntity {
  subject: string;
  status: Status;
  degrees?: Degree[];
  classes?: Class[];
}

export interface Degree extends BaseEntity {
  type: DegreeType;
  duration: number;
  students?: Student[];
  teachers?: Teacher[];
}

export interface Class extends BaseEntity {
  degreeId: number;
  year: number;
  semester: number;
  students?: Student[];
  teachers?: Teacher[];
  degree?: Degree;
} 