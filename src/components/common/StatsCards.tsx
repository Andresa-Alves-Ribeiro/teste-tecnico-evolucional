import React from 'react';
import { Box, Paper, Typography, Avatar, useTheme, alpha } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

interface StatItem {
  title: string;
  value: number;
  icon: React.ComponentType<SvgIconProps>;
  color: string;
}

interface StatsCardsProps {
  stats: StatItem[];
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const cardStyles = {
    p: 3,
    borderRadius: 3,
    backgroundColor: isDarkMode ? 'rgb(31, 41, 55)' : theme.palette.background.paper,
    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: isDarkMode 
        ? `0 8px 32px ${alpha(theme.palette.common.black, 0.4)}`
        : `0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`,
    },
  };

  return (
    <Box
      data-testid="stats-container"
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
        <Paper
          key={index}
          data-testid="stats-card"
          elevation={0}
          sx={cardStyles}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              data-testid="stats-avatar"
              sx={{
                width: 48,
                height: 48,
                backgroundColor: isDarkMode 
                  ? 'rgb(33, 150, 243)'
                  : alpha(stat.color, 0.1),
                color: isDarkMode 
                  ? 'rgb(255, 255, 255)'
                  : stat.color,
              }}
            >
              <stat.icon />
            </Avatar>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: isDarkMode 
                    ? 'rgb(255, 255, 255)'
                    : theme.palette.text.primary,
                  mb: 0.5,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode 
                    ? alpha(theme.palette.common.white, 0.7)
                    : theme.palette.text.secondary,
                  fontWeight: 500,
                }}
              >
                {stat.title}
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default StatsCards; 