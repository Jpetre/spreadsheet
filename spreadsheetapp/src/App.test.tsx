import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders SpreadSheet title', () => {
  const { getByText } = render(<App />);
  const SpreadSheet = getByText('SpreadSheet');
  expect(SpreadSheet).toBeInTheDocument();
});
