import React from "react";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";
import EventsPage from "./EventsPage";

const Index = (props) => {
  const eventsState = useSelector((state) => state.events);
  if (eventsState.error) {
    return (
      <ErrorPage error={eventsState.error} />
    )
  } else {
    return (
      <EventsPage />
    )
  }
}

export default Index