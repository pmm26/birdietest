import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import EventEntry from "../components/EventEntry";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import DateRangePicker from "../components/DateRangePicker";
import classes from "./EventsPage.module.css";
import useEvent from "../hooks/useEvent";
import Button from "../components/Button";

const EventsPage = (props) => {
  const eventsState = useSelector((state) => state.events);

  const dispatch = useDispatch();

  const [
    eventTypeOptions,
    orderOptions,
    changeEventType,
    changeOrder,
    changeDates,
    loadNextPage,
    initFetch
  ] = useEvent(eventsState, dispatch)

  useEffect(() => {
    if (!eventsState.firstLoad) {
      initFetch()
    }
  }, []);

  const hasReachedLastPage = eventsState.currentPage === eventsState.maxPages
  const hasNoResults = eventsState.currentPage > eventsState.maxPages
  const hasMorePages = !(hasReachedLastPage || hasNoResults)

  return (
    <>
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
        <Button onClick={initFetch} className={classes.Buttons}>Clear filters</Button>
      </div>



      <div className={classes.EventsContainer}>
        <h2 className={classes.Title}>Events</h2>
        <InfiniteScroll
          dataLength={eventsState.events.length} //This is important field to render the next data
          next={loadNextPage}
          hasMore={hasMorePages}
          loader={<h4>Loading...</h4>}
          endMessage={
            <dic style={{ textAlign: "center" }}>
              <p>No Results found!</p>
              <p>Looks like you have reached the end. Woop! Woop!</p>
            </dic>
          }
        >
          {eventsState.events.map((element) => (
            <EventEntry {...element} key={element.id} />
          ))}
        </InfiniteScroll>
        {hasMorePages && (
          <Button onClick={loadNextPage}>Load More</Button>
        )}
      </div>
    </>
  );
};

export default EventsPage;
