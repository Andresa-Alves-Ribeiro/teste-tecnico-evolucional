import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import StudentManagement from './components/student/StudentManagement';
import TeacherManagement from './components/teacher/TeacherManagement';
import Layout from './components/layout/Layout';
import { AppProvider } from './context/AppContext';
import Feedback from './components/common/Feedback';
import Loading from './components/common/Loading';
import { useApp } from './context/AppContext';
import { getTheme } from './styles/theme';

const AppContent: React.FC = () => {
  const { state } = useApp();
  const theme = React.useMemo(() => getTheme(state.isDarkMode ? 'dark' : 'light'), [state.isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {state.loading && <Loading fullScreen />}
      {state.feedback.message && (
        <Feedback
          type={state.feedback.type!}
          message={state.feedback.message}
        />
      )}
      <Layout>
        <Routes>
          <Route path="/" element={<StudentManagement />} />
          <Route path="/teachers" element={<TeacherManagement />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

function App() {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
}

export default App;
