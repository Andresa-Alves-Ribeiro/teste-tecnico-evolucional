export interface Student {
  id: string;
  name: string;
  email: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  birthDate?: string;
  grade?: string;
  class?: string;
  createdAt?: string;
  updatedAt?: string;
} 