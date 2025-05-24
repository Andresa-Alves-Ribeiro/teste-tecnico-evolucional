import React from 'react';
import { Box, Paper, Typography, Avatar, useTheme, alpha } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';

interface StudentStatsProps {
  totalStudents: number;
  totalDegrees: number;
  totalClasses: number;
}

const StudentStats = ({
  totalStudents,
  totalDegrees,
  totalClasses,
}: StudentStatsProps) => {
  const theme = useTheme();

  const stats = [
    {
      title: 'Total de Alunos',
      value: totalStudents,
      icon: PeopleIcon,
      color: theme.palette.primary.main,
    },
    {
      title: 'Séries Ativas',
      value: totalDegrees,
      icon: ClassIcon,
      color: theme.palette.success.main,
    },
    {
      title: 'Turmas Ativas',
      value: totalClasses,
      icon: GroupsIcon,
      color: theme.palette.info.main,
    },
    {
      title: 'Média por Turma',
      value: Math.round(totalStudents / totalClasses),
      icon: SchoolIcon,
      color: theme.palette.warning.main,
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        },
        gap: 3,
        mb: 4,
      }}
    >
      {stats.map((stat, index) => (
        <Box key={index}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(stat.color, 0.1)}, ${alpha(stat.color, 0.05)})`,
              border: `1px solid ${alpha(stat.color, 0.1)}`,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 32px ${alpha(stat.color, 0.15)}`,
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: alpha(stat.color, 0.1),
                  color: stat.color,
                }}
              >
                <stat.icon />
              </Avatar>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    mb: 0.5,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                  }}
                >
                  {stat.title}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default StudentStats; 