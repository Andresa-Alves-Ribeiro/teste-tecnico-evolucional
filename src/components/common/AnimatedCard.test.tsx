import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import AnimatedCard from './AnimatedCard';
import { getTheme } from '../../styles/theme';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, animate, exit, transition, ...props }: any) => (
      <div
        data-testid="motion-div"
        data-initial={JSON.stringify(initial)}
        data-animate={JSON.stringify(animate)}
        data-exit={JSON.stringify(exit)}
        data-transition={JSON.stringify(transition)}
        {...props}
      >
        {children}
      </div>
    ),
  },
}));

const renderAnimatedCard = (children: React.ReactNode = 'Test Content', props = {}) => {
  return render(
    <ThemeProvider theme={getTheme('light')}>
      <AnimatedCard {...props}>{children}</AnimatedCard>
    </ThemeProvider>
  );
};

describe('AnimatedCard Component', () => {
  it('renders children content', () => {
    renderAnimatedCard();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders with motion.div wrapper', () => {
    renderAnimatedCard();
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toBeInTheDocument();
  });

  it('applies default animation properties', () => {
    renderAnimatedCard();
    const motionDiv = screen.getByTestId('motion-div');
    
    const initial = JSON.parse(motionDiv.getAttribute('data-initial') || '{}');
    const animate = JSON.parse(motionDiv.getAttribute('data-animate') || '{}');
    const exit = JSON.parse(motionDiv.getAttribute('data-exit') || '{}');
    const transition = JSON.parse(motionDiv.getAttribute('data-transition') || '{}');

    expect(initial).toEqual({ opacity: 0, y: 20 });
    expect(animate).toEqual({ opacity: 1, y: 0 });
    expect(exit).toEqual({ opacity: 0, y: -20 });
    expect(transition).toEqual({
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 0,
    });
  });

  it('applies custom index delay', () => {
    renderAnimatedCard('Test Content', { index: 2 });
    const motionDiv = screen.getByTestId('motion-div');
    const transition = JSON.parse(motionDiv.getAttribute('data-transition') || '{}');

    expect(transition.delay).toBe(0.2); // 2 * 0.1
  });

  it('renders complex children components', () => {
    const ComplexChild = () => (
      <div data-testid="complex-child">
        <h1>Title</h1>
        <p>Content</p>
      </div>
    );
    
    renderAnimatedCard(<ComplexChild />);
    expect(screen.getByTestId('complex-child')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies custom styles through Box props', () => {
    renderAnimatedCard('Test Content', {
      sx: { backgroundColor: 'blue', padding: '16px' },
    });
    
    const box = screen.getByText('Test Content').parentElement;
    expect(box).toHaveStyle({
      backgroundColor: expect.any(String),
      padding: expect.any(String),
    });
  });
}); 