import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentManagement from './components/student/StudentManagement';
import TeacherManagement from './components/teacher/TeacherManagement';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<StudentManagement />} />
          <Route path="/teachers" element={<TeacherManagement />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
