import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFirstPage, fetchPage, setDate, setOrder, toggleSearchByDate } from "../store/actions/events";
import EventEntry from "../components/EventEntry";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from 'react-select'
import DateRangePicker from '../components/DateRangePicker';

const EventsPage = (props) => {
  const eventsState = useSelector((state) => state.events);

  const dispatch = useDispatch();

  const loadNextPage = () => {
    dispatch(fetchPage());
  };

  const test2 = () => {
    console.log(eventsState)
  };

  useEffect(() => {
    dispatch(fetchFirstPage());
  }, []);

  const options = [
    { value: 'DESC', label: 'Descending' },
    { value: 'ASC', label: 'Ascending' },
  ]

  const changeOrder = (order) => {
    dispatch(setOrder(order));
  }

  const togSearchByDate = () => {
    dispatch(toggleSearchByDate());
  }

  const changeDates = (data) => {
    dispatch(setDate(data));
  }
  return (
    <>
      Order
      <Select
        // value={selectedOption}
        onChange={changeOrder}
        options={options} />

      <input
        name="isGoing" type="checkbox"
        checked={eventsState.filters.searchByDate}
        onChange={togSearchByDate} />

      Dates
      <DateRangePicker
        start_date={{ value: eventsState.filters.dates[0] }}
        end_date={{ value: eventsState.filters.dates[1] }}
        onChange={changeDates}
      />

      <button>Filter</button>
      <button>Clear filters</button>

      {/*  */}
      <button onClick={test2}>Print State</button>
      <button onClick={loadNextPage}>Load Next Page</button>
      <InfiniteScroll
        dataLength={eventsState.events.length} //This is important field to render the next data
        next={loadNextPage}
        hasMore={!(eventsState.events.currentPage < eventsState.events.maxPages)}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have reached the end. Woop! Woop!</b>
          </p>
        }
      >
        {eventsState.events.map(element => <EventEntry {...element} key={element.id} />)}
      </InfiniteScroll>
    </>
  );
};

export default EventsPage;
