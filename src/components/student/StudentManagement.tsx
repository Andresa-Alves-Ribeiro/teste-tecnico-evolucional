import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, Paper, useTheme, alpha, TextField, Select, MenuItem } from '@mui/material';
import { Student, TableItem } from '../../types';
import { students as initialStudents, degrees, classes } from '../../data/mockData';
import DataTable from '../common/DataTable';
import StudentHeader from './management/StudentHeader';
import StudentStats from './management/StudentStats';
import StudentFilters from './StudentFilters';
import StudentChart from './StudentChart';

const StudentManagement = () => {
  const theme = useTheme();
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

  const handleEdit = (item: TableItem) => {
    setEditingStudent(item as Student);
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

  const columns = [
    {
      key: 'name',
      label: 'Aluno',
      render: (item: TableItem) => (
        <Box>
          {editingStudent?.id === item.id ? (
            <TextField
              value={editingStudent.name}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, name: e.target.value })
              }
              fullWidth
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderWidth: '1px',
                  },
                },
              }}
            />
          ) : (
            <>
              <Box sx={{ fontWeight: 500 }}>{item.name}</Box>
              <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                ID: {item.id}
              </Box>
            </>
          )}
        </Box>
      ),
    },
    {
      key: 'degree',
      label: 'Série',
      render: (item: TableItem) => {
        const degree = degrees.find((d) => d.id === item.degreeId);
        if (editingStudent?.id === item.id) {
          return (
            <Select
              value={editingStudent.degreeId}
              onChange={(e) =>
                setEditingStudent({
                  ...editingStudent,
                  degreeId: e.target.value,
                })
              }
              fullWidth
              size="small"
              sx={{
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: alpha(theme.palette.divider, 0.2),
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderWidth: '1px',
                },
              }}
            >
              {degrees.map((degree) => (
                <MenuItem key={degree.id} value={degree.id}>
                  {degree.name}
                </MenuItem>
              ))}
            </Select>
          );
        }
        const colors = degree ? getDegreeColor(degree.name) : {
          bg: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
        };
        return (
          <Box
            sx={{
              backgroundColor: colors.bg,
              color: colors.color,
              fontWeight: 500,
              padding: '4px 8px',
              borderRadius: 1,
              display: 'inline-block',
            }}
          >
            {degree?.name}
          </Box>
        );
      },
    },
    {
      key: 'class',
      label: 'Classe',
      render: (item: TableItem) => {
        const classItem = classes.find((c) => c.id === item.classId);
        if (editingStudent?.id === item.id) {
          return (
            <Select
              value={editingStudent.classId}
              onChange={(e) =>
                setEditingStudent({
                  ...editingStudent,
                  classId: e.target.value,
                })
              }
              fullWidth
              size="small"
              sx={{
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: alpha(theme.palette.divider, 0.2),
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderWidth: '1px',
                },
              }}
            >
              {classes.map((cls) => (
                <MenuItem key={cls.id} value={cls.id}>
                  {cls.name}
                </MenuItem>
              ))}
            </Select>
          );
        }
        const colors = classItem ? getClassColor(classItem.name) : {
          bg: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
        };
        return (
          <Box
            sx={{
              backgroundColor: colors.bg,
              color: colors.color,
              fontWeight: 500,
              padding: '4px 8px',
              borderRadius: 1,
              display: 'inline-block',
            }}
          >
            {classItem?.name}
          </Box>
        );
      },
    },
  ];

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
              getDegreeColor={getDegreeColor}
              getClassColor={getClassColor}
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