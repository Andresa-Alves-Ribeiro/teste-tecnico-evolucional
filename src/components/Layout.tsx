import React from 'react';
import { Container, Box, CssBaseline } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <CssBaseline />
      <Header />
      <Container 
        maxWidth="xl" 
        className="py-8 px-4 sm:px-6 lg:px-8 flex-grow"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 64px - 400px)', // Adjust for header and footer height
        }}
      >
        <Box className="bg-white rounded-lg shadow-lg p-6 sm:p-8 flex-grow">
          {children}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout; 