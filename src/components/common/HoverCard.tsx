import React from 'react';
import { motion } from 'framer-motion';
import { Box, BoxProps, useTheme } from '@mui/material';

interface HoverCardProps extends BoxProps {
  children: React.ReactNode;
  hoverScale?: number;
  hoverElevation?: number;
}

const HoverCard: React.FC<HoverCardProps> = ({
  children,
  hoverScale = 1.02,
  hoverElevation = 8,
  ...props
}) => {
  const theme = useTheme();

  return (
    <motion.div
      whileHover={{
        scale: hoverScale,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 10,
        },
      }}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        {...props}
        sx={{
          ...props.sx,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: theme.shadows[hoverElevation],
          },
        }}
      >
        {children}
      </Box>
    </motion.div>
  );
};

export default HoverCard; 