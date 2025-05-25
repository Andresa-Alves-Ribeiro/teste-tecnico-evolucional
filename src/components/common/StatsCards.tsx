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
        <Paper
          key={index}
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            background: isDarkMode 
              ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.98)})`
              : `linear-gradient(135deg, ${alpha(stat.color, 0.1)}, ${alpha(stat.color, 0.05)})`,
            border: `1px solid ${isDarkMode ? alpha(theme.palette.divider, 0.2) : alpha(stat.color, 0.1)}`,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: isDarkMode 
                ? `0 8px 32px ${alpha(theme.palette.common.black, 0.4)}`
                : `0 8px 32px ${alpha(stat.color, 0.15)}`,
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                backgroundColor: isDarkMode 
                  ? alpha(stat.color, 0.2)
                  : alpha(stat.color, 0.1),
                color: isDarkMode 
                  ? theme.palette.common.white
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
                    ? theme.palette.common.white
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