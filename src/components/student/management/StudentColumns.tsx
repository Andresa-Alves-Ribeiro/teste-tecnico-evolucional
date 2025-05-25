import React from 'react';
import { Box, TextField, Select, MenuItem, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { TableItem, Student, Degree, Class } from '../../../types';

interface StudentColumnsProps {
  editingStudent: Student | null;
  setEditingStudent: (student: Student | null) => void;
  degrees: Degree[];
  classes: Class[];
  getDegreeColor: (degreeName: string) => { bg: string; color: string };
  getClassColor: (className: string) => { bg: string; color: string };
  theme: Theme;
}

export const getStudentColumns = ({
  editingStudent,
  setEditingStudent,
  degrees,
  classes,
  getDegreeColor,
  getClassColor,
  theme,
}: StudentColumnsProps) => {
  return [
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
                  degreeId: Number(e.target.value),
                })
              }
              fullWidth
              size="small"
              data-testid="select-field"
              sx={{
                borderRadius: 8,
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
                  classId: Number(e.target.value),
                })
              }
              fullWidth
              size="small"
              data-testid="select-field"
              sx={{
                borderRadius: 8,
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
}; 