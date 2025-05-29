import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, Paper, useTheme, alpha } from '@mui/material';
import { Relationship, TableItem } from '../../types';
import { teachers, degrees, classes, relationships, students } from '../../data/mockData';
import TeacherFilters from './TeacherFilters';
import DataTable from '../common/DataTable';
import AddRelationshipDialog from './AddRelationshipDialog';
import TeacherHeader from './TeacherHeader';
import TeacherStats from './TeacherStats';

const TeacherManagement = () => {
    const theme = useTheme();
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
        // Sort relationships by teacher name alphabetically
        filtered.sort((a, b) => {
            const teacherNameA = getTeacherName(a.teacherId).toLowerCase();
            const teacherNameB = getTeacherName(b.teacherId).toLowerCase();
            return teacherNameA.localeCompare(teacherNameB);
        });
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

    const getStudentsByDegree = (relationshipId: number) => {
        // Encontra o relacionamento específico do professor que está sendo visualizado
        const relationship = filteredRelationships.find(rel => rel.id === relationshipId);
        if (!relationship) return [];

        // Filtra os alunos que pertencem exatamente à mesma série e classe do relacionamento
        return students.filter(student => 
            student.degreeId === relationship.degreeId && 
            student.classId === relationship.classId
        );
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
        const classColors = [
            { bg: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main },
            { bg: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main },
            { bg: alpha(theme.palette.success.main, 0.1), color: theme.palette.success.main },
            { bg: alpha(theme.palette.warning.main, 0.1), color: theme.palette.warning.main },
            { bg: alpha(theme.palette.error.main, 0.1), color: theme.palette.error.main },
            { bg: alpha(theme.palette.info.main, 0.1), color: theme.palette.info.main },
        ];
        
        // Use the class name to determine a consistent color
        const index = className.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % classColors.length;
        return classColors[index];
    };

    const columns = [
        {
            key: 'name',
            label: 'Professor',
            render: (item: TableItem) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ fontWeight: 500 }}>{getTeacherName(item.teacherId as number)}</Box>
                    <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                        {getTeacherSubject(item.teacherId as number)}
                    </Box>
                </Box>
            ),
        },
        {
            key: 'degree',
            label: 'Série',
            render: (item: TableItem) => {
                const degreeName = getDegreeName(item.degreeId as number);
                const colors = getDegreeColor(degreeName);
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
                        {degreeName}
                    </Box>
                );
            },
        },
        {
            key: 'class',
            label: 'Classe',
            render: (item: TableItem) => {
                const className = getClassName(item.classId as number);
                const colors = getClassColor(className);
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
                        {className}
                    </Box>
                );
            },
        },
    ];

    const studentColumns = [
        {
            key: 'name',
            label: 'Aluno',
            render: (item: TableItem) => (
                <Box>
                    <Box sx={{ fontWeight: 500 }}>{item.name}</Box>
                    <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                        ID: {item.id}
                    </Box>
                </Box>
            ),
        },
        {
            key: 'degree',
            label: 'Série',
            render: (item: TableItem) => {
                const degreeName = getDegreeName(item.degreeId as number);
                const colors = getDegreeColor(degreeName);
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
                        {degreeName}
                    </Box>
                );
            },
        },
        {
            key: 'class',
            label: 'Classe',
            render: (item: TableItem) => {
                const className = getClassName(item.classId as number);
                const colors = getClassColor(className);
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
                        {className}
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
                    <TeacherHeader />
                </Box>

                <Box sx={{ mb: 4 }}>
                    <TeacherStats
                        totalTeachers={teachers.length}
                        totalDegrees={degrees.length}
                        totalClasses={classes.length}
                        totalRelationships={relationships.length}
                    />
                </Box>

                <Paper elevation={0} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                    <Box sx={{ mb: 4 }}>
                        <TeacherFilters
                            selectedDegree={selectedDegree}
                            selectedClass={selectedClass}
                            degrees={degrees}
                            classes={classes}
                            onDegreeChange={setSelectedDegree}
                            onClassChange={setSelectedClass}
                            onAddClick={() => setOpenDialog(true)}
                        />
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <DataTable
                            title="Lista de Professores"
                            items={filteredRelationships}
                            columns={columns}
                            onShowDetails={setShowStudents}
                            showDetailsId={showStudents}
                            getDegreeColor={getDegreeColor}
                        />
                    </Box>

                    {showStudents && (
                        <Box sx={{ mt: 6 }}>
                            {getStudentsByDegree(showStudents).length > 0 ? (
                                <DataTable
                                    title={`Alunos da Série ${getDegreeName(filteredRelationships.find(rel => rel.id === showStudents)?.degreeId ?? 0)}`}
                                    items={getStudentsByDegree(showStudents)}
                                    columns={studentColumns}
                                />
                            ) : (
                                <Box sx={{ 
                                    textAlign: 'center', 
                                    py: 4, 
                                    color: 'text.secondary',
                                    backgroundColor: alpha(theme.palette.background.paper, 0.6),
                                    borderRadius: 1
                                }}>
                                    Não há alunos cadastrados nesta série.
                                </Box>
                            )}
                        </Box>
                    )}
                </Paper>
            </Container>

            <AddRelationshipDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onAdd={handleAddRelationship}
                newRelationship={newRelationship}
                setNewRelationship={setNewRelationship}
                teachers={teachers}
                degrees={degrees}
                classes={classes}
            />
        </Box>
    );
};

export default TeacherManagement; 