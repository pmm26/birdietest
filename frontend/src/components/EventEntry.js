import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../store/actions/events'
import styled from 'styled-components'

const EventContainer = styled.div`
  display: flex;
  flex-flow: row;
`

const EventTypeBox = styled.span`
  display: flex;
  flex-flow: column;
  height: 100%;
`

const InfoBox = styled.span`
  display: flex;
  flex-flow: column;
  height: 100%;
`

const EventsPage = (props) => {
  const test = () => {

  }

  return (
    <EventContainer>
      <EventTypeBox>

      </EventTypeBox>
      <InfoBox>
        <div>
          Id:
          {props.id}
        </div>
        <div>
          Type:
          {props.event_type}
        </div>
      </InfoBox>

    </ EventContainer>
  )
}

export default EventsPage;
