export interface FiltersPanelProps {
  title: string;
  selectedDegree: string;
  selectedClass: string;
  degrees: Array<{ id: number; name: string }>;
  classes: Array<{ id: number; name: string }>;
  onDegreeChange: (value: number | '') => void;
  onClassChange: (value: number | '') => void;
  actionButton: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
} 