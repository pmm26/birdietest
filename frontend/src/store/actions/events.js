import axios from "axios";

export const FETCH_EVENTS = "FETCH_EVENTS";
export const FETCH_PAGE = "FETCH_PAGE";
export const SET_DATE = "SET_DATE";
export const SET_ORDER = "SET_ORDER";
export const SET_EVENT_TYPE = "SET_EVENT_TYPE";

export const fetchPage = () => {
  return async (dispatch, getState) => {
    const eventsState = getState().events;
    const nextPage = eventsState.currentPage + 1;
    fetchEvents({
      ...getParams(eventsState),
      page: nextPage,
    }).then((data) => {
      dispatch({
        type: FETCH_PAGE,
        events: data.data.data,
        maxPages: data.data.max_pages,
        currentPage: nextPage,
      });
    });
  };
};

export const fetchFirstPage = () => {
  return async (dispatch, getState) => {
    const events = getState().events;
    if (!events.firstLoad) {
      fetchEvents().then((data) => {
        dispatch({
          type: FETCH_EVENTS,
          events: data.data.data,
          maxPages: data.data.max_pages,
        });
      });
    }
  };
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

const errorHandler = (err) => {
  if (err.code) return { type: "ERROR" };
};

const getParams = ({ filters }) => {
  let params = {};
  if (filters.order) params.order = filters.order.value;

  if (filters.eventType && filters.eventType.value !== "all_event_types")
    params["filter[event_type]"] = filters.eventType.value;

  return params;
};

const fetchNewFilter = (eventsState) => {
  return fetchEvents({
    ...getParams(eventsState),
    page: 1,
  });
};

// Reausable events Function
const fetchEvents = (params = {}) => {
  console.log(params);
  return sendRequest("GET", "/v1/events", params).catch((err) => {
    console.log(err);
  });
};

// Reusable API Function
const sendRequest = (method, url, data) => {
  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";
  return axios({
    url: "http://birdieapi.prck.me" + url,
    method: method,
    [dataOrParams]: data,
    headers: {
      "x-api-key": "birdiekey",
      "Content-Type": "application/json",
    },
  });
};
