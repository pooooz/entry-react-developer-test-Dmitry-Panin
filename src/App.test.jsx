import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Add test', () => {
  it('Render test', () => {
    render(<App />);
    expect(screen.getByText(/Basic layout/)).toBeInTheDocument();
  });
});
