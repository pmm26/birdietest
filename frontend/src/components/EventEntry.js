import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../store/actions/events'
import styled from 'styled-components'
import InfoText from "./InfoText";

const EventContainer = styled.div`
  display: flex;
  flex-flow: row;
  border: 1px solid black;
  margin: 7px;
`

const EventTypeBox = styled.span`
  width: 30%;
`

const InfoBox = styled.span`
  width: 70%;
`

const EventsPage = (props) => {
  const test = () => {

  }

  const humanizeEventType = (event_type) => {
    console.log(props)
    let string = event_type.split('_').join(' ')
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <EventContainer >
      <EventTypeBox>
        {humanizeEventType(props.event_type)}
      </EventTypeBox>
      <InfoBox>
        <InfoText title="Observed" value={props.observed}/>

        {/* fluid_intake */}
        <InfoText title="Fluid" value={props.fluid} />
        <InfoText title="Consumed Volume Ml" value={props.consumed_volume_ml} />

        <InfoText title="Mood" value={props.mood} />

        <InfoText title="Medication Type" value={props.medication_type} />
        <InfoText title="Expected Dose Timestamp" value={props.expected_dose_timestamp} />

        <InfoText title="Pad Condition" value={props.pad_condition} />
        <InfoText title="Meal" value={props.meal} />
        <InfoText title="Type" value={props.type} />
        <InfoText title="Dose Size" value={props.dose_size} />
        <InfoText title="Alert Severity" value={props.alert_severity} />
        <InfoText title="Severity" value={props.severity} />
        <InfoText title="Volume Ml" value={props.volume_ml} />
        <InfoText title="Visit Type" value={props.visit_type} />
        <InfoText title="Visit Count" value={props.visit_count} />
        
        {/* Tasks */}
        <InfoText title="Task Note" value={props.task_schedule_note} />
        <InfoText title="Task Description" value={props.task_definition_description} />

        <InfoText title="Medication Failure Reason" value={props.medication_failure_reason} />
        <InfoText title="Note" value={props.note} />


      </InfoBox>

    </ EventContainer>
  )
}

export default EventsPage;
