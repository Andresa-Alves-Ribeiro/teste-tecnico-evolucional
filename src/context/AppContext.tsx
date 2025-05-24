import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Student } from '../types/Student';
import { Teacher } from '../types/Teacher';

interface AppContextType {
  selectedStudent: Student | null;
  selectedTeacher: Teacher | null;
  setSelectedStudent: (student: Student | null) => void;
  setSelectedTeacher: (teacher: Teacher | null) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        selectedStudent,
        selectedTeacher,
        setSelectedStudent,
        setSelectedTeacher,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 