import React from 'react';
import { Degree, Class } from '../../types';
import FiltersPanel from '../common/FiltersPanel';

interface StudentFiltersProps {
  selectedDegree: number | '';
  selectedClass: number | '';
  degrees: Degree[];
  classes: Class[];
  onDegreeChange: (value: number | '') => void;
  onClassChange: (value: number | '') => void;
  onGenerateStudents: () => void;
}

const StudentFilters = ({
  selectedDegree,
  selectedClass,
  degrees,
  classes,
  onDegreeChange,
  onClassChange,
  onGenerateStudents,
}: StudentFiltersProps) => {
  return (
    <FiltersPanel
      title="Filtros de Alunos"
      selectedDegree={selectedDegree}
      selectedClass={selectedClass}
      degrees={degrees}
      classes={classes}
      onDegreeChange={onDegreeChange}
      onClassChange={onClassChange}
      actionButton={{
        label: 'Gerar Alunos',
        onClick: onGenerateStudents,
      }}
    />
  );
};

export default StudentFilters; 