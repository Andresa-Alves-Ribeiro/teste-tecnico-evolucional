import React from 'react';
import { Box, Typography, useTheme, Paper, alpha, IconButton, Tooltip as MuiTooltip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface StudentChartProps {
  chartData: Array<{
    name: string;
    students: number;
  }>;
}

const StudentChart = ({ chartData }: StudentChartProps) => {
  const theme = useTheme();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          elevation={3}
          sx={{
            p: 2,
            backgroundColor: alpha(theme.palette.background.paper, 0.98),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            borderRadius: 2,
            backdropFilter: 'blur(8px)',
            boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`,
          }}
        >
          <Typography variant="subtitle2" sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 0.5 }}>
            {label}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 500 }}>
            {`Total de Alunos: ${payload[0].value}`}
          </Typography>
        </Paper>
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
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.98)})`,
        backdropFilter: 'blur(10px)',
        boxShadow: `0 4px 24px ${alpha(theme.palette.common.black, 0.06)}`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        height: { xs: 300, sm: 400 },
        transition: 'all 0.3s ease-in-out',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`,
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <TrendingUpIcon sx={{ color: theme.palette.primary.main }} />
          Distribuição de Alunos por Série
        </Typography>
        <MuiTooltip title="Este gráfico mostra a distribuição de alunos por série escolar">
          <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
            <InfoOutlinedIcon />
          </IconButton>
        </MuiTooltip>
      </Box>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0.4}/>
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={alpha(theme.palette.divider, 0.1)}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: theme.palette.text.secondary }}
            tickLine={false}
            axisLine={{ stroke: alpha(theme.palette.divider, 0.1) }}
          />
          <YAxis
            tick={{ fill: theme.palette.text.secondary }}
            tickLine={false}
            axisLine={{ stroke: alpha(theme.palette.divider, 0.1) }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="students"
            fill="url(#colorGradient)"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationBegin={0}
          >
            {chartData.map((entry, index) => (
              <Label
                key={`label-${index}`}
                value={entry.students}
                position="top"
                fill={theme.palette.text.secondary}
                fontSize={12}
                fontWeight={500}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default StudentChart; 