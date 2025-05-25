import { ActionType, Status } from '../types/common';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

export const ROUTES = {
  HOME: '/',
  STUDENTS: '/students',
  TEACHERS: '/teachers',
  SETTINGS: '/settings',
};

export const TABLE_PAGE_SIZE = 10;

export const STATUS_COLORS = {
  ACTIVE: 'green',
  INACTIVE: 'red',
  PENDING: 'yellow',
};

export const DATE_FORMAT = 'DD/MM/YYYY';

export const ACTION_LABELS: Record<ActionType, string> = {
  [ActionType.EDIT]: 'Editar',
  [ActionType.SAVE]: 'Salvar',
  [ActionType.DELETE]: 'Excluir',
  [ActionType.VIEW]: 'Visualizar',
};

export const STATUS_LABELS: Record<Status, string> = {
  [Status.ACTIVE]: 'Ativo',
  [Status.INACTIVE]: 'Inativo',
  [Status.PENDING]: 'Pendente',
};

export const VALIDATION_MESSAGES = {
  required: (field: string) => `${field} é obrigatório`,
  minLength: (field: string, length: number) => `${field} deve ter pelo menos ${length} caracteres`,
  maxLength: (field: string, length: number) => `${field} deve ter no máximo ${length} caracteres`,
  email: 'Email inválido',
  number: (field: string) => `${field} deve ser um número`,
  invalidDate: 'Data inválida',
  invalidFormat: 'Formato inválido',
  passwordMismatch: 'As senhas não coincidem',
  invalidPhone: 'Telefone inválido',
  invalidCPF: 'CPF inválido',
  invalidCNPJ: 'CNPJ inválido',
  invalidCEP: 'CEP inválido',
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  SIBLING_COUNT: 1,
};

export const API_ENDPOINTS = {
  STUDENTS: '/api/students',
  TEACHERS: '/api/teachers',
  DEGREES: '/api/degrees',
  CLASSES: '/api/classes',
};

export const STORAGE_KEYS = {
  THEME: 'theme',
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  SERVER_ERROR: 'Erro no servidor. Tente novamente mais tarde.',
  UNAUTHORIZED: 'Sessão expirada. Por favor, faça login novamente.',
  FORBIDDEN: 'Você não tem permissão para realizar esta ação.',
  NOT_FOUND: 'Recurso não encontrado.',
  VALIDATION_ERROR: 'Por favor, verifique os campos preenchidos.',
};

export const SUCCESS_MESSAGES = {
  CREATED: 'Registro criado com sucesso!',
  UPDATED: 'Registro atualizado com sucesso!',
  DELETED: 'Registro excluído com sucesso!',
  SAVED: 'Alterações salvas com sucesso!',
}; 