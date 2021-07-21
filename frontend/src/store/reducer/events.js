import {FETCH_EVENTS, FETCH_PAGE} from '../actions/events'

const initialState = {
  events: [],
  currentPage: null,
  maxPages: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAGE:
      console.log(action)
        return {...state, events: [...state.events, ...action.events], maxPages: action.maxPages, currentPage: 1};
    case FETCH_EVENTS:
      console.log(action.type)
        return {...state, events: action.events, maxPages: action.maxPages, currentPage: 1};
    default:
      return state;
  }
};

export default reducer
