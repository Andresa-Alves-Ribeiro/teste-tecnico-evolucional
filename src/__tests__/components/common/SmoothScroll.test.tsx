import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material';
import SmoothScroll from '../../../components/common/SmoothScroll';
import { getTheme } from '../../../styles/theme';

const renderSmoothScroll = (children: React.ReactNode = 'Test Content') => {
  return render(
    <ThemeProvider theme={getTheme('light')}>
      <SmoothScroll>{children}</SmoothScroll>
    </ThemeProvider>
  );
};

describe('SmoothScroll Component', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn();
  });

  it('renders children content', () => {
    renderSmoothScroll();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('handles anchor click with valid target', () => {
    renderSmoothScroll(
      <>
        <a href="#test-section">Scroll to section</a>
        <div id="test-section">Target section</div>
      </>
    );

    const anchor = screen.getByText('Scroll to section');
    fireEvent.click(anchor);

    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('does not scroll when target element does not exist', () => {
    renderSmoothScroll(
      <a href="#non-existent">Scroll to non-existent</a>
    );

    const anchor = screen.getByText('Scroll to non-existent');
    fireEvent.click(anchor);

    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  });

  it('does not scroll when clicking non-anchor elements', () => {
    renderSmoothScroll(
      <button>Click me</button>
    );

    const button = screen.getByText('Click me');
    fireEvent.click(button);

    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  });

  it('applies custom scroll behavior and block position', () => {
    render(
      <ThemeProvider theme={getTheme('light')}>
        <SmoothScroll behavior="auto" block="center">
          <a href="#test-section">Scroll to section</a>
          <div id="test-section">Target section</div>
        </SmoothScroll>
      </ThemeProvider>
    );

    const anchor = screen.getByText('Scroll to section');
    fireEvent.click(anchor);

    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'center',
    });
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    const { unmount } = renderSmoothScroll();

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
}); 