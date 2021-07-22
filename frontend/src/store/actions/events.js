
import axios from 'axios';
import env from "react-dotenv";

export const FETCH_EVENTS = 'FETCH_EVENTS'
export const FETCH_PAGE = 'FETCH_PAGE'
export const SET_DATE = 'SET_DATE'
export const SET_ORDER = 'SET_ORDER'
export const TOGGLE_SEARCH_BY_DATE = 'TOGGLE_SEARCH_BY_DATE'

export const fetchPage = (params = {}) => {
  return (dispatch, getState) => {
    const events = getState().events;
    const nextPage = events.currentPage+1;
    console.log(nextPage)
    fetchEvents({
      ...params,
      page: nextPage
    }).then(data => {
      dispatch({ type: FETCH_PAGE, events: data.data.data, maxPages: data.data.max_pages, currentPage: nextPage });
    })
  }
}

export const fetchFirstPage = () => {
  return (dispatch, getState) => {
    const events = getState().events;
    if (!events.firstLoad) {
      fetchEvents().then(data => {
        dispatch({ type: FETCH_EVENTS, events: data.data.data, maxPages: data.data.max_pages });
      })
    }
  }
}

export const setDate = (dates) => {
  return { type: SET_DATE, dates: dates }
}

export const setOrder = (select) => {
  return { type: SET_ORDER, select: select }
}

export const toggleSearchByDate = (select) => {
  return { type: TOGGLE_SEARCH_BY_DATE }
}

const fetchEvents = (params = {}) => {
  console.log(params)
  return sendRequest('GET', '/v1/events',
    params
  ).catch(err => {
    console.log(err)
  })
}

const sendRequest = (method, url, data) => {
  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";
  console.log(dataOrParams)
  return axios({
    url: "http://birdieapi.prck.me/" + url,
    method: method,
    [dataOrParams]: data,
    headers: {
      "x-api-key": 'birdiekey',
      "Content-Type": "application/json",
    },
  })
};