import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material';
import PageTransition from '../../../components/common/PageTransition';
import { getTheme } from '../../../styles/theme';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

const renderPageTransition = (children: ReactNode = 'Test Content') => {
  return render(
    <ThemeProvider theme={getTheme('light')}>
      <PageTransition>{children}</PageTransition>
    </ThemeProvider>
  );
};

describe('PageTransition Component', () => {
  it('renders children content', () => {
    renderPageTransition();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders with motion.div wrapper', () => {
    renderPageTransition();
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toBeInTheDocument();
  });

  it('applies correct motion properties', () => {
    renderPageTransition();
    const motionDiv = screen.getByTestId('motion-div');
    
    expect(motionDiv).toHaveAttribute('initial');
    expect(motionDiv).toHaveAttribute('animate');
    expect(motionDiv).toHaveAttribute('exit');
    expect(motionDiv).toHaveAttribute('transition');
  });

  it('renders complex children components', () => {
    const ComplexChild = () => (
      <div data-testid="complex-child">
        <h1>Title</h1>
        <p>Content</p>
      </div>
    );
    
    renderPageTransition(<ComplexChild />);
    expect(screen.getByTestId('complex-child')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('maintains Box styling', () => {
    renderPageTransition();
    const box = screen.getByTestId('page-transition-box');
    expect(box).toHaveStyle({
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
    });
  });

  it('handles multiple children', () => {
    renderPageTransition(
      <>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </>
    );
    
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });

  it('preserves motion animation properties', () => {
    renderPageTransition();
    const motionDiv = screen.getByTestId('motion-div');
    
    expect(motionDiv).toHaveAttribute('initial');
    expect(motionDiv).toHaveAttribute('animate');
    expect(motionDiv).toHaveAttribute('exit');
    expect(motionDiv).toHaveAttribute('transition');
  });
}); 