import React from 'react';
import { Degree, Class } from '../../types';
import FiltersPanel from '../common/FiltersPanel';

interface TeacherFiltersProps {
    selectedDegree: number | '';
    selectedClass: number | '';
    degrees: Degree[];
    classes: Class[];
    onDegreeChange: (value: number | '') => void;
    onClassChange: (value: number | '') => void;
    onAddClick: () => void;
}

const TeacherFilters = ({
    selectedDegree,
    selectedClass,
    degrees,
    classes,
    onDegreeChange,
    onClassChange,
    onAddClick,
}: TeacherFiltersProps) => {
    return (
        <FiltersPanel
            title="Filtros de Professores"
            selectedDegree={selectedDegree}
            selectedClass={selectedClass}
            degrees={degrees}
            classes={classes}
            onDegreeChange={onDegreeChange}
            onClassChange={onClassChange}
            actionButton={{
                label: 'Adicionar Relacionamento',
                onClick: onAddClick,
            }}
        />
    );
};

export default TeacherFilters; 