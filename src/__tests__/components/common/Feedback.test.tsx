import { render, screen, fireEvent } from '@testing-library/react';
import Feedback from '../../../components/common/Feedback';

const renderFeedback = (props = {}) => {
  const defaultProps = {
    type: 'success' as const,
    message: 'Test message',
    ...props,
  };

  return render(<Feedback {...defaultProps} />);
};

describe('Feedback Component', () => {
  it('renders success feedback with correct styles', () => {
    renderFeedback({ type: 'success' });
    const feedback = screen.getByTestId('feedback');
    expect(feedback).toHaveClass('bg-green-50');
    expect(feedback).toHaveClass('border-green-200');
    expect(feedback).toHaveClass('text-green-800');
  });

  it('renders error feedback with correct styles', () => {
    renderFeedback({ type: 'error' });
    const feedback = screen.getByTestId('feedback');
    expect(feedback).toHaveClass('bg-red-50');
    expect(feedback).toHaveClass('border-red-200');
    expect(feedback).toHaveClass('text-red-800');
  });

  it('renders info feedback with correct styles', () => {
    renderFeedback({ type: 'info' });
    const feedback = screen.getByTestId('feedback');
    expect(feedback).toHaveClass('bg-blue-50');
    expect(feedback).toHaveClass('border-blue-200');
    expect(feedback).toHaveClass('text-blue-800');
  });

  it('renders message correctly', () => {
    const message = 'Custom message';
    renderFeedback({ message });
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('renders close button when onClose is provided', () => {
    renderFeedback({ onClose: () => {} });
    expect(screen.getByLabelText('Fechar mensagem')).toBeInTheDocument();
  });

  it('does not render close button when onClose is not provided', () => {
    renderFeedback();
    expect(screen.queryByLabelText('Fechar mensagem')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    renderFeedback({ onClose });
    
    fireEvent.click(screen.getByLabelText('Fechar mensagem'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies correct positioning styles', () => {
    renderFeedback();
    const feedback = screen.getByTestId('feedback');
    expect(feedback).toHaveClass('fixed');
    expect(feedback).toHaveClass('top-4');
    expect(feedback).toHaveClass('right-4');
  });

  it('applies correct transition styles', () => {
    renderFeedback();
    const feedback = screen.getByTestId('feedback');
    expect(feedback).toHaveClass('transition-all');
    expect(feedback).toHaveClass('duration-200');
  });

  it('applies correct shadow and border styles', () => {
    renderFeedback();
    const feedback = screen.getByTestId('feedback');
    expect(feedback).toHaveClass('shadow-lg');
    expect(feedback).toHaveClass('border');
    expect(feedback).toHaveClass('rounded-lg');
  });

  it('applies correct z-index', () => {
    renderFeedback();
    const feedback = screen.getByTestId('feedback');
    expect(feedback).toHaveClass('z-50');
  });
}); 