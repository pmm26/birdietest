import axios from "axios";

export const INIT = "INIT";
export const FETCH_EVENTS = "FETCH_EVENTS";
export const FETCH_PAGE = "FETCH_PAGE";
export const SET_DATE = "SET_DATE";
export const SET_ORDER = "SET_ORDER";
export const SET_EVENT_TYPE = "SET_EVENT_TYPE";
export const ERROR = "ERROR";

export const fetchPage = () => {
  return async (dispatch, getState) => {
    try {
      const eventsState = getState().events;
      const nextPage = eventsState.currentPage + 1;
      const data = await fetchEvents({
        ...getParams(eventsState),
        page: nextPage,
      })
      dispatch({
        type: FETCH_PAGE,
        events: data.data.data,
        maxPages: data.data.max_pages,
        currentPage: nextPage,
      });
    } catch (err) {
      dispatch(errorHandler(err));
    }
  };
};

// The first fetch that is called resets app to inicial state
export const initEventFetch = () => {
  return async (dispatch) => {
    try {
      const data = await fetchEvents()
      dispatch({
        type: INIT,
        events: data.data.data,
        maxPages: data.data.max_pages,
      });

    } catch (err) {
      dispatch(errorHandler(err));
    }
  };
};

const fetchNewFilter = (eventsState) => {
  return fetchEvents({
    ...getParams(eventsState),
    page: 1,
  });
};

export const setDate = (dates) => {
  return { type: SET_DATE, dates: dates };
};


export const setOrder = (select) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_ORDER, select: select });
      const pageResults = await fetchNewFilter(getState().events);
      dispatch({
        type: FETCH_EVENTS,
        events: pageResults.data.data,
        maxPages: pageResults.data.max_pages,
      });
    } catch (err) {
      dispatch(errorHandler(err));
    }
  };
};

export const setEventType = (select) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_EVENT_TYPE, eventType: select });
      const pageResults = await fetchNewFilter(getState().events);
      dispatch({
        type: FETCH_EVENTS,
        events: pageResults.data.data,
        maxPages: pageResults.data.max_pages,
      });
    } catch (err) {
      dispatch(errorHandler(err));
    }
  };
};

// Helper functions
const errorHandler = (err) => {
  console.log(err)
  let message = 'Error connecting to server'

  if (err.code === 400) {
    message = 'API error'
  } else if (err.code === 500) {
    message = "What did you do? You broke the server :'("
  }
  return { type: ERROR, message: message };
};

const getParams = ({ filters }) => {
  let params = {};
  if (filters.order) params.order = filters.order.value;

  if (filters.eventType && filters.eventType.value !== "all_event_types")
    params["filter[event_type]"] = filters.eventType.value;

  return params;
};


// Reausable events Function
const fetchEvents = (params = {}) => {
  return sendRequest("GET", "/v1/events", params)
};

// Reusable API Function
const sendRequest = (method, url, data) => {
  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";
  return axios({
    // url: "http://birdieapi.prck.me" + url,
    url: "http://localhost:8000" + url,
    method: method,
    [dataOrParams]: data,
    headers: {
      "x-api-key": "birdiekey",
      "Content-Type": "application/json",
    },
  });
};
