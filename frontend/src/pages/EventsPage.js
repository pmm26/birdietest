import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFirstPage, fetchPage } from "../store/actions/events";
import EventEntry from "../components/EventEntry";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from 'react-select'

const EventsPage = (props) => {
  const events = useSelector((state) => state.events.events);

  const dispatch = useDispatch();

  const loadNextPage = () => {
    dispatch(fetchPage());
  };

  const test2 = () => {
    console.log(events);
  };

  useEffect(() => {
    dispatch(fetchFirstPage());
  }, []);

  const options = [
    { value: 'ASC', label: 'ascending' },
    { value: 'DESC', label: 'descending' },
  ]

  const changeOrder = (data) => {
    console.log(data)
  }

  return (
    <>
      Order
      <Select 
      // value={selectedOption}
      onChange={changeOrder}
      options={options} />

      Dates
      
      <button>Filter</button>
      <button>Clear filters</button>

      <InfiniteScroll
        dataLength={events.length} //This is important field to render the next data
        next={loadNextPage}
        hasMore={!(events.currentPage < events.maxPages)}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have reached the end. Woop! Woop!</b>
          </p>
        }
       >
        {events.map(element => <EventEntry key={element.id} {...element} />)} 
      </InfiniteScroll>
      {/*  */}
      <button onClick={test2}>Print State</button>
      <button onClick={loadNextPage}>Load Next Page</button>
    </>
  );
};

export default EventsPage;
