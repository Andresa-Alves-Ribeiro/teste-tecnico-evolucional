import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { Student } from '../../types';
import { students as initialStudents, degrees, classes } from '../../data/mockData';
import StudentTable from './StudentTable';
import StudentHeader from './management/StudentHeader';
import StudentStats from './management/StudentStats';
import StudentFilters from './StudentFilters';
import StudentChart from './StudentChart';

const StudentManagement = () => {
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
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 3, sm: 4, md: 5 },
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: 6 }}>
          <StudentHeader />
        </Box>

        <Box sx={{ mb: 4 }}>
          <StudentStats
            totalStudents={students.length}
            totalDegrees={degrees.length}
            totalClasses={classes.length}
          />
        </Box>

        <Paper elevation={0} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Box sx={{ mb: 4 }}>
            <StudentFilters
              selectedDegree={selectedDegree}
              selectedClass={selectedClass}
              degrees={degrees}
              classes={classes}
              onDegreeChange={setSelectedDegree}
              onClassChange={setSelectedClass}
              onGenerateStudents={generateRandomStudents}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <StudentTable
              students={filteredStudents}
              degrees={degrees}
              classes={classes}
              editingStudent={editingStudent}
              onEdit={handleEdit}
              onSave={handleSave}
              onEditingStudentChange={setEditingStudent}
            />
          </Box>

          <Box sx={{ mt: 6 }}>
            <StudentChart chartData={chartData} />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default StudentManagement; 