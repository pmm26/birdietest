import {FETCH_EVENTS, FETCH_PAGE, SET_DATE, SET_ORDER, SET_EVENT_TYPE} from '../actions/events'

const initialState = {
  firstLoad: false,
  events: [],
  currentPage: null,
  maxPages: null,
  filters: {
    eventType: null,
    order: null,
    dates: [new Date(), new Date()]
  },
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAGE:
        console.log(action)
        return {...state, events: [...state.events, ...action.events], maxPages: action.maxPages, currentPage: action.currentPage};
    case FETCH_EVENTS:
        return {...state, events: action.events, maxPages: action.maxPages, currentPage: 1, firstLoad: true};
    case SET_DATE:
        return {...state, filters: {...state.filters, dates: action.dates}};
    case SET_ORDER:
        return {...state, filters: {...state.filters, order: action.select}};
    case SET_EVENT_TYPE:
      return {...state, filters: {...state.filters, eventType: action.eventType}};
    default:
      return state;
  }
};

export default reducer
