import React, { useEffect } from 'react';
import { Box, BoxProps } from '@mui/material';

interface SmoothScrollProps extends BoxProps {
  children: React.ReactNode;
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({
  children,
  behavior = 'smooth',
  block = 'start',
  ...props
}) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior,
            block,
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [behavior, block]);

  return <Box {...props}>{children}</Box>;
};

export default SmoothScroll; 