import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../utils/test-utils';
import Pagination from './Pagination';

const defaultProps = {
  currentPage: 1,
  totalPages: 5,
  onPageChange: jest.fn(),
};

const renderPagination = (props = {}) => {
  return render(<Pagination {...defaultProps} {...props} />);
};

describe('Pagination Component', () => {
  it('renders with default props', () => {
    renderPagination();
    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Próxima')).toBeInTheDocument();
  });

  it('applies correct styles to current page button', () => {
    renderPagination({ currentPage: 2 });
    const currentPageButton = screen.getByText('2');
    expect(currentPageButton).toHaveStyle({
      color: 'rgba(31, 41, 55, 0.38)',
    });
  });

  it('applies correct styles to page buttons', () => {
    renderPagination();
    const pageButtons = screen.getAllByRole('button');
    pageButtons.forEach(button => {
      expect(button).toHaveStyle({
        minWidth: '32px',
        height: '32px',
        padding: '4px 8px',
      });
    });
  });
}); 