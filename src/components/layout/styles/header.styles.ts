import { alpha } from '@mui/material/styles';
import { Theme } from '@mui/material';

export const logoStyles = (theme: Theme) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
});

export const logoAvatarStyles = (theme: Theme) => ({
  bgcolor: 'primary.light',
  width: { xs: 36, sm: 42 },
  height: { xs: 36, sm: 42 },
  boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.25)}`,
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  }
});

export const logoIconStyles = (theme: Theme) => ({
  fontSize: { xs: 20, sm: 24 },
  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : 'white'
});

export const logoTextStyles = (theme: Theme) => ({
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
});

export const navigationLinkStyles = (theme: Theme, isActive: boolean) => ({
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
  textDecoration: 'none',
  display: 'inline-block',
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
});

export const mobileMenuStyles = (theme: Theme) => ({
  mt: 1.5,
  minWidth: 200,
  background: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`,
});

export const menuItemStyles = (theme: Theme, isActive: boolean) => ({
  py: 1.5,
  color: theme.palette.text.primary,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: isActive ? '80%' : '0%',
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
});

export const appBarStyles = (theme: Theme) => ({
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(to right, ${theme.palette.background.paper}, ${alpha(theme.palette.background.paper, 0.98)})`
    : `linear-gradient(to right, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.dark, 0.95)})`,
  boxShadow: `0 2px 12px ${alpha(theme.palette.common.black, 0.08)}`,
  backdropFilter: 'blur(8px)',
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  zIndex: theme.zIndex.drawer + 1,
});

export const toolbarStyles = {
  px: { xs: 2, sm: 3 },
  py: { xs: 1.5, sm: 2 },
  minHeight: { xs: 64, sm: 70 },
  position: 'relative',
};

export const navigationContainerStyles = {
  display: 'flex',
  gap: 1.5,
  alignItems: 'center',
  ml: 'auto',
};

export const themeToggleButtonStyles = (theme: Theme) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : 'white',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  }
});

export const accountButtonStyles = (theme: Theme) => ({
  ml: 1,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    transform: 'scale(1.05)',
  },
  transition: 'all 0.2s ease',
}); 