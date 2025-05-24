export interface Teacher {
  id: string;
  name: string;
  email: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  subjects?: string[];
  specialization?: string;
  createdAt?: string;
  updatedAt?: string;
} 