import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../utils/test-utils';
import ActionButton from './ActionButton';

const renderActionButton = (props = {}) => {
  return render(<ActionButton type="edit" onClick={() => {}} {...props} />);
};

describe('ActionButton Component', () => {
  it('renders with default props', () => {
    renderActionButton();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('applies correct color for edit button', () => {
    renderActionButton({ type: 'edit' });
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      color: 'rgb(59, 130, 246)',
    });
  });

  it('applies correct color for save button', () => {
    renderActionButton({ type: 'save' });
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      color: 'rgb(46, 125, 50)',
    });
  });

  it('applies correct color for delete button', () => {
    renderActionButton({ type: 'delete' });
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      color: 'rgb(211, 47, 47)',
    });
  });

  it('applies correct color for view button', () => {
    renderActionButton({ type: 'view' });
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      color: 'rgb(2, 136, 209)',
    });
  });

  it('applies hover styles', () => {
    renderActionButton();
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    });
  });
}); 