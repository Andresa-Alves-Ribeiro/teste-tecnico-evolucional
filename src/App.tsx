import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline } from '@mui/material';
import StudentManagement from './components/StudentManagement';
import TeacherManagement from './components/TeacherManagement';
import './styles/App.css';

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Gestão Escolar
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Alunos
          </Button>
          <Button color="inherit" component={Link} to="/teachers">
            Professores
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<StudentManagement />} />
          <Route path="/teachers" element={<TeacherManagement />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
