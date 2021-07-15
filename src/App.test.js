import { render, screen } from '@testing-library/react';
import App from './App';

test('renders table header with field name', () => {
  render(<App />);
  const linkElement = screen.getByText(/name/i);
  expect(linkElement).toBeInTheDocument();
});
