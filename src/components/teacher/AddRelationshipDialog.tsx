import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { Teacher, Degree, Class, Relationship } from '../../types';

interface AddRelationshipDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: () => void;
    newRelationship: Partial<Relationship>;
    setNewRelationship: (rel: Partial<Relationship>) => void;
    teachers: Teacher[];
    degrees: Degree[];
    classes: Class[];
}

const AddRelationshipDialog: React.FC<AddRelationshipDialogProps> = ({
    open,
    onClose,
    onAdd,
    newRelationship,
    setNewRelationship,
    teachers,
    degrees,
    classes,
}) => {
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            className="rounded-lg"
        >
            <DialogTitle className="bg-gray-50 text-gray-800 font-semibold">
                Adicionar Relacionamento
            </DialogTitle>
            <DialogContent>
                <Box className="flex flex-col gap-4 pt-4">
                    <FormControl fullWidth>
                        <InputLabel>Professor</InputLabel>
                        <Select
                            value={newRelationship.teacherId ?? ''}
                            label="Professor"
                            onChange={(e) =>
                                setNewRelationship({ ...newRelationship, teacherId: e.target.value })
                            }
                            className="bg-white"
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
                            className="bg-white"
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
                            className="bg-white"
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
            <DialogActions className="bg-gray-50 p-4">
                <Button 
                    onClick={onClose}
                    className="text-gray-600 hover:text-gray-800"
                >
                    Cancelar
                </Button>
                <Button 
                    onClick={onAdd}
                    variant="contained"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                    Adicionar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddRelationshipDialog; 