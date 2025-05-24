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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
} from '@mui/material';
import { Relationship } from '../types';
import { teachers, degrees, classes, relationships, students } from '../data/mockData';

const TeacherManagement: React.FC = () => {
    const [filteredRelationships, setFilteredRelationships] = useState<Relationship[]>(relationships);
    const [selectedDegree, setSelectedDegree] = useState<number | ''>('');
    const [selectedClass, setSelectedClass] = useState<number | ''>('');
    const [showStudents, setShowStudents] = useState<number | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [newRelationship, setNewRelationship] = useState<Partial<Relationship>>({
        teacherId: undefined,
        degreeId: undefined,
        classId: undefined,
    });

    const filterRelationships = useCallback(() => {
        let filtered = [...relationships];
        if (selectedDegree) {
            filtered = filtered.filter(rel => rel.degreeId === selectedDegree);
        }
        if (selectedClass) {
            filtered = filtered.filter(rel => rel.classId === selectedClass);
        }
        setFilteredRelationships(filtered);
    }, [selectedDegree, selectedClass]);

    useEffect(() => {
        filterRelationships();
    }, [filterRelationships]);

    const getTeacherName = (teacherId: number) => {
        return teachers.find(t => t.id === teacherId)?.name ?? '';
    };

    const getTeacherSubject = (teacherId: number) => {
        return teachers.find(t => t.id === teacherId)?.subject ?? '';
    };

    const getDegreeName = (degreeId: number) => {
        return degrees.find(d => d.id === degreeId)?.name ?? '';
    };

    const getClassName = (classId: number) => {
        return classes.find(c => c.id === classId)?.name ?? '';
    };

    const getStudentsByDegree = (degreeId: number) => {
        return students.filter(student => student.degreeId === degreeId);
    };

    const handleAddRelationship = () => {
        if (newRelationship.teacherId && newRelationship.degreeId && newRelationship.classId) {
            const newRel: Relationship = {
                id: relationships.length + 1,
                teacherId: newRelationship.teacherId,
                degreeId: newRelationship.degreeId,
                classId: newRelationship.classId,
            };
            relationships.push(newRel);
            setOpenDialog(false);
            setNewRelationship({
                teacherId: undefined,
                degreeId: undefined,
                classId: undefined,
            });
            filterRelationships();
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Gerenciamento de Professores
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

                <Button variant="contained" onClick={() => setOpenDialog(true)}>
                    Adicionar Relacionamento
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Professor</TableCell>
                            <TableCell>Matéria</TableCell>
                            <TableCell>Série</TableCell>
                            <TableCell>Classe</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRelationships.map((rel) => (
                            <TableRow key={rel.id}>
                                <TableCell>{getTeacherName(rel.teacherId)}</TableCell>
                                <TableCell>{getTeacherSubject(rel.teacherId)}</TableCell>
                                <TableCell>{getDegreeName(rel.degreeId)}</TableCell>
                                <TableCell>{getClassName(rel.classId)}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => setShowStudents(showStudents === rel.degreeId ? null : rel.degreeId)}
                                    >
                                        {showStudents === rel.degreeId ? 'Ocultar Alunos' : 'Ver Alunos'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {showStudents !== null && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Alunos da Série {getDegreeName(showStudents)}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Classe</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getStudentsByDegree(showStudents).map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>{getClassName(student.classId)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Adicionar Relacionamento</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel>Professor</InputLabel>
                            <Select
                                value={newRelationship.teacherId ?? ''}
                                label="Professor"
                                onChange={(e) =>
                                    setNewRelationship({ ...newRelationship, teacherId: e.target.value })
                                }
                            >
                                {teachers.map((teacher) => (
                                    <MenuItem key={teacher.id} value={teacher.id}>
                                        {teacher.name} - {teacher.subject}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Série</InputLabel>
                            <Select
                                value={newRelationship.degreeId ?? ''}
                                label="Série"
                                onChange={(e) =>
                                    setNewRelationship({ ...newRelationship, degreeId: e.target.value })
                                }
                            >
                                {degrees.map((degree) => (
                                    <MenuItem key={degree.id} value={degree.id}>
                                        {degree.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Classe</InputLabel>
                            <Select
                                value={newRelationship.classId ?? ''}
                                label="Classe"
                                onChange={(e) =>
                                    setNewRelationship({ ...newRelationship, classId: e.target.value })
                                }
                            >
                                {classes.map((cls) => (
                                    <MenuItem key={cls.id} value={cls.id}>
                                        {cls.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button onClick={handleAddRelationship} variant="contained">
                        Adicionar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TeacherManagement; 