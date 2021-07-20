
import axios from 'axios';
import env from "react-dotenv";

export const FETCH_EVENTS = 'FETCH_EVENTS'

export const fetchEvents = () => {
  return async dispatch => {
    sendRequest('get', '/v1/events', {

    }).then(data => {
      console.log(data)
      dispatch({ type: FETCH_EVENTS, events: data.data, maxPages: data.max_pages});
    }).catch(err => {
      console.log(err)
    })
  }
}

const sendRequest = (method, url, data) => {
  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";
  return axios({
    url: env.BASE_URL + url,
    method: method,
    [dataOrParams]: data,
    headers: {
      "x-api-key": env.TOKEN,
      "Content-Type": "application/json",
    },
  })
};