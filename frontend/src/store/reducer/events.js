import {FETCH_EVENTS, FETCH_PAGE, SET_DATE, SET_ORDER, TOGGLE_SEARCH_BY_DATE} from '../actions/events'

const initialState = {
  firstLoad: false,
  events: [],
  currentPage: null,
  maxPages: null,
  filters: {
    select: null,
    searchByDate: false,
    dates: [new Date(), new Date()]
  }
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
        return {...state, filters: {...state.filters, select: action.select}};
    case TOGGLE_SEARCH_BY_DATE:
        return {...state, filters: {...state.filters, searchByDate: !state.filters.searchByDate}};
    default:
      return state;
  }
};

export default reducer
