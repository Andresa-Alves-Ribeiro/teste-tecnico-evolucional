import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Student } from '../types';
import { students as initialStudents, degrees, classes } from '../data/mockData';

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(initialStudents);
  const [selectedDegree, setSelectedDegree] = useState<number | ''>('');
  const [selectedClass, setSelectedClass] = useState<number | ''>('');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const filterStudents = useCallback(() => {
    let filtered = [...students];
    if (selectedDegree) {
      filtered = filtered.filter(student => student.degreeId === selectedDegree);
    }
    if (selectedClass) {
      filtered = filtered.filter(student => student.classId === selectedClass);
    }
    setFilteredStudents(filtered);
  }, [selectedDegree, selectedClass, students]);

  const updateChartData = useCallback(() => {
    const data = degrees.map(degree => ({
      name: degree.name,
      students: students.filter(student => student.degreeId === degree.id).length
    }));
    setChartData(data);
  }, [students]);

  useEffect(() => {
    filterStudents();
  }, [filterStudents]);

  useEffect(() => {
    updateChartData();
  }, [updateChartData]);

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const handleSave = () => {
    if (editingStudent) {
      setStudents(students.map(student =>
        student.id === editingStudent.id ? editingStudent : student
      ));
      setEditingStudent(null);
    }
  };

  const generateRandomStudents = () => {
    const newStudents: Student[] = [];
    for (let i = 0; i < 300; i++) {
      const randomDegree = Math.floor(Math.random() * degrees.length) + 1;
      const randomClass = Math.floor(Math.random() * classes.length) + 1;
      newStudents.push({
        id: students.length + i + 1,
        name: `Aluno ${students.length + i + 1}`,
        degreeId: randomDegree,
        classId: randomClass,
      });
    }
    setStudents([...students, ...newStudents]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Alunos
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Série</InputLabel>
          <Select
            value={selectedDegree}
            label="Série"
            onChange={(e) => setSelectedDegree(e.target.value)}
          >
            <MenuItem value="">Todas</MenuItem>
            {degrees.map((degree) => (
              <MenuItem key={degree.id} value={degree.id}>
                {degree.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Classe</InputLabel>
          <Select
            value={selectedClass}
            label="Classe"
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <MenuItem value="">Todas</MenuItem>
            {classes.map((cls) => (
              <MenuItem key={cls.id} value={cls.id}>
                {cls.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={generateRandomStudents}>
          Gerar 300 Alunos
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Série</TableCell>
              <TableCell>Classe</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  {editingStudent?.id === student.id ? (
                    <TextField
                      value={editingStudent.name}
                      onChange={(e) =>
                        setEditingStudent({ ...editingStudent, name: e.target.value })
                      }
                    />
                  ) : (
                    student.name
                  )}
                </TableCell>
                <TableCell>
                  {editingStudent?.id === student.id ? (
                    <Select
                      value={editingStudent.degreeId}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          degreeId: e.target.value,
                        })
                      }
                    >
                      {degrees.map((degree) => (
                        <MenuItem key={degree.id} value={degree.id}>
                          {degree.name}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    degrees.find((d) => d.id === student.degreeId)?.name
                  )}
                </TableCell>
                <TableCell>
                  {editingStudent?.id === student.id ? (
                    <Select
                      value={editingStudent.classId}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          classId: e.target.value,
                        })
                      }
                    >
                      {classes.map((cls) => (
                        <MenuItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    classes.find((c) => c.id === student.classId)?.name
                  )}
                </TableCell>
                <TableCell>
                  {editingStudent?.id === student.id ? (
                    <Button onClick={handleSave}>Salvar</Button>
                  ) : (
                    <Button onClick={() => handleEdit(student)}>Editar</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Distribuição de Alunos por Série
        </Typography>
        <BarChart width={800} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="students" fill="#8884d8" name="Número de Alunos" />
        </BarChart>
      </Box>
    </Box>
  );
};

export default StudentManagement; 