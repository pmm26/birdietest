import React from "react";
import styled from 'styled-components'
import InfoText from "./InfoText";
import moment from 'moment';
import {humanizeEventType, capitalize} from '../utils/stringHelper'

const EventContainer = styled.div`
  border-radius: 15px;
  min-height: 40px;
  display: flex;
  flex-flow: row;
  border: 2px solid black;
  margin: 7px;
  padding-left: 10px;
  padding-right: 10px;
`

const EventTypeBox = styled.span`
  display: flex;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  min-height: 55px;
`

const InfoTitleText = styled.p`
  font-weight: bold;
  color: #00254d;
  margin: 0;
`
const InfoDateText = styled.p`
  color: #00254d;
  margin: 0;
`
const InfoBox = styled.span`
  margin-left: 15;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  width: 70%;
`

const EventsPage = (props) => {
  return (
    <EventContainer>
      <EventTypeBox>
        <InfoTitleText>{capitalize(humanizeEventType(props.event_type))}</InfoTitleText>
        <InfoDateText>{moment(props.timestamp).format('Do MMMM YYYY, h:mm:ss a')}</InfoDateText>
      </EventTypeBox>
      <InfoBox>

        <InfoText title="Observed" value={props.observed}/>

        <InfoText title="Fluid" value={props.fluid} />
        <InfoText title="Consumed Volume Ml" value={props.consumed_volume_ml} />

        <InfoText title="Mood" value={props.mood} />

        <InfoText title="Medication Type" value={props.medication_type} />
        <InfoText title="Expected Dose Timestamp" value={props.expected_dose_timestamp} date={true}/>

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
        <InfoText title="Task Description" value={props.task_definition_description} />
        <InfoText title="Task Note" value={props.task_schedule_note} />

        <InfoText title="Medication Failure Reason" value={props.medication_failure_reason} />
        <InfoText title="Note" value={props.note} />
      </InfoBox>
    </ EventContainer>
  )
}

export default EventsPage;
