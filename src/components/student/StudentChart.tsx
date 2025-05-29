import React from 'react';
import { 
  Box, 
  Typography, 
  useTheme, 
  Paper, 
  alpha, 
  Grid, 
  Chip, 
  useMediaQuery,
  Fade,
  Skeleton
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine
} from 'recharts';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';

interface StudentChartProps {
  chartData: Array<{
    name: string;
    students: number;
  }>;
  loading?: boolean;
}

const StudentChart = ({ chartData, loading = false }: StudentChartProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDarkMode = theme.palette.mode === 'dark';

  if (loading) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3,
          height: 'auto',
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.98)})`,
          backdropFilter: 'blur(10px)',
          boxShadow: `0 4px 24px ${alpha(theme.palette.common.black, 0.06)}`,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderRadius: 2,
        }}
      >
        <Skeleton variant="text" width="60%" height={40} sx={{ mb: 3 }} data-testid="skeleton" />
        <Skeleton variant="rectangular" height={300} data-testid="skeleton" />
      </Paper>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          textAlign: 'center', 
          color: 'text.secondary',
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.98)})`,
          backdropFilter: 'blur(10px)',
          boxShadow: `0 4px 24px ${alpha(theme.palette.common.black, 0.06)}`,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderRadius: 2,
        }}
      >
        <InfoIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 1 }}>
          Nenhum dado disponível
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Não há dados de alunos para exibir no momento
        </Typography>
      </Paper>
    );
  }

  const totalStudents = chartData.reduce((acc, curr) => acc + curr.students, 0);
  const averageStudents = Math.round((totalStudents / chartData.length) * 10) / 10;

  const formatNumber = (num: number) => {
    return num.toLocaleString('pt-BR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Fade in={active}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              backgroundColor: alpha(theme.palette.background.paper, 0.98),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              borderRadius: 1,
              boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
              {label}
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <PeopleIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
              <Typography variant="body2">
                {`${payload[0].value} alunos`}
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
              {`${((payload[0].value / totalStudents) * 100).toFixed(1)}% do total`}
            </Typography>
          </Paper>
        </Fade>
      );
    }
    return null;
  };

  return (
    <Paper 
      elevation={0} 
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        background: isDarkMode
          ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.98))'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(245, 247, 250, 0.95))',
        boxShadow: isDarkMode
          ? '0 4px 24px rgba(0, 0, 0, 0.3)'
          : '0 4px 24px rgba(0, 0, 0, 0.06)',
        border: isDarkMode
          ? '1px solid rgba(255, 255, 255, 0.2)'
          : '1px solid rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: isDarkMode
            ? '0 8px 32px rgba(0, 0, 0, 0.4)'
            : '0 8px 32px rgba(0, 0, 0, 0.08)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        },
      }}
    >
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SchoolIcon 
              sx={{ 
                color: 'white',
                fontSize: { xs: 24, sm: 28 },
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: theme.palette.text.primary,
                fontSize: { xs: '1rem', sm: '1.1rem' },
              }}
            >
              Distribuição de Alunos
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: { xs: 'flex-start', md: 'flex-end' }, 
            gap: 1,
            flexWrap: 'wrap'
          }}>
            <Chip
              icon={<TrendingUpIcon />}
              label={`Total: ${totalStudents} alunos`}
              color="primary"
              variant="outlined"
              size="small"
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                '& .MuiChip-icon': { color: theme.palette.primary.main }
              }}
            />
            <Chip
              icon={<PeopleIcon />}
              label={`Média: ${formatNumber(averageStudents)} alunos`}
              color="secondary"
              variant="outlined"
              size="small"
              sx={{ 
                backgroundColor: alpha(theme.palette.secondary.main, 0.08),
                '& .MuiChip-icon': { color: theme.palette.secondary.main }
              }}
            />
          </Box>
        </Grid>
      </Grid>
      
      <Box sx={{ 
        width: '100%', 
        height: { xs: 250, sm: 300, md: 350 },
        position: 'relative'
      }}>
        <ResponsiveContainer>
          <BarChart 
            data={chartData}
            margin={{ 
              top: 20, 
              right: isMobile ? 10 : 30, 
              left: isMobile ? 0 : 20, 
              bottom: 5 
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={alpha(theme.palette.divider, 0.1)}
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              tick={{ 
                fill: theme.palette.text.secondary,
                fontSize: isMobile ? 10 : 12
              }}
              axisLine={{ stroke: alpha(theme.palette.divider, 0.1) }}
              tickLine={{ stroke: alpha(theme.palette.divider, 0.1) }}
              height={isMobile ? 80 : 60}
              angle={isMobile ? -45 : 0}
              textAnchor={isMobile ? 'end' : 'middle'}
            />
            <YAxis 
              tick={{ 
                fill: theme.palette.text.secondary,
                fontSize: isMobile ? 10 : 12
              }}
              axisLine={{ stroke: alpha(theme.palette.divider, 0.1) }}
              tickLine={{ stroke: alpha(theme.palette.divider, 0.1) }}
              width={isMobile ? 30 : 40}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={averageStudents} 
              stroke={theme.palette.secondary.main}
              strokeDasharray="3 3"
              label={{ 
                value: 'Média', 
                position: 'right',
                fill: theme.palette.secondary.main,
                fontSize: 12
              }}
            />
            <Bar 
              dataKey="students" 
              fill={theme.palette.primary.main}
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationBegin={0}
              maxBarSize={isMobile ? 40 : 60}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box sx={{ 
        mt: 2, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1
      }}>
        <Typography variant="caption" color="text.secondary">
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {`Total de ${chartData.length} categorias`}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StudentChart; 