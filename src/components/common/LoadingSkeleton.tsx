import React from 'react';
import { Box, Skeleton, useTheme } from '@mui/material';

interface LoadingSkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave' | false;
  rows?: number;
  spacing?: number;
  fullWidth?: boolean;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  animation = 'wave',
  rows = 1,
  spacing = 1,
  fullWidth = false,
}) => {
  const theme = useTheme();

  return (
    <Box
      data-testid="skeleton-container"
      sx={{
        width: fullWidth ? '100%' : width,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing,
      }}
    >
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton
          key={index}
          data-testid={`skeleton-${index}`}
          variant={variant}
          width={fullWidth ? '100%' : width}
          height={height}
          animation={animation}
          sx={{
            bgcolor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
          }}
        />
      ))}
    </Box>
  );
};

export default LoadingSkeleton; 