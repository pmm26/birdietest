import events from "./events";

describe("events Reducer", () => {
  const initialState = {
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
  }

  it("returns the initial state correctly", () => {
    const reducer = events(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it("handles INIT as expected", () => {
    const reducer = events({
      ...initialState,
      events: [1, 2],
      maxPages: 2,
      firstLoad: true,
      currentPage: 1,
      filters: {
        eventType: 2,
        order: 1,
        dateFiltering: true,
        dates: [new Date(), new Date()]
      }
    }, { type: "INIT", events: [], maxPages: 2, });

    expect(reducer).toEqual({
      ...initialState,
      events: [],
      maxPages: 2,
      firstLoad: true,
      currentPage: 1
    });
  });

  it("handles FETCH_PAGE as expected", () => {
    const reducer = events({
      ...initialState,
      events: [1,2],
      maxPages: 1,
      currentPage: 2
    }, { type: "FETCH_PAGE", events: [3, 4], maxPages: 3, currentPage: 2});

    expect(reducer).toEqual({
      ...initialState,
      events: [1, 2, 3, 4],
      maxPages: 3,
      currentPage: 2
    });
  });


  it("handles FETCH_EVENTS as expected", () => {
    const reducer = events({
      ...initialState,
      events: [1,2],
      maxPages: 7,
      currentPage: 5
    }, { type: "FETCH_EVENTS", events: [3, 4], maxPages: 3});

    expect(reducer).toEqual({
      ...initialState,
      events: [3, 4],
      maxPages: 3,
      currentPage: 1,
      firstLoad: true
    });
  });


  it("handles SET_DATE as expected", () => {
    const date1 = new Date()
    const date2 = new Date()

    const reducer = events({
      ...initialState,
    }, { type: "SET_DATE", dates: [date1, date2], dateFiltering: true});

    expect(reducer).toEqual({
      ...initialState,
      filters: {
        ...initialState.filters,
        dateFiltering: true,
        dates: [date1, date2]
      }
    });
  });

  it("handles SET_ORDER as expected", () => {
    const reducer = events({
      ...initialState,
    }, { type: "SET_ORDER", select: 'order'});

    expect(reducer).toEqual({
      ...initialState,
      filters: {
        ...initialState.filters,
        order: 'order',
      }
    });
  });

  it("handles SET_EVENT_TYPE as expected", () => {
    const reducer = events({
      ...initialState,
    }, { type: "SET_EVENT_TYPE", eventType: "event_type"});

    expect(reducer).toEqual({
      ...initialState,
      filters: {
        ...initialState.filters,
        eventType: "event_type"
      }
    });
  });
});
