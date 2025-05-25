import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationDialog from './ConfirmationDialog';

const defaultProps = {
  isOpen: true,
  title: 'Confirm Action',
  message: 'Are you sure you want to proceed?',
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
};

const renderDialog = (props = {}) => {
  return render(<ConfirmationDialog {...defaultProps} {...props} />);
};

describe('ConfirmationDialog Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    renderDialog({ isOpen: false });
    expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();
  });

  it('renders dialog when isOpen is true', () => {
    renderDialog();
    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
  });

  it('renders default button text', () => {
    renderDialog();
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
  });

  it('renders custom button text', () => {
    renderDialog({
      confirmText: 'Delete',
      cancelText: 'Keep',
    });
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Keep')).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', () => {
    renderDialog();
    fireEvent.click(screen.getByText('Confirmar'));
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel button is clicked', () => {
    renderDialog();
    fireEvent.click(screen.getByText('Cancelar'));
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it('applies correct overlay styles', () => {
    renderDialog();
    const overlay = screen.getByText('Confirm Action').closest('div')?.parentElement;
    expect(overlay).toHaveClass('fixed');
    expect(overlay).toHaveClass('inset-0');
    expect(overlay).toHaveClass('bg-black/50');
    expect(overlay).toHaveClass('dark:bg-black/70');
    expect(overlay).toHaveClass('flex');
    expect(overlay).toHaveClass('items-center');
    expect(overlay).toHaveClass('justify-center');
    expect(overlay).toHaveClass('z-50');
    expect(overlay).toHaveClass('transition-colors');
  });

  it('applies correct dialog container styles', () => {
    renderDialog();
    const container = screen.getByText('Confirm Action').closest('div');
    expect(container).toHaveClass('bg-white');
    expect(container).toHaveClass('dark:bg-gray-800');
    expect(container).toHaveClass('rounded-lg');
    expect(container).toHaveClass('p-6');
    expect(container).toHaveClass('max-w-md');
    expect(container).toHaveClass('w-full');
    expect(container).toHaveClass('mx-4');
    expect(container).toHaveClass('shadow-xl');
    expect(container).toHaveClass('transition-colors');
  });

  it('applies correct title styles', () => {
    renderDialog();
    const title = screen.getByText('Confirm Action');
    expect(title).toHaveClass('text-xl');
    expect(title).toHaveClass('font-semibold');
    expect(title).toHaveClass('mb-4');
    expect(title).toHaveClass('text-gray-900');
    expect(title).toHaveClass('dark:text-gray-100');
  });

  it('applies correct message styles', () => {
    renderDialog();
    const message = screen.getByText('Are you sure you want to proceed?');
    expect(message).toHaveClass('text-gray-600');
    expect(message).toHaveClass('dark:text-gray-300');
    expect(message).toHaveClass('mb-6');
  });

  it('applies correct button container styles', () => {
    renderDialog();
    const buttonContainer = screen.getByText('Confirmar').closest('div');
    expect(buttonContainer).toHaveClass('flex');
    expect(buttonContainer).toHaveClass('justify-end');
    expect(buttonContainer).toHaveClass('space-x-4');
  });

  it('applies correct cancel button styles', () => {
    renderDialog();
    const cancelButton = screen.getByText('Cancelar');
    expect(cancelButton).toHaveClass('px-4');
    expect(cancelButton).toHaveClass('py-2');
    expect(cancelButton).toHaveClass('text-gray-600');
    expect(cancelButton).toHaveClass('dark:text-gray-300');
    expect(cancelButton).toHaveClass('hover:text-gray-800');
    expect(cancelButton).toHaveClass('dark:hover:text-white');
    expect(cancelButton).toHaveClass('focus:outline-none');
    expect(cancelButton).toHaveClass('transition-colors');
  });

  it('applies correct confirm button styles', () => {
    renderDialog();
    const confirmButton = screen.getByText('Confirmar');
    expect(confirmButton).toHaveClass('px-4');
    expect(confirmButton).toHaveClass('py-2');
    expect(confirmButton).toHaveClass('bg-primary-light');
    expect(confirmButton).toHaveClass('dark:bg-primary-dark');
    expect(confirmButton).toHaveClass('text-white');
    expect(confirmButton).toHaveClass('rounded');
    expect(confirmButton).toHaveClass('hover:opacity-90');
    expect(confirmButton).toHaveClass('focus:outline-none');
    expect(confirmButton).toHaveClass('transition-all');
  });
}); 