import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import ActionFeedback from './ActionFeedback';
import { getTheme } from '../../styles/theme';

const renderActionFeedback = (props = {}) => {
  const defaultProps = {
    open: true,
    message: 'Test message',
    severity: 'success' as const,
    onClose: jest.fn(),
    ...props
  };

  return render(
    <ThemeProvider theme={getTheme('light')}>
      <ActionFeedback {...defaultProps} />
    </ThemeProvider>
  );
};

describe('ActionFeedback Component', () => {
  it('renders when open is true', () => {
    renderActionFeedback();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    renderActionFeedback({ open: false });
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    renderActionFeedback({ onClose });
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders with different severity levels', () => {
    const severities = ['success', 'error', 'warning', 'info'] as const;
    
    severities.forEach(severity => {
      const { unmount } = renderActionFeedback({ severity });
      expect(screen.getByText('Test message')).toHaveAttribute('aria-label', expect.stringContaining(severity));
      unmount();
    });
  });

  it('auto-hides after specified duration', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    const autoHideDuration = 2000;
    
    renderActionFeedback({ onClose, autoHideDuration });
    
    act(() => {
      jest.advanceTimersByTime(autoHideDuration);
    });
    
    expect(onClose).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('applies correct styling', () => {
    renderActionFeedback();
    const alert = screen.getByRole('alert');
    expect(alert).toHaveStyle({
      width: '100%'
    });
    const style = window.getComputedStyle(alert);
    expect(style.boxShadow).not.toBe('none');
    expect(style.boxShadow).not.toBe('');
  });

  it('renders with custom message', () => {
    const customMessage = 'Custom feedback message';
    renderActionFeedback({ message: customMessage });
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('handles multiple close events', () => {
    const onClose = jest.fn();
    renderActionFeedback({ onClose });
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(2);
  });
}); 