import React from 'react';
import { motion } from 'framer-motion';
import { Box, BoxProps } from '@mui/material';

interface AnimatedCardProps extends BoxProps {
  index?: number;
  children: React.ReactNode;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ index = 0, children, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: index * 0.1,
      }}
    >
      <Box {...props}>
        {children}
      </Box>
    </motion.div>
  );
};

export default AnimatedCard; 