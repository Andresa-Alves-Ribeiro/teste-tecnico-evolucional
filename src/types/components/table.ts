import { ReactNode } from 'react';

export type TableValue = string | number | boolean | null | undefined;

export interface TableItem {
  [key: string]: TableValue;
}

export interface Column<T extends TableItem> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
}

export interface DataTableProps<T extends TableItem> {
  title?: string;
  items: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  onRowClick?: (item: T) => void;
  onShowDetails?: (id: number | null) => void;
  showDetailsId?: number | null;
  onEdit?: (item: T) => void;
  editingItem?: T | null;
  onEditingItemChange?: (item: T) => void;
  onSave?: (item: T) => void;
  getDegreeColor?: (degreeName: string) => { bg: string; color: string };
  getClassColor?: (className: string) => { bg: string; color: string };
} 