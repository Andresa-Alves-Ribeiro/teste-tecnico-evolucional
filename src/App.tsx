import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import StudentManagement from './components/student/StudentManagement';
import TeacherManagement from './components/teacher/TeacherManagement';
import Layout from './components/layout/Layout';
import { AppProvider, useApp } from './context/AppContext';
import ActionFeedback from './components/common/ActionFeedback';
import Loading from './components/common/Loading';
import PageTransition from './components/common/PageTransition';
import { getTheme } from './styles/theme';

const AppContent: React.FC = () => {
  const { state, dispatch } = useApp();
  const theme = React.useMemo(() => getTheme(state.isDarkMode ? 'dark' : 'light'), [state.isDarkMode]);

  const handleCloseFeedback = () => {
    dispatch({ type: 'HIDE_FEEDBACK' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {state.loading && <Loading fullScreen />}
      <ActionFeedback
        open={!!state.feedback.message}
        message={state.feedback.message || ''}
        severity={state.feedback.type || 'info'}
        onClose={handleCloseFeedback}
      />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <PageTransition>
                  <StudentManagement />
                </PageTransition>
              }
            />
            <Route
              path="/teachers"
              element={
                <PageTransition>
                  <TeacherManagement />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
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
