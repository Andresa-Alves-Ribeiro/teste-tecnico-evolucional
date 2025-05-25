import React from 'react';
import { useTheme } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import StatsCards from '../../common/StatsCards';

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

  return <StatsCards stats={stats} />;
};

export default StudentStats; 