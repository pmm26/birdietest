import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initEventFetch,
  fetchPage,
  INIT,
  setDate,
  setOrder,
} from "../store/actions/events";
import EventEntry from "../components/EventEntry";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import DateRangePicker from "../components/DateRangePicker";
import classes from "./Events.module.css";
import useEvent from "../hooks/useEvent";
const EventsPage = (props) => {
  const eventsState = useSelector((state) => state.events);

  const dispatch = useDispatch();

  const [
    eventTypeOptions,
    orderOptions,
    changeEventType,
    changeOrder,
    changeDates
  ] = useEvent(eventsState, dispatch)

  const loadNextPage = () => {
    dispatch(fetchPage());
  };
  const initFetch = () => {
    console.log(eventsState.filters)
    dispatch(initEventFetch());
    console.log(eventsState.filters)
  }

  useEffect(() => {
    if (!eventsState.firstLoad) {
      initFetch()
    }
  }, []);

  const test2 = () => {
    console.log(eventsState)
  }


  const hasReachedLastPage = eventsState.currentPage == eventsState.maxPages
  const hasNoResults = eventsState.currentPage > eventsState.maxPages

  return (
    <>
      {eventsState.error && (
        <h1>{eventsState.error}</h1>
      ) || (
          <>
            <button onClick={test2}>Print State</button>
            <div className={classes.Filers}>
              <span className={classes.EventType}>
                <p className={classes.OrderText}>Event Type:</p>
                <Select
                  value={eventsState.filters.eventType}
                  defaultValue={eventTypeOptions[0]}
                  onChange={changeEventType}
                  options={eventTypeOptions}
                />
              </span>

              <span className={classes.Order}>
                <p className={classes.OrderText}>Order:</p>
                <Select
                  defaultValue={orderOptions[0]}
                  value={eventsState.filters.order}
                  onChange={changeOrder}
                  options={orderOptions}
                />
              </span>


              <span className={classes.DatePicker}>
                <p className={classes.OrderText}>Date Range:</p>
                <DateRangePicker
                  start_date={eventsState.filters.dates[0]}
                  end_date={eventsState.filters.dates[1]}
                  filtering={eventsState.filters.dateFiltering}
                  onChange={changeDates}
                />
              </span>
              <button onClick={initFetch} className={classes.Buttons}>Clear filters</button>
            </div>

  

            <div className={classes.EventsContainer}>
              <h2 className={classes.Title}>Events</h2>
              <InfiniteScroll
                dataLength={eventsState.events.length} //This is important field to render the next data
                next={loadNextPage}
                hasMore={!(hasReachedLastPage || hasNoResults)}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <div>No Results found!</div>
                    <div>Looks like you have reached the end. Woop! Woop!</div>
                  </p>
                }
              >
                {eventsState.events.map((element) => (
                  <EventEntry {...element} key={element.id} />
                ))}
              </InfiniteScroll>
              {!(hasReachedLastPage || hasNoResults) && (
                <button onClick={loadNextPage}>Load More</button>
              )}
            </div>
          </>
        )}
    </>
  );
};

export default EventsPage;
