import { Teacher, Degree, Class } from '../common/entities';

export interface TeacherStatsProps {
  totalTeachers: number;
  totalDegrees: number;
  totalClasses: number;
  totalRelationships: number;
}

export interface TeacherFiltersProps {
  selectedDegree: number | "";
  selectedClass: number | "";
  degrees: Degree[];
  classes: Class[];
  onDegreeChange: (value: number | "") => void;
  onClassChange: (value: number | "") => void;
  onAddClick: () => void;
}

export interface AddRelationshipDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  newRelationship: {
    teacherId?: number;
    degreeId?: number;
    classId?: number;
  };
  setNewRelationship: (relationship: {
    teacherId?: number;
    degreeId?: number;
    classId?: number;
  }) => void;
  teachers: Teacher[];
  degrees: Degree[];
  classes: Class[];
}

export interface TeacherManagementProps {
  onEdit: (teacher: Teacher) => void;
  onSave: (teacher: Teacher) => void;
  editingItem: Teacher | null;
  onEditingItemChange: (teacher: Teacher | null) => void;
  getDegreeColor: (degree: string) => string;
  getClassColor: (classId: string) => string;
} 