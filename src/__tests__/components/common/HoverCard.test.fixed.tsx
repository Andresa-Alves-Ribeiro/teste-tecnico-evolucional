import React from 'react';
import { screen, within } from '@testing-library/react';
import { render } from '../../../utils/test-utils';
import HoverCard from '../../../components/common/HoverCard';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, style, ...props }: any) => {
      return (
        <div 
          data-testid="motion-div" 
          data-while-hover={JSON.stringify(whileHover)}
          style={{
            transition: 'all 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            width: '100%',
            height: '100%',
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
    
    expect(whileHover.scale).toBe(1.05);
    expect(whileHover.boxShadow).toBe('0 4px 8px rgba(0, 0, 0, 0.1)');
  });

  it('applies custom hover scale', () => {
    renderHoverCard('Test Content', { hoverScale: 1.1 });
    const motionDiv = screen.getByTestId('motion-div');
    const whileHover = JSON.parse(motionDiv.getAttribute('data-while-hover') ?? '{}');
    
    expect(whileHover.scale).toBe(1.1);
    expect(whileHover.boxShadow).toBe('0 4px 8px rgba(0, 0, 0, 0.1)');
  });

  it('applies default hover elevation', () => {
    renderHoverCard();
    const motionDiv = screen.getByTestId('motion-div');
    const whileHover = JSON.parse(motionDiv.getAttribute('data-while-hover') ?? '{}');
    const style = motionDiv.getAttribute('style');
    
    expect(style).toContain('width: 100%');
    expect(style).toContain('height: 100%');
    expect(style).toContain('transition: all 0.3s ease-in-out');
    expect(whileHover.boxShadow).toBe('0 4px 8px rgba(0, 0, 0, 0.1)');
  });

  it('applies custom hover elevation', () => {
    renderHoverCard('Test Content', { hoverElevation: 12 });
    const motionDiv = screen.getByTestId('motion-div');
    const whileHover = JSON.parse(motionDiv.getAttribute('data-while-hover') ?? '{}');
    const style = motionDiv.getAttribute('style');
    
    expect(style).toContain('width: 100%');
    expect(style).toContain('height: 100%');
    expect(style).toContain('transition: all 0.3s ease-in-out');
    expect(whileHover.boxShadow).toBe('0 12px 24px rgba(0, 0, 0, 0.1)');
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
    const customStyles = { backgroundColor: 'red', padding: '20px' };
    renderHoverCard('Test Content', { sx: customStyles });
    
    const motionDiv = screen.getByTestId('motion-div');
    const style = motionDiv.getAttribute('style');
    expect(style).toContain('transition: all 0.3s ease-in-out');
    expect(style).toContain('width: 100%');
    expect(style).toContain('height: 100%');
    
    const box = within(motionDiv).getByText('Test Content');
    expect(box).toHaveStyle(customStyles);
  });
}); 