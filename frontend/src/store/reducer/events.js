import {FETCH_EVENTS} from '../actions/events'

const initialState = {
  events: [],
  maxPages: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      console.log(action.type)
        return {...state, events: action.events, maxPages: action.maxPages};
    default:
      return state;
  }
};

export default reducer
