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

export const ERROR_MESSAGES = {
  FETCH_ERROR: 'Erro ao carregar dados',
  SAVE_ERROR: 'Erro ao salvar dados',
  DELETE_ERROR: 'Erro ao excluir dados',
  VALIDATION_ERROR: 'Por favor, preencha todos os campos obrigatórios',
};

export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: 'Dados salvos com sucesso',
  DELETE_SUCCESS: 'Dados excluídos com sucesso',
}; 