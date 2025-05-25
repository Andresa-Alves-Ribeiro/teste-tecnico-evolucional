import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  useTheme,
  useMediaQuery,
  Paper,
  alpha,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import { Degree, Class } from '../../types';
import AddIcon from '@mui/icons-material/Add';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import FilterListIcon from '@mui/icons-material/FilterList';

interface FiltersPanelProps {
  title: string;
  selectedDegree: number | '';
  selectedClass: number | '';
  degrees: Degree[];
  classes: Class[];
  onDegreeChange: (value: number | '') => void;
  onClassChange: (value: number | '') => void;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

const FiltersPanel = ({
  title,
  selectedDegree,
  selectedClass,
  degrees,
  classes,
  onDegreeChange,
  onClassChange,
  actionButton,
}: FiltersPanelProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${alpha('#1F2937', 0.95)}, ${alpha('#111827', 0.98)})`
          : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.98)})`,
        backdropFilter: 'blur(10px)',
        boxShadow: theme.palette.mode === 'dark'
          ? `0 4px 24px ${alpha(theme.palette.common.black, 0.3)}`
          : `0 4px 24px ${alpha(theme.palette.common.black, 0.06)}`,
        border: `1px solid ${alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.2 : 0.1)}`,
        transition: 'all 0.3s ease-in-out',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.palette.mode === 'dark'
            ? `0 8px 32px ${alpha(theme.palette.common.black, 0.4)}`
            : `0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`,
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
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <FilterListIcon sx={{ 
          color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
          fontSize: 28 
        }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
          }}
        >
          {title}
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 3,
          alignItems: isMobile ? 'stretch' : 'center',
        }}
      >
        <FormControl
          fullWidth={isMobile}
          sx={{
            minWidth: isMobile ? '100%' : 260,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              transition: 'all 0.2s ease-in-out',
              backgroundColor: theme.palette.mode === 'dark'
                ? alpha('#1F2937', 0.8)
                : alpha(theme.palette.background.paper, 0.8),
              '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
                borderWidth: 2,
              },
              '&.Mui-focused fieldset': {
                borderWidth: 2,
                borderColor: theme.palette.primary.main,
                boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
              },
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.text.secondary,
              fontWeight: 500,
              '&.Mui-focused': {
                color: theme.palette.primary.main,
                fontWeight: 600,
              },
            },
          }}
        >
          <InputLabel>
            <Stack direction="row" spacing={1} alignItems="center">
              <SchoolIcon sx={{ 
                fontSize: 20,
                color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main
              }} />
              <span>Série</span>
            </Stack>
          </InputLabel>
          <Select
            value={selectedDegree}
            label={
              <Stack direction="row" spacing={1} alignItems="center">
                <SchoolIcon sx={{ 
                  fontSize: 20,
                  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main
                }} />
                <span>Série</span>
              </Stack>
            }
            onChange={(e) => onDegreeChange(e.target.value as number | '')}
            sx={{
              '& .MuiSelect-select': {
                py: 1.75,
                px: 2,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.3 : 0.2),
              },
            }}
          >
            <MenuItem value="">
              <Chip
                label="Todas as Séries"
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.2 : 0.1),
                  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
                  fontWeight: 500,
                }}
              />
            </MenuItem>
            {degrees.map((degree) => (
              <MenuItem
                key={degree.id}
                value={degree.id}
                sx={{
                  py: 1.5,
                  px: 2,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.15 : 0.08),
                  },
                  '&.Mui-selected': {
                    backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.2 : 0.12),
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.25 : 0.16),
                    },
                  },
                }}
              >
                {degree.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          fullWidth={isMobile}
          sx={{
            minWidth: isMobile ? '100%' : 260,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              transition: 'all 0.2s ease-in-out',
              backgroundColor: theme.palette.mode === 'dark'
                ? alpha('#1F2937', 0.8)
                : alpha(theme.palette.background.paper, 0.8),
              '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
                borderWidth: 2,
              },
              '&.Mui-focused fieldset': {
                borderWidth: 2,
                borderColor: theme.palette.primary.main,
                boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
              },
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.text.secondary,
              fontWeight: 500,
              '&.Mui-focused': {
                color: theme.palette.primary.main,
                fontWeight: 600,
              },
            },
          }}
        >
          <InputLabel>
            <Stack direction="row" spacing={1} alignItems="center">
              <ClassIcon sx={{ 
                fontSize: 20,
                color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main
              }} />
              <span>Classe</span>
            </Stack>
          </InputLabel>
          <Select
            value={selectedClass}
            label={
              <Stack direction="row" spacing={1} alignItems="center">
                <ClassIcon sx={{ 
                  fontSize: 20,
                  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main
                }} />
                <span>Classe</span>
              </Stack>
            }
            onChange={(e) => onClassChange(e.target.value as number | '')}
            sx={{
              '& .MuiSelect-select': {
                py: 1.75,
                px: 2,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.3 : 0.2),
              },
            }}
          >
            <MenuItem value="">
              <Chip
                label="Todas as Classes"
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.2 : 0.1),
                  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
                  fontWeight: 500,
                }}
              />
            </MenuItem>
            {classes.map((cls) => (
              <MenuItem
                key={cls.id}
                value={cls.id}
                sx={{
                  py: 1.5,
                  px: 2,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.15 : 0.08),
                  },
                  '&.Mui-selected': {
                    backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.2 : 0.12),
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.25 : 0.16),
                    },
                  },
                }}
              >
                {cls.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {actionButton && (
          <Button
            variant="contained"
            onClick={actionButton.onClick}
            startIcon={actionButton.icon || <AddIcon />}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
              color: 'white',
              boxShadow: theme.palette.mode === 'dark'
                ? `0 4px 14px ${alpha(theme.palette.primary.main, 0.3)}`
                : `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark,
                boxShadow: theme.palette.mode === 'dark'
                  ? `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`
                  : `0 6px 20px ${alpha(theme.palette.primary.main, 0.6)}`,
              },
            }}
          >
            {actionButton.label}
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default FiltersPanel; 