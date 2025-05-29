import { BoxProps, AlertProps } from '@mui/material';
import { ReactNode } from 'react';

export interface AnimatedCardProps extends BoxProps {
  index?: number;
}

export interface HoverCardProps extends BoxProps {
  hoverScale?: number;
  hoverElevation?: number;
}

export interface SmoothScrollProps extends BoxProps {
  behavior?: 'auto' | 'smooth';
  block?: 'start' | 'center' | 'end' | 'nearest';
}

export interface LoadingProps {}

export interface LoadingSkeletonProps {
  variant?: 'rectangular' | 'circular' | 'text';
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave' | false;
  rows?: number;
  spacing?: number;
  fullWidth?: boolean;
}

export interface PageTransitionProps {
  children: ReactNode;
}

export interface FeedbackProps {
  open: boolean;
  message: string;
  type?: AlertProps['severity'];
  onClose: () => void;
  duration?: number;
  position?: 'top' | 'bottom';
  variant?: 'snackbar' | 'alert';
  autoHide?: boolean;
}

export interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export interface ActionFeedbackProps {}

export interface BaseStatProps {
  title: string;
  value: number;
  icon: React.ComponentType;
  color: string;
}

export interface StatItem extends BaseStatProps {
  change?: {
    value: number;
    isPositive: boolean;
  };
}

export interface TrendStatProps extends BaseStatProps {
  trend: number;
  period?: string;
  className?: string;
}

export interface StatCardProps extends BaseStatProps {
  description?: string;
  trend?: number;
  className?: string;
}

export interface StatsProps {
  stats: StatItem[];
  className?: string;
}

export interface StatsCardsProps {
  stats: StatItem[];
} 