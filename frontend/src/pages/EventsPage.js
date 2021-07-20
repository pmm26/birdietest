import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../store/actions/events'

const EventsPage = (props) => {
  const state = useSelector((state) => state);

  const dispatch = useDispatch()

  const test = () => {
    dispatch(fetchEvents())
  }

  const test2 = () => {
    console.log(state)
  }

  return (
    <>
      <button onClick={test}>
        Test  Butono
      </button>

      <button onClick={test2}>
        Print State
      </button>
    </>
  );

}

export default EventsPage;
