import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { AppProvider, useApp } from '../../context/AppContext';

const TestComponent = () => {
  const { state, dispatch } = useApp();

  return (
    <div>
      <div data-testid="feedback-type">{state.feedback.type || ''}</div>
      <div data-testid="feedback-message">{state.feedback.message || ''}</div>
      <div data-testid="loading">{state.loading.toString()}</div>
      <div data-testid="dark-mode">{state.isDarkMode.toString()}</div>
      <button
        data-testid="show-feedback"
        onClick={() => dispatch({ type: 'SHOW_FEEDBACK', payload: { type: 'success', message: 'Test message' } })}
      >
        Show Feedback
      </button>
      <button data-testid="hide-feedback" onClick={() => dispatch({ type: 'HIDE_FEEDBACK' })}>
        Hide Feedback
      </button>
      <button data-testid="set-loading" onClick={() => dispatch({ type: 'SET_LOADING', payload: true })}>
        Set Loading
      </button>
    </div>
  );
};

describe('AppContext', () => {
  it('should provide initial state', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('feedback-type').textContent).toBe('');
    expect(screen.getByTestId('feedback-message').textContent).toBe('');
    expect(screen.getByTestId('loading').textContent).toBe('false');
    expect(screen.getByTestId('dark-mode').textContent).toBe('false');
  });

  it('should show feedback', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByTestId('show-feedback').click();
    });

    expect(screen.getByTestId('feedback-type').textContent).toBe('success');
    expect(screen.getByTestId('feedback-message').textContent).toBe('Test message');
  });

  it('should hide feedback', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByTestId('show-feedback').click();
      screen.getByTestId('hide-feedback').click();
    });

    expect(screen.getByTestId('feedback-type').textContent).toBe('');
    expect(screen.getByTestId('feedback-message').textContent).toBe('');
  });

  it('should set loading state', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByTestId('set-loading').click();
    });

    expect(screen.getByTestId('loading').textContent).toBe('true');
  });
}); 