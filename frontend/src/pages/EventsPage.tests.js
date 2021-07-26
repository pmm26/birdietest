import { render, screen } from '@testing-library/react';
import EventsPage from './EventsPage'

describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    render(<EventsPage />)

    const eventType = screen.getByText('Fluid intake observation');

  });
});