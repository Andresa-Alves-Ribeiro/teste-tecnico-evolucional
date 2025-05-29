import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import { render } from '../../../utils/test-utils';
import LoadingSkeleton from '../../../components/common/LoadingSkeleton';
import { getTheme } from '../../../styles/theme';

type ThemeType = 'light' | 'dark';

const renderLoadingSkeleton = (props = {}, theme: ThemeType = 'light') => {
  cleanup(); // Clean up before each render
  return render(
    <ThemeProvider theme={getTheme(theme)}>
      <LoadingSkeleton {...props} />
    </ThemeProvider>
  );
};

describe('LoadingSkeleton Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with default props', () => {
    renderLoadingSkeleton();
    const container = screen.getByTestId('skeleton-container');
    expect(container).toBeInTheDocument();
  });

  it('renders multiple rows', () => {
    renderLoadingSkeleton({ rows: 3 });
    const skeletons = screen.getAllByTestId(/^skeleton-\d+$/);
    expect(skeletons).toHaveLength(3);
  });

  it('applies custom width and height', () => {
    renderLoadingSkeleton({ width: 200, height: 50 });
    const skeleton = screen.getByTestId('skeleton-0');
    expect(skeleton).toHaveStyle({
      width: '200px',
      height: '50px',
    });
  });

  it('applies fullWidth prop', () => {
    renderLoadingSkeleton({ fullWidth: true });
    const container = screen.getByTestId('skeleton-container');
    const skeleton = screen.getByTestId('skeleton-0');
    
    expect(container).toHaveStyle({ width: '100%' });
    expect(skeleton).toHaveStyle({ width: '100%' });
  });

  it('applies custom spacing between rows', () => {
    renderLoadingSkeleton({ rows: 2, spacing: 2 });
    const container = screen.getByTestId('skeleton-container');
    expect(container).toHaveStyle({ gap: '16px' });
  });

  it('applies different variants', () => {
    renderLoadingSkeleton({ variant: 'circular' });
    const skeleton = screen.getByTestId('skeleton-0');
    expect(skeleton).toHaveStyle({ borderRadius: '4px' });
  });

  it('applies different animations', () => {
    renderLoadingSkeleton({ animation: 'pulse' });
    let skeletons = screen.getAllByTestId(/^skeleton-\d+$/);
    expect(skeletons[0]).toHaveClass('MuiSkeleton-pulse');

    renderLoadingSkeleton({ animation: 'wave' });
    skeletons = screen.getAllByTestId(/^skeleton-\d+$/);
    expect(skeletons[0]).toHaveClass('MuiSkeleton-wave');

    renderLoadingSkeleton({ animation: false });
    skeletons = screen.getAllByTestId(/^skeleton-\d+$/);
    expect(skeletons[0]).not.toHaveClass('MuiSkeleton-pulse');
    expect(skeletons[0]).not.toHaveClass('MuiSkeleton-wave');
  });

  it('applies correct background color based on theme', () => {
    renderLoadingSkeleton({}, 'light');
    let skeletons = screen.getAllByTestId(/^skeleton-\d+$/);
    expect(skeletons[0]).toHaveStyle({
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    });

    renderLoadingSkeleton({}, 'dark');
    skeletons = screen.getAllByTestId(/^skeleton-\d+$/);
    expect(skeletons[0]).toHaveStyle({
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    });
  });
}); 