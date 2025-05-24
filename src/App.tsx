import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentManagement from './components/StudentManagement';
import TeacherManagement from './components/TeacherManagement';
import Layout from './components/Layout';

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
