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
    <Box className="p-6">
      <Typography variant="h4" className="mb-4">
        Gerenciamento de Alunos
      </Typography>

      <Box className="mb-6 flex gap-4">
        <FormControl className="min-w-[200px]">
          <InputLabel>Série</InputLabel>
          <Select
            value={selectedDegree}
            label="Série"
            onChange={(e) => setSelectedDegree(e.target.value)}
            className="bg-white"
          >
            <MenuItem value="">Todas</MenuItem>
            {degrees.map((degree) => (
              <MenuItem key={degree.id} value={degree.id}>
                {degree.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="min-w-[200px]">
          <InputLabel>Classe</InputLabel>
          <Select
            value={selectedClass}
            label="Classe"
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-white"
          >
            <MenuItem value="">Todas</MenuItem>
            {classes.map((cls) => (
              <MenuItem key={cls.id} value={cls.id}>
                {cls.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button 
          variant="contained" 
          onClick={generateRandomStudents}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Gerar 300 Alunos
        </Button>
      </Box>

      <TableContainer component={Paper} className="mb-6 shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="font-semibold">Nome</TableCell>
              <TableCell className="font-semibold">Série</TableCell>
              <TableCell className="font-semibold">Classe</TableCell>
              <TableCell className="font-semibold">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id} className="hover:bg-gray-50">
                <TableCell>
                  {editingStudent?.id === student.id ? (
                    <TextField
                      value={editingStudent.name}
                      onChange={(e) =>
                        setEditingStudent({ ...editingStudent, name: e.target.value })
                      }
                      className="w-full"
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
                      className="w-full"
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
                      className="w-full"
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
                    <Button 
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Salvar
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleEdit(student)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Editar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="mt-8">
        <Typography variant="h5" className="mb-4">
          Distribuição de Alunos por Série
        </Typography>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <BarChart width={800} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#8884d8" name="Número de Alunos" />
          </BarChart>
        </div>
      </Box>
    </Box>
  );
};

export default StudentManagement; 