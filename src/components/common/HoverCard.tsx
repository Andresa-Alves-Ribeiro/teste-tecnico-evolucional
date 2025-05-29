import { motion, MotionStyle } from 'framer-motion';
import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';

interface HoverCardProps extends BoxProps {
  children: ReactNode;
  hoverScale?: number;
  hoverElevation?: number;
}

const HoverCard = ({
  children,
  hoverScale = 1.05,
  hoverElevation = 4,
  sx,
  ...props
}: HoverCardProps) => {
  const boxStyles: MotionStyle = {
    width: '100%',
    height: '100%',
    transition: 'all 0.3s ease-in-out',
  };

  return (
    <motion.div
      whileHover={{
        scale: hoverScale,
        boxShadow: `0 ${hoverElevation}px ${hoverElevation * 2}px rgba(0, 0, 0, 0.1)`,
      }}
      style={boxStyles}
    >
      <Box sx={sx} {...props}>
        {children}
      </Box>
    </motion.div>
  );
};

export default HoverCard; 