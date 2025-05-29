import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { useApp } from '../context/AppContext';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    let errorMessage = 'Ocorreu um erro inesperado';

    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = 'Dados inválidos. Por favor, verifique as informações.';
          break;
        case 401:
          errorMessage = 'Sessão expirada. Por favor, faça login novamente.';
          // Handle unauthorized access (e.g., redirect to login)
          break;
        case 403:
          errorMessage = 'Você não tem permissão para realizar esta ação.';
          break;
        case 404:
          errorMessage = 'Recurso não encontrado.';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor. Por favor, tente novamente mais tarde.';
          break;
        default:
          errorMessage = 'Ocorreu um erro na operação.';
      }
    } else if (error.request) {
      errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
    }

    // Dispatch error feedback
    const { dispatch } = useApp();
    dispatch({
      type: 'SHOW_FEEDBACK',
      payload: {
        type: 'error',
        message: errorMessage,
      },
    });

    return Promise.reject(error);
  }
);

export default api; 