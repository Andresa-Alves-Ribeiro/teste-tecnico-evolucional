import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme, useMediaQuery, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: 'linear-gradient(to right, #111827, #1f2937)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        zIndex: theme.zIndex.drawer + 1,
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: 'primary.light',
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            <SchoolIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />
          </Avatar>
          <Typography
            variant="h5"
            component="div"
            sx={{
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
                background: 'linear-gradient(90deg, #64b5f6, transparent)',
                borderRadius: '2px',
              }
            }}
          >
            EduGestão
          </Typography>
        </Box>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              sx={{ ml: 'auto' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1.5,
                    background: 'rgba(26, 35, 126, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                  }
                }
              }}
            >
              <MenuItem component={Link} to="/" onClick={handleClose}>Gerenciar Alunos</MenuItem>
              <MenuItem component={Link} to="/teachers" onClick={handleClose}>Gerenciar Professores</MenuItem>
              <MenuItem component={Link} to="/classes" onClick={handleClose}>Turmas</MenuItem>
              <MenuItem component={Link} to="/grades" onClick={handleClose}>Notas</MenuItem>
            </Menu>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              ml: 'auto',
            }}
          >
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                color: '#ffffff',
                px: 3,
                py: 1.5,
                borderRadius: '8px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textTransform: 'none',
                fontSize: '1rem',
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
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '0%',
                  height: '2px',
                  background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
                  transition: 'width 0.3s ease',
                  borderRadius: '2px',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  '&::before': {
                    transform: 'translateX(100%)',
                  },
                  '&::after': {
                    width: '80%',
                  }
                },
                '&:active': {
                  transform: 'translateY(0)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }
              }}
            >
              Gerenciar Alunos
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/teachers"
              sx={{
                color: '#ffffff',
                px: 3,
                py: 1.5,
                borderRadius: '8px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textTransform: 'none',
                fontSize: '1rem',
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
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '0%',
                  height: '2px',
                  background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
                  transition: 'width 0.3s ease',
                  borderRadius: '2px',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  '&::before': {
                    transform: 'translateX(100%)',
                  },
                  '&::after': {
                    width: '80%',
                  }
                },
                '&:active': {
                  transform: 'translateY(0)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }
              }}
            >
              Gerenciar Professores
            </Button>

            <IconButton
              color="inherit"
              sx={{
                ml: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 