import React from 'react';
// import logo from './logo.svg';
import Layout from './components/Layout';
import styled from 'styled-components'

import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux';

// Reducers
import eventsReducer from './store/reducer/events';
import EventsPage from './pages/EventsPage';

import 'react-calendar/dist/Calendar.css';

const AppContainer = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`

const Content = styled.div`
  border-radius: 25px;
  padding: 15px;
  align-self: center;
  background-color: #f7c364;
  width: 1000px;
  margin: auto;
  margin-top: 60px;
  flex-grow : 1;
`

const rootReducer = combineReducers({
  // Ready to add more reducer if necessary
  events: eventsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <Layout />
        <Content>
          <EventsPage />
        </Content>
      </AppContainer>
    </Provider>
  );
}

export default App;
