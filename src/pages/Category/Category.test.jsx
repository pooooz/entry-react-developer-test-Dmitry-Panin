import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Category } from './Category';

describe('Category test', () => {
  it('Render test', () => {
    render(<Category category="all" />);
    expect(screen.getByText(/all/)).toBeInTheDocument();
  });
});
