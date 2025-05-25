import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, Paper, useTheme, alpha } from '@mui/material';
import { Student, TableItem, Degree, Class } from '../../types';
import studentsData from '../../data/students.json';
import degreesData from '../../data/degrees.json';
import classesData from '../../data/classes.json';
import DataTable from '../common/DataTable';
import StudentHeader from './management/StudentHeader';
import StudentStats from './management/StudentStats';
import StudentFilters from './StudentFilters';
import StudentChart from './StudentChart';
import { getStudentColumns } from './management/StudentColumns';

const StudentManagement = () => {
  const theme = useTheme();
  const [students, setStudents] = useState<Student[]>(studentsData as Student[]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(studentsData as Student[]);
  const [selectedDegree, setSelectedDegree] = useState<number | ''>('');
  const [selectedClass, setSelectedClass] = useState<number | ''>('');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const degrees = degreesData as Degree[];
  const classes = classesData.classes.map((cls, index) => ({
    id: index + 1,
    name: cls.name
  })) as Class[];

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
    console.log('Chart Data:', data);
    setChartData(data);
  }, [students, degrees]);

  useEffect(() => {
    filterStudents();
  }, [filterStudents]);

  useEffect(() => {
    updateChartData();
  }, [updateChartData]);

  const handleEdit = (item: TableItem) => {
    setEditingStudent(item as Student);
  };

  const handleSave = (item: TableItem) => {
    const updatedStudents = students.map(student => 
      student.id === item.id ? { ...student, ...item } : student
    );
    setStudents(updatedStudents);
    setEditingStudent(null);
  };

  const handleEditingItemChange = (item: TableItem) => {
    setEditingStudent(item as Student);
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

  const getDegreeColor = (degreeName: string) => {
    const lowerName = degreeName.toLowerCase();
    if (lowerName.includes('fundamental')) {
      return {
        bg: alpha(theme.palette.info.main, 0.1),
        color: theme.palette.info.main,
      };
    }
    if (lowerName.includes('médio')) {
      return {
        bg: alpha(theme.palette.warning.main, 0.1),
        color: theme.palette.warning.main,
      };
    }
    if (lowerName.includes('técnico')) {
      return {
        bg: alpha(theme.palette.success.main, 0.1),
        color: theme.palette.success.main,
      };
    }
    if (lowerName.includes('superior')) {
      return {
        bg: alpha(theme.palette.secondary.main, 0.1),
        color: theme.palette.secondary.main,
      };
    }
    return {
      bg: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
    };
  };

  const getClassColor = (className: string) => {
    const lowerName = className.toLowerCase();
    const hash = lowerName.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    const colorIndex = hash % 5;
    const colors = [
      { bg: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main },
      { bg: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main },
      { bg: alpha(theme.palette.success.main, 0.1), color: theme.palette.success.main },
      { bg: alpha(theme.palette.warning.main, 0.1), color: theme.palette.warning.main },
      { bg: alpha(theme.palette.info.main, 0.1), color: theme.palette.info.main },
    ];
    return colors[colorIndex];
  };

  const columns = getStudentColumns({
    editingStudent,
    setEditingStudent,
    degrees,
    classes,
    getDegreeColor,
    getClassColor,
    theme,
  });

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
            <DataTable
              title="Lista de Alunos"
              items={filteredStudents}
              columns={columns}
              onEdit={handleEdit}
              editingItem={editingStudent}
              onEditingItemChange={handleEditingItemChange}
              onSave={handleSave}
              getDegreeColor={getDegreeColor}
              getClassColor={getClassColor}
            />
          </Box>

          <Box sx={{ mb: 12, height: 400 }}>
            <StudentChart chartData={chartData} />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default StudentManagement; 