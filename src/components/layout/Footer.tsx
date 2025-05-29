import React from 'react';
import { Box, Container, Grid, Typography, Link, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(to right, ${theme.palette.background.paper}, ${alpha(theme.palette.background.paper, 0.98)})`
          : `linear-gradient(to right, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.dark, 0.95)})`,
        boxShadow: `0 2px 12px ${alpha(theme.palette.common.black, 0.08)}`,
        backdropFilter: 'blur(8px)',
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        pt: 8,
        pb: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} lg={4}>
            <Box sx={{ maxWidth: 320, mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : 'white',
                  mb: 2,
                }}
              >
                Gestão Escolar
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                  mb: 3,
                }}
              >
                Uma solução completa para gerenciar sua instituição de ensino com ferramentas e recursos modernos.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Link
                  href="#"
                  sx={{
                    color: theme.palette.mode === 'dark' ? theme.palette.primary.light : 'white',
                    '&:hover': {
                      color: theme.palette.mode === 'dark' ? theme.palette.primary.main : '#64b5f6',
                      backgroundColor: alpha(theme.palette.common.white, 0.1),
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <FacebookIcon />
                </Link>
                <Link
                  href="#"
                  sx={{
                    color: theme.palette.mode === 'dark' ? theme.palette.primary.light : 'white',
                    '&:hover': {
                      color: theme.palette.mode === 'dark' ? theme.palette.primary.main : '#64b5f6',
                      backgroundColor: alpha(theme.palette.common.white, 0.1),
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <TwitterIcon />
                </Link>
                <Link
                  href="#"
                  sx={{
                    color: theme.palette.mode === 'dark' ? theme.palette.primary.light : 'white',
                    '&:hover': {
                      color: theme.palette.mode === 'dark' ? theme.palette.primary.main : '#64b5f6',
                      backgroundColor: alpha(theme.palette.common.white, 0.1),
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <InstagramIcon />
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.mode === 'dark' ? theme.palette.primary.light : 'white',
                fontWeight: 600,
                borderBottom: `2px solid ${alpha(theme.palette.common.white, 0.1)}`,
                pb: 1,
                mb: 3,
              }}
            >
              Links Rápidos
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {['Início', 'Professores', 'Alunos'].map((item) => (
                <Box
                  component="li"
                  key={item}
                  sx={{
                    mb: 2,
                    '&:last-child': { mb: 0 },
                  }}
                >
                  <Link
                    href="#"
                    sx={{
                      color: theme.palette.mode === 'dark' ? theme.palette.primary.light : 'white',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      '&:hover': {
                        color: theme.palette.mode === 'dark' ? theme.palette.primary.light : 'white',
                        backgroundColor: alpha(theme.palette.common.white, 0.1),
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <ArrowForwardIcon
                      className="arrow"
                      sx={{
                        fontSize: 16,
                        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : '#64b5f6',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.mode === 'dark' ? theme.palette.primary.light : 'white',
                fontWeight: 600,
                borderBottom: `2px solid ${alpha(theme.palette.common.white, 0.1)}`,
                pb: 1,
                mb: 3,
              }}
            >
              Contato
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <Box
                component="li"
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  mb: 2,
                }}
              >
                <EmailIcon sx={{ color: theme.palette.mode === 'dark' ? theme.palette.primary.main : '#64b5f6', mt: 0.5 }} />
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  contato@gestaoescolar.com
                </Typography>
              </Box>
              <Box
                component="li"
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  mb: 2,
                }}
              >
                <PhoneIcon sx={{ color: theme.palette.mode === 'dark' ? theme.palette.primary.main : '#64b5f6', mt: 0.5 }} />
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  (123) 456-7890
                </Typography>
              </Box>
              <Box
                component="li"
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                }}
              >
                <LocationOnIcon sx={{ color: theme.palette.mode === 'dark' ? theme.palette.primary.main : '#64b5f6', mt: 0.5 }} />
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  Rua da Educação, 123, Cidade do Aprendizado
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            mt: 8,
            pt: 4,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            &copy; {new Date().getFullYear()} Gestão Escolar. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 