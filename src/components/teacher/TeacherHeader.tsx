import React from 'react';
import { Box, Typography, Avatar, useTheme, alpha } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const TeacherHeader = () => {
  const theme = useTheme();

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
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
        }}
      >
        <SchoolIcon sx={{ fontSize: 32 }} />
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
          Gerenciamento de Professores
        </Typography>
      </Box>
    </Box>
  );
};

export default TeacherHeader; 