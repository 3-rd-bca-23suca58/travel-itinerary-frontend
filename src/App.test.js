// Ensure the mock is applied before importing the App component
jest.mock('./api/api', () => ({
  getItineraries: jest.fn(() => Promise.resolve({ data: [] })),
  addItinerary: jest.fn(() => Promise.resolve()),
  updateItinerary: jest.fn(() => Promise.resolve()),
  deleteItinerary: jest.fn(() => Promise.resolve()),
}));

// Mock console.error to suppress error logs during testing
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Travel Itinerary header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Travel Itinerary/i);
  expect(headerElement).toBeInTheDocument();
});
