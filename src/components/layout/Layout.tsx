import React from 'react';
import { Container, Box, CssBaseline, useTheme, useMediaQuery } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box className="min-h-screen flex flex-col bg-gray-100">
      <CssBaseline />
      <Header />
      <Container 
        maxWidth="xl" 
        className="flex-grow"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pt: { xs: '88px', sm: '96px' },
          minHeight: 'calc(100vh - 64px - 400px)',
        }}
      >
        <Box className="flex-grow">
          {children}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout; 