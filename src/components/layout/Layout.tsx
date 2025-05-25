import React from 'react';
import { Box, Container, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: theme.palette.mode === 'dark'
          ? theme.palette.background.default
          : alpha(theme.palette.background.default, 0.95),
      }}
    >
      <Header />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 12, sm: 14 },
          pb: { xs: 4, sm: 6 },
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.8)}, ${theme.palette.background.default})`
            : `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.9)}, ${theme.palette.background.default})`,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            px: { xs: 2, sm: 3 },
            height: '100%',
          }}
        >
          <Box
            sx={{
              borderRadius: 2,
              backdropFilter: 'blur(8px)',
              minHeight: 'calc(100vh - 200px)',
            }}
          >
            {children}
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout; 