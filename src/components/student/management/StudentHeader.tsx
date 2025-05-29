import React from 'react';
import { Box, Typography, Avatar, useTheme, alpha } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const StudentHeader = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 3,
      }}
    >
      <Avatar
        sx={{
          width: 56,
          height: 56,
          backgroundColor: isDarkMode
            ? alpha(theme.palette.primary.main, 0.1)
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(245, 247, 250, 0.95))',
          color: theme.palette.primary.main,
          boxShadow: isDarkMode
            ? '0 4px 24px rgba(0, 0, 0, 0.3)'
            : '0 4px 24px rgba(0, 0, 0, 0.06)',
          border: isDarkMode
            ? '1px solid rgba(255, 255, 255, 0.2)'
            : '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <SchoolIcon sx={{ fontSize: 32, color: 'white' }} />
      </Avatar>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
            letterSpacing: '-0.5px',
          }}
        >
          Gerenciamento de Alunos
        </Typography>
      </Box>
    </Box>
  );
};

export default StudentHeader; 