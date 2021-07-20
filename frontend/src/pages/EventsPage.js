import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../store/actions/events'

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
      {events.map(element => (
        <>
          <div>
            Id:
            {element.id}
          </div>
          <div>
            Type:
            {element.event_type}
          </div>
        </>
      ))}
      <button onClick={test2}>
        Print State
      </button>

    </>
  );

}

export default EventsPage;
