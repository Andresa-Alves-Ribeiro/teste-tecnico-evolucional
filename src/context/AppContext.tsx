import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Student } from '../types/Student';
import { Teacher } from '../types/Teacher';

interface AppState {
  feedback: {
    type: 'success' | 'error' | 'info' | null;
    message: string | null;
  };
  loading: boolean;
  selectedStudent: Student | null;
  selectedTeacher: Teacher | null;
  isDarkMode: boolean;
}

type AppAction =
  | { type: 'SHOW_FEEDBACK'; payload: { type: 'success' | 'error' | 'info'; message: string } }
  | { type: 'HIDE_FEEDBACK' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SELECTED_STUDENT'; payload: Student | null }
  | { type: 'SET_SELECTED_TEACHER'; payload: Teacher | null }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'SET_DARK_MODE'; payload: boolean };

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      return true;
    }
    if (savedTheme === 'light') {
      return false;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

const initialState: AppState = {
  feedback: {
    type: null,
    message: null,
  },
  loading: false,
  selectedStudent: null,
  selectedTeacher: null,
  isDarkMode: getInitialTheme(),
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SHOW_FEEDBACK':
      return {
        ...state,
        feedback: {
          type: action.payload.type,
          message: action.payload.message,
        },
      };
    case 'HIDE_FEEDBACK':
      return {
        ...state,
        feedback: {
          type: null,
          message: null,
        },
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_SELECTED_STUDENT':
      return {
        ...state,
        selectedStudent: action.payload,
      };
    case 'SET_SELECTED_TEACHER':
      return {
        ...state,
        selectedTeacher: action.payload,
      };
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    case 'SET_DARK_MODE':
      return {
        ...state,
        isDarkMode: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Aplica a classe dark no elemento html baseado no estado inicial
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.isDarkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 