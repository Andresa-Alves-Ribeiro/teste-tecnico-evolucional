import { Degree, Class, Student } from '../common/entities';
import { Theme } from '@mui/material/styles';

export interface StudentFiltersProps {
  selectedDegree: number | '';
  selectedClass: number | '';
  degrees: Degree[];
  classes: Class[];
  onDegreeChange: (value: number | '') => void;
  onClassChange: (value: number | '') => void;
  onGenerateStudents: () => void;
}

export interface StudentChartProps {
  chartData: Array<{
    name: string;
    students: number;
    color: string;
  }>;
  loading?: boolean;
}

export interface StudentStatsProps {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  pendingStudents: number;
}

export interface StudentFiltersAndChartProps {
  selectedDegree: number | '';
  selectedClass: number | '';
  degrees: Degree[];
  classes: Class[];
  chartData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  onDegreeChange: (degree: number | '') => void;
  onClassChange: (classId: number | '') => void;
  onGenerateStudents: () => void;
}

export interface StudentColumnsProps {
  editingStudent: Student | null;
  setEditingStudent: (student: Student | null) => void;
  degrees: Degree[];
  classes: Class[];
  getDegreeColor: (name: string) => { bg: string; color: string };
  getClassColor: (name: string) => { bg: string; color: string };
  theme: Theme;
}

export interface StudentManagementProps {
  onEdit: (student: Student) => void;
  onSave: (student: Student) => void;
  editingItem: Student | null;
  onEditingItemChange: (student: Student | null) => void;
  getDegreeColor: (degree: string) => string;
  getClassColor: (classId: string) => string;
} 