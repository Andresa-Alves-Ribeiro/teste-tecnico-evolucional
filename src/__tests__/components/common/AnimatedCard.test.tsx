import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import AnimatedCard from '../../../components/common/AnimatedCard';

// Mock do framer-motion
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

describe('AnimatedCard Component', () => {
  const theme = createTheme();

  const renderAnimatedCard = (children: ReactNode = 'Test Content', props = {}) => {
    return render(
      <ThemeProvider theme={theme}>
        <AnimatedCard {...props}>{children}</AnimatedCard>
      </ThemeProvider>
    );
  };

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
    
    const initial = JSON.parse(motionDiv.getAttribute('data-initial') ?? '{}');
    const animate = JSON.parse(motionDiv.getAttribute('data-animate') ?? '{}');
    const exit = JSON.parse(motionDiv.getAttribute('data-exit') ?? '{}');
    const transition = JSON.parse(motionDiv.getAttribute('data-transition') ?? '{}');

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
    const transition = JSON.parse(motionDiv.getAttribute('data-transition') ?? '{}');

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
}); 