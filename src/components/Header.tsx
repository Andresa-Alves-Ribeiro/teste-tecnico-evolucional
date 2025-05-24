import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: 'linear-gradient(to right, #111827, #1f2937)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Toolbar 
        sx={{
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 1.5, sm: 2 },
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          }
        }}
      >
        <Typography 
          variant="h5" 
          component="div" 
          sx={{
            flexGrow: 1,
            color: '#ffffff',
            fontWeight: 700,
            letterSpacing: '0.5px',
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -4,
              left: 0,
              width: '40px',
              height: '3px',
              background: 'linear-gradient(90deg, #60a5fa, transparent)',
              borderRadius: '2px',
            }
          }}
        >
          Sistema de Gestão Escolar
        </Typography>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1, sm: 2 },
            alignItems: 'center',
          }}
        >
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{
              color: '#ffffff',
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: '8px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              textTransform: 'none',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontWeight: 500,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.3s ease',
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                '&::before': {
                  transform: 'translateX(100%)',
                }
              },
            }}
          >
            {isMobile ? 'Alunos' : 'Gerenciar Alunos'}
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/teachers"
            sx={{
              color: '#ffffff',
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: '8px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              textTransform: 'none',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontWeight: 500,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.3s ease',
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                '&::before': {
                  transform: 'translateX(100%)',
                }
              },
            }}
          >
            {isMobile ? 'Professores' : 'Gerenciar Professores'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 