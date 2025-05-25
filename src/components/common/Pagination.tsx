import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { styles } from '../../theme';
import { alpha } from '@mui/material/styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  siblingCount?: number;
}

const PaginationButton: React.FC<{
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}> = ({ onClick, disabled, children }) => {
  const theme = useTheme();
  
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="outlined"
      size="small"
      sx={{
        minWidth: '32px',
        height: '32px',
        padding: '4px 8px',
        borderColor: alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.3 : 0.2),
        color: theme.palette.text.primary,
        '&:hover': {
          borderColor: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
        },
        '&.Mui-disabled': {
          borderColor: alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.3 : 0.2),
          color: alpha(theme.palette.text.primary, 0.38),
        },
      }}
    >
      {children}
    </Button>
  );
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  siblingCount = 1,
}) => {
  const theme = useTheme();

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const generatePaginationRange = () => {
    const totalNumbers = siblingCount + 5;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - siblingCount);
      const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

      const pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      return [
        showFirstLast && 1,
        hasLeftSpill && '...',
        ...pages,
        hasRightSpill && '...',
        showFirstLast && totalPages,
      ].filter(Boolean);
    }

    return range(1, totalPages);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        mt: 3,
      }}
    >
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </PaginationButton>

      {generatePaginationRange().map((page, index) => {
        if (page === '...') {
          return (
            <Typography
              key={`ellipsis-${index}`}
              sx={{
                color: theme.palette.text.secondary,
                px: 1,
              }}
            >
              ...
            </Typography>
          );
        }

        return (
          <PaginationButton
            key={page}
            onClick={() => onPageChange(page as number)}
            disabled={currentPage === page}
            sx={{
              ...(currentPage === page && {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                },
              }),
            }}
          >
            {page}
          </PaginationButton>
        );
      })}

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próxima
      </PaginationButton>
    </Box>
  );
};

export default Pagination; 