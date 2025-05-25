import React from 'react';
import { render, act } from '@testing-library/react';
import { AppProvider, useApp } from './AppContext';
import { Student } from '../types/Student';
import { Teacher } from '../types/Teacher';

// Componente de teste para acessar o contexto
const TestComponent = () => {
  const { state, dispatch } = useApp();
  return (
    <div>
      <div data-testid="feedback-type">{state.feedback.type}</div>
      <div data-testid="feedback-message">{state.feedback.message}</div>
      <div data-testid="loading">{state.loading.toString()}</div>
      <div data-testid="dark-mode">{state.isDarkMode.toString()}</div>
      <button
        data-testid="show-feedback"
        onClick={() => dispatch({ type: 'SHOW_FEEDBACK', payload: { type: 'success', message: 'Test message' } })}
      >
        Show Feedback
      </button>
      <button
        data-testid="hide-feedback"
        onClick={() => dispatch({ type: 'HIDE_FEEDBACK' })}
      >
        Hide Feedback
      </button>
      <button
        data-testid="set-loading"
        onClick={() => dispatch({ type: 'SET_LOADING', payload: true })}
      >
        Set Loading
      </button>
      <button
        data-testid="toggle-dark-mode"
        onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
      >
        Toggle Dark Mode
      </button>
    </div>
  );
};

describe('AppContext', () => {
  it('should provide initial state', () => {
    const { getByTestId } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(getByTestId('feedback-type').textContent).toBe('');
    expect(getByTestId('feedback-message').textContent).toBe('');
    expect(getByTestId('loading').textContent).toBe('false');
    expect(getByTestId('dark-mode').textContent).toBe('false');
  });

  it('should show feedback', () => {
    const { getByTestId } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      getByTestId('show-feedback').click();
    });

    expect(getByTestId('feedback-type').textContent).toBe('success');
    expect(getByTestId('feedback-message').textContent).toBe('Test message');
  });

  it('should hide feedback', () => {
    const { getByTestId } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      getByTestId('show-feedback').click();
      getByTestId('hide-feedback').click();
    });

    expect(getByTestId('feedback-type').textContent).toBe('');
    expect(getByTestId('feedback-message').textContent).toBe('');
  });

  it('should set loading state', () => {
    const { getByTestId } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      getByTestId('set-loading').click();
    });

    expect(getByTestId('loading').textContent).toBe('true');
  });

  it('should toggle dark mode', () => {
    const { getByTestId } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      getByTestId('toggle-dark-mode').click();
    });

    expect(getByTestId('dark-mode').textContent).toBe('true');

    act(() => {
      getByTestId('toggle-dark-mode').click();
    });

    expect(getByTestId('dark-mode').textContent).toBe('false');
  });

  it('should throw error when useApp is used outside AppProvider', () => {
    const consoleError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useApp must be used within an AppProvider');

    console.error = consoleError;
  });
}); 