import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme, useMediaQuery, Avatar, IconButton, Menu, MenuItem, Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { alpha } from '@mui/material/styles';
import { useDarkMode } from '../../hooks/useDarkMode';

const navigationItems = [
  { path: '/', label: 'Gerenciar Alunos' },
  { path: '/teachers', label: 'Gerenciar Professores' }
];

const Logo = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar
        sx={{
          bgcolor: 'primary.light',
          width: { xs: 36, sm: 42 },
          height: { xs: 36, sm: 42 },
          boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.25)}`,
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          }
        }}
      >
        <SchoolIcon sx={{ 
          fontSize: { xs: 20, sm: 24 }, 
          color: theme.palette.mode === 'dark' ? theme.palette.primary.light : 'white' 
        }} />
      </Avatar>
      <Typography
        variant="h5"
        component="div"
        sx={{
          color: theme.palette.mode === 'dark' ? theme.palette.primary.light : 'white',
          fontWeight: 600,
          letterSpacing: '0.3px',
          fontSize: { xs: '1.1rem', sm: '1.3rem' },
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -4,
            left: 0,
            width: '32px',
            height: '2px',
            background: theme.palette.mode === 'dark' 
              ? `linear-gradient(90deg, ${theme.palette.primary.light}, transparent)`
              : 'linear-gradient(90deg, white, transparent)',
            borderRadius: '1px',
          }
        }}
      >
        EduGestão
      </Typography>
    </Box>
  );
};

const NavigationLink = ({ path, label, isActive }: { path: string; label: string; isActive: boolean }) => {
  const theme = useTheme();
  const linkStyles = {
    color: theme.palette.mode === 'dark' ? theme.palette.primary.light : 'white',
    px: 2.5,
    py: 1,
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    textTransform: 'none',
    fontSize: '0.95rem',
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
      background: alpha(theme.palette.common.white, 0.1),
      transform: 'translateX(-100%)',
      transition: 'transform 0.3s ease',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: isActive ? '80%' : '0%',
      height: '2px',
      background: theme.palette.mode === 'dark' 
        ? `linear-gradient(90deg, ${theme.palette.primary.light}, transparent)`
        : 'linear-gradient(90deg, white, transparent)',
      transition: 'width 0.3s ease',
      borderRadius: '2px',
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.1),
      transform: 'translateY(-1px)',
      '&::before': {
        transform: 'translateX(100%)',
      },
      '&::after': {
        width: '80%',
      }
    },
    '&:active': {
      transform: 'translateY(0)',
    }
  };

  return (
    <Button
      color="inherit"
      component={Link}
      to={path}
      sx={linkStyles}
      role="link"
      aria-label={label}
    >
      {label}
    </Button>
  );
};

const MobileMenu = ({ anchorEl, onClose, isActive }: { anchorEl: HTMLElement | null; onClose: () => void; isActive: (path: string) => boolean }) => {
  const theme = useTheme();
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            mt: 1.5,
            minWidth: 200,
            background: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
            boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`,
          }
        }
      }}
    >
      {navigationItems.map(({ path, label }) => (
        <MenuItem
          key={path}
          component={Link}
          to={path}
          onClick={onClose}
          sx={{
            py: 1.5,
            color: theme.palette.text.primary,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: isActive(path) ? '80%' : '0%',
              height: '2px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
              transition: 'width 0.3s ease',
              borderRadius: '2px',
            },
            '&:hover': {
              background: alpha(theme.palette.primary.main, 0.08),
              '&::after': {
                width: '80%',
              }
            },
          }}
        >
          {label}
        </MenuItem>
      ))}
    </Menu>
  );
};

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(to right, ${theme.palette.background.paper}, ${alpha(theme.palette.background.paper, 0.98)})`
          : `linear-gradient(to right, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.dark, 0.95)})`,
        boxShadow: `0 2px 12px ${alpha(theme.palette.common.black, 0.08)}`,
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            px: { xs: 2, sm: 3 },
            py: { xs: 1.5, sm: 2 },
            minHeight: { xs: 64, sm: 70 },
            position: 'relative',
          }}
        >
          <Logo />

          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{ 
                  ml: 'auto',
                  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : 'white',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.common.white, 0.1),
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              <MobileMenu anchorEl={anchorEl} onClose={handleClose} isActive={isActive} />
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                alignItems: 'center',
                ml: 'auto',
              }}
            >
              {navigationItems.map(({ path, label }) => (
                <NavigationLink
                  key={path}
                  path={path}
                  label={label}
                  isActive={isActive(path)}
                />
              ))}
              <IconButton
                color="inherit"
                onClick={toggleDarkMode}
                sx={{
                  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : 'white',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.common.white, 0.1),
                  }
                }}
                data-testid="theme-toggle"
              >
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <IconButton
                color="inherit"
                sx={{
                  ml: 1,
                  backgroundColor: alpha(theme.palette.common.white, 0.1),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.common.white, 0.15),
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <AccountCircleIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 