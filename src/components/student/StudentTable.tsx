import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  TextField,
  useTheme,
  useMediaQuery,
  Typography,
  Box,
  alpha,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import { Student, Degree, Class } from '../../types';
import { colorPalette } from '../../styles/colorPalette';

interface StudentTableProps {
  students: Student[];
  degrees: Degree[];
  classes: Class[];
  editingStudent: Student | null;
  onEdit: (student: Student) => void;
  onSave: () => void;
  onEditingStudentChange: (student: Student) => void;
}

const StudentTable = ({
  students,
  degrees,
  classes,
  editingStudent,
  onEdit,
  onSave,
  onEditingStudentChange,
}: StudentTableProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

    // Use the class name to generate a consistent index
    const hash = lowerName.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);

    // Get a color combination based on the hash
    const colorIndex = hash % colorPalette.length;
    return colorPalette[colorIndex];
  };

  const renderMobileView = (student: Student) => {
    const degree = degrees.find((d) => d.id === student.degreeId);
    const classItem = classes.find((c) => c.id === student.classId);
    const degreeColors = degree ? getDegreeColor(degree.name) : {
      bg: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
    };
    const classColors = classItem ? getClassColor(classItem.name) : {
      bg: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
    };

    return (
      <Card
        key={student.id}
        sx={{
          mb: 2,
          borderRadius: 2,
          boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.06)}`,
          '&:hover': {
            boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
          },
        }}
      >
        <CardContent>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  width: 40,
                  height: 40,
                }}
              >
                <PersonIcon />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {student.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ID: {student.id}
                </Typography>
              </Box>
              <Tooltip title="Editar aluno">
                <IconButton
                  onClick={() => onEdit(student)}
                  size="small"
                  sx={{
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={degree?.name}
                size="small"
                sx={{
                  backgroundColor: degreeColors.bg,
                  color: degreeColors.color,
                  fontWeight: 500,
                }}
              />
              <Chip
                label={classItem?.name}
                size="small"
                sx={{
                  backgroundColor: classColors.bg,
                  color: classColors.color,
                  fontWeight: 500,
                }}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  };

  const renderTableContent = () => {
    if (isMobile) {
      return (
        <Box sx={{ p: 2 }}>
          {students.map((student) => renderMobileView(student))}
        </Box>
      );
    }

    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.primary.main, 0.02)})`,
                '& th': {
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  borderBottom: `2px solid ${alpha(theme.palette.divider, 0.1)}`,
                  fontSize: '0.95rem',
                  letterSpacing: '0.5px',
                  padding: '16px',
                  whiteSpace: 'nowrap',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                },
              }}
            >
              <TableCell>Aluno</TableCell>
              <TableCell>Série</TableCell>
              <TableCell>Classe</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                sx={{
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.02),
                    transition: 'all 0.2s ease',
                  },
                  '& td': {
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    color: theme.palette.text.primary,
                    padding: '16px',
                  },
                  '&:last-child td': {
                    borderBottom: 'none',
                  },
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        width: 40,
                        height: 40,
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                    {editingStudent?.id === student.id ? (
                      <TextField
                        value={editingStudent.name}
                        onChange={(e) =>
                          onEditingStudentChange({ ...editingStudent, name: e.target.value })
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
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {student.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: theme.palette.text.secondary,
                            display: 'block',
                          }}
                        >
                          ID: {student.id}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  {editingStudent?.id === student.id ? (
                    <Select
                      value={editingStudent.degreeId}
                      onChange={(e) =>
                        onEditingStudentChange({
                          ...editingStudent,
                          degreeId: e.target.value as number,
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
                  ) : (
                    (() => {
                      const degree = degrees.find((d) => d.id === student.degreeId);
                      const colors = degree ? getDegreeColor(degree.name) : {
                        bg: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      };
                      return (
                        <Chip
                          label={degree?.name}
                          size="small"
                          sx={{
                            backgroundColor: colors.bg,
                            color: colors.color,
                            fontWeight: 500,
                          }}
                        />
                      );
                    })()
                  )}
                </TableCell>
                <TableCell>
                  {editingStudent?.id === student.id ? (
                    <Select
                      value={editingStudent.classId}
                      onChange={(e) =>
                        onEditingStudentChange({
                          ...editingStudent,
                          classId: e.target.value as number,
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
                  ) : (
                    (() => {
                      const classItem = classes.find((c) => c.id === student.classId);
                      const colors = classItem ? getClassColor(classItem.name) : {
                        bg: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      };
                      return (
                        <Chip
                          label={classItem?.name}
                          size="small"
                          sx={{
                            backgroundColor: colors.bg,
                            color: colors.color,
                            fontWeight: 500,
                          }}
                        />
                      );
                    })()
                  )}
                </TableCell>
                <TableCell align="right">
                  {editingStudent?.id === student.id ? (
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Tooltip title="Salvar alterações">
                        <IconButton
                          onClick={onSave}
                          size="small"
                          sx={{
                            color: theme.palette.success.main,
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.success.main, 0.1),
                            },
                          }}
                        >
                          <SaveIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancelar edição">
                        <IconButton
                          onClick={() => onEditingStudentChange(student)}
                          size="small"
                          sx={{
                            color: theme.palette.error.main,
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.error.main, 0.1),
                            },
                          }}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  ) : (
                    <Tooltip title="Editar aluno">
                      <IconButton
                        onClick={() => onEdit(student)}
                        size="small"
                        sx={{
                          color: theme.palette.primary.main,
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        background: `linear-gradient(to bottom right, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.98)})`,
        backdropFilter: 'blur(10px)',
        boxShadow: `0 4px 24px ${alpha(theme.palette.common.black, 0.06)}`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`,
        },
      }}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <SchoolIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 24, sm: 28 } }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          Lista de Alunos
        </Typography>
        <Chip
          label={`${students.length} alunos`}
          size="small"
          sx={{
            ml: { xs: 0, sm: 'auto' },
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            fontWeight: 500,
          }}
        />
      </Box>

      {renderTableContent()}
    </Paper>
  );
};

export default StudentTable; 