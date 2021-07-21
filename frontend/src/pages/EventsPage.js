import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../store/actions/events'
import EventEntry from '../components/EventEntry'
import styled from 'styled-components'


const EventsPage = (props) => {
  const events = useSelector((state) => state.events.events);

  const dispatch = useDispatch()

  const test = () => {
    
  }

  const test2 = () => {
    console.log(events)
  }

  useEffect(() => {  
    dispatch(fetchEvents())
  }, []);

  return (
    <>
      {events.map(element => <EventEntry {...element} />)}
      <button onClick={test2}>
        Print State
      </button>

    </>
  );

}

export default EventsPage;
