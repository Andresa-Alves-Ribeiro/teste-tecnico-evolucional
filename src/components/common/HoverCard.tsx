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
  sx,
  ...props
}) => {
  const theme = useTheme();

  const boxStyles = {
    ...sx,
    width: '100%',
    height: '100%',
    transition: 'all 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  };

  return (
    <motion.div
      data-testid="motion-div"
      whileHover={{
        scale: hoverScale,
        boxShadow: theme.shadows[hoverElevation],
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 10,
        },
      }}
      style={boxStyles}
    >
      <Box {...props}>
        {children}
      </Box>
    </motion.div>
  );
};

export default HoverCard; 