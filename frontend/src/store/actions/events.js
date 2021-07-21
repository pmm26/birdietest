
import axios from 'axios';
import env from "react-dotenv";

export const FETCH_EVENTS = 'FETCH_EVENTS'
export const FETCH_PAGE = 'FETCH_PAGE'

export const fetchPage = (params) => {
  return (dispatch, getState) => {
    const events = getState().events;

    fetchEvents({
      page: events.currentPage,
      ...params
    }).then(data => {
      dispatch({ type: FETCH_PAGE, events: data.data.data, maxPages: data.data.max_pages });
    })
  }
}

export const fetchFirstPage = () => {
  return dispatch => {
    fetchEvents().then(data => {
      dispatch({ type: FETCH_EVENTS, events: data.data.data, maxPages: data.data.max_pages });
    })
  }
}

const fetchEvents = (params = {}) => {
  return sendRequest('get', '/v1/events',
    params
  ).catch(err => {
    console.log(err)
  })
}

const sendRequest = (method, url, data) => {
  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";
  return axios({
    url: "http://localhost:8000" + url,
    method: method,
    [dataOrParams]: data,
    headers: {
      "x-api-key": 'birdiekey',
      "Content-Type": "application/json",
    },
  })
};