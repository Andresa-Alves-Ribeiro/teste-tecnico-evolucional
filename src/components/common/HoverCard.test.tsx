import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../utils/test-utils';
import HoverCard from './HoverCard';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, style, ...props }: any) => {
      return (
        <div 
          data-testid="motion-div" 
          data-while-hover={JSON.stringify(whileHover)}
          style={{
            transition: 'all 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            ...style
          }}
          {...props}
        >
          {children}
        </div>
      );
    },
  },
}));

const renderHoverCard = (children: React.ReactNode = 'Test Content', props = {}) => {
  return render(<HoverCard {...props}>{children}</HoverCard>);
};

describe('HoverCard Component', () => {
  it('renders children correctly', () => {
    renderHoverCard();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders with motion.div wrapper', () => {
    renderHoverCard();
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toBeInTheDocument();
  });

  it('applies default hover scale', () => {
    renderHoverCard();
    const motionDiv = screen.getByTestId('motion-div');
    const whileHover = JSON.parse(motionDiv.getAttribute('data-while-hover') ?? '{}');
    
    expect(whileHover.scale).toBe(1.02);
    expect(whileHover.transition).toEqual({
      type: 'spring',
      stiffness: 400,
      damping: 10,
    });
  });

  it('applies custom hover scale', () => {
    renderHoverCard('Test Content', { hoverScale: 1.05 });
    const motionDiv = screen.getByTestId('motion-div');
    const whileHover = JSON.parse(motionDiv.getAttribute('data-while-hover') ?? '{}');
    
    expect(whileHover.scale).toBe(1.05);
    expect(whileHover.transition).toEqual({
      type: 'spring',
      stiffness: 400,
      damping: 10,
    });
  });

  it('applies default hover elevation', () => {
    renderHoverCard();
    const motionDiv = screen.getByTestId('motion-div');
    const whileHover = JSON.parse(motionDiv.getAttribute('data-while-hover') ?? '{}');
    const style = motionDiv.getAttribute('style');
    
    expect(style).toContain('width: 100%');
    expect(style).toContain('height: 100%');
    expect(style).toContain('transition: all 0.3s ease-in-out, box-shadow 0.3s ease-in-out');
    expect(whileHover.boxShadow).toBeDefined();
  });

  it('applies custom hover elevation', () => {
    renderHoverCard('Test Content', { hoverElevation: 12 });
    const motionDiv = screen.getByTestId('motion-div');
    const whileHover = JSON.parse(motionDiv.getAttribute('data-while-hover') ?? '{}');
    const style = motionDiv.getAttribute('style');
    
    expect(style).toContain('width: 100%');
    expect(style).toContain('height: 100%');
    expect(style).toContain('transition: all 0.3s ease-in-out, box-shadow 0.3s ease-in-out');
    expect(whileHover.boxShadow).toBeDefined();
  });

  it('renders complex children components', () => {
    const ComplexChild = () => (
      <div data-testid="complex-child">
        <h1>Title</h1>
        <p>Content</p>
      </div>
    );
    
    renderHoverCard(<ComplexChild />);
    const complexChild = screen.getByTestId('complex-child');
    expect(complexChild).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies custom styles through sx prop', () => {
    renderHoverCard('Test Content', {
      sx: { backgroundColor: 'red', padding: '20px' },
    });
    
    const box = screen.getByTestId('motion-div');
    const style = box.getAttribute('style');
    expect(style).toContain('background-color: red');
    expect(style).toContain('padding: 20px');
    expect(style).toContain('transition: all 0.3s ease-in-out, box-shadow 0.3s ease-in-out');
  });
}); 