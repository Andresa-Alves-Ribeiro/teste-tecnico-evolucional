import React from 'react';
import { Box, useTheme, alpha, Typography, Paper } from '@mui/material';
import StudentFilters from '../StudentFilters';
import StudentChart from '../StudentChart';
import { Degree, Class } from '../../../types';
import SchoolIcon from '@mui/icons-material/School';

interface StudentFiltersAndChartProps {
  selectedDegree: number | '';
  selectedClass: number | '';
  degrees: Degree[];
  classes: Class[];
  chartData: any[];
  onDegreeChange: (degree: number | '') => void;
  onClassChange: (classId: number | '') => void;
  onGenerateStudents: () => void;
}

const StudentFiltersAndChart = ({
  selectedDegree,
  selectedClass,
  degrees,
  classes,
  chartData,
  onDegreeChange,
  onClassChange,
  onGenerateStudents,
}: StudentFiltersAndChartProps) => {
  const theme = useTheme();

  return (
    <Box
      data-testid="student-filters-chart-container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        mb: 4,
      }}
    >
      <Paper
        data-testid="student-filters-chart-paper"
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          background: `linear-gradient(to bottom right, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.98)})`,
          backdropFilter: 'blur(10px)',
          boxShadow: `0 4px 24px ${alpha(theme.palette.common.black, 0.06)}`,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 3,
          }}
        >
          <SchoolIcon
            sx={{
              color: theme.palette.primary.main,
              fontSize: { xs: '1.5rem', sm: '2rem' },
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            Gestão de Alunos
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <StudentFilters
            selectedDegree={selectedDegree}
            selectedClass={selectedClass}
            degrees={degrees}
            classes={classes}
            onDegreeChange={onDegreeChange}
            onClassChange={onClassChange}
            onGenerateStudents={onGenerateStudents}
          />
          <StudentChart chartData={chartData} />
        </Box>
      </Paper>
    </Box>
  );
};

export default StudentFiltersAndChart; 