import { render, screen } from '@testing-library/react';
import EventsPage from './EventsPage'
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);

describe('EventsPage component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({events: {
      firstLoad: false,
      events: [],
      currentPage: null,
      maxPages: null,
      filters: {
        eventType: null,
        order: null,
        dateFiltering: false,
        dates: [new Date(), new Date()]
      },
      error: null
    }});
  });
  
  test('renders posts if request succeeds', async () => {
    render(<EventsPage />)

    const eventType = screen.getByText('Fluid intake observation');

  });
});