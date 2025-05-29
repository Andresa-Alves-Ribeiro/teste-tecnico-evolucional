import React from 'react';
import { render, screen } from './test-utils';

describe('Test Utils', () => {
  it('renders components with theme provider', () => {
    const TestComponent = () => <div>Test Component</div>;
    render(<TestComponent />);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
}); 