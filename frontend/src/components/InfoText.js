import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../store/actions/events";
import styled from "styled-components";
import moment from 'moment';
import {capitalize} from '../utils/stringHelper'

const InfoTextBox = styled.div`
  flex: 30%;
  margin: 5px;
  margin-left: 10px;

`;

const Title = styled.p`
  margin: 0;
  font-weight: bold;
  color: #00254d;
`

const InfoText = (props) => {


  const printValue = () => {
    if (typeof props.value == 'boolean') {
      return props.value ? "Yes" : "No"
    } else if (props.date) {
      return moment(props.value).format('MMMM Do YYYY, h:mm:ss a')
    } else {
      return capitalize(props.value)
    }
  }

  if (props.value)
    return (
      <InfoTextBox >
        <Title>{props.title}:</Title> 
        {printValue()}
      </InfoTextBox>
    );
  else return <></>;
};

export default InfoText;
