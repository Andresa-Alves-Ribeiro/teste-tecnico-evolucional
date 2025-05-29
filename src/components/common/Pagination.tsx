import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
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
  isCurrentPage?: boolean;
}> = ({ onClick, disabled, children, isCurrentPage }) => {
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
        borderColor: isCurrentPage 
          ? theme.palette.primary.main 
          : alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.3 : 0.2),
        color: isCurrentPage 
          ? theme.palette.primary.main 
          : theme.palette.text.primary,
        backgroundColor: isCurrentPage 
          ? alpha(theme.palette.primary.main, 0.08) 
          : 'transparent',
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

  const pageNumbers = generatePaginationRange();

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

      {pageNumbers.map((page) => {
        if (page === '...') {
          return (
            <Typography
              key={`ellipsis-${pageNumbers.indexOf(page)}`}
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
            key={String(page)}
            onClick={() => onPageChange(page as number)}
            disabled={currentPage === page}
            isCurrentPage={currentPage === page}
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