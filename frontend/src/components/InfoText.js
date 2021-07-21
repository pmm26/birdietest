import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../store/actions/events";
import styled from "styled-components";

const InfoTextBox = styled.span`
  margin-left: 10px;
`;

const InfoText = (props) => {
  if (props.value)
    return (
      <InfoTextBox >
        {props.title}: {typeof props.value == 'boolean' ?  (
          props.value ? "Yes" : "No"
          ) : props.value}
      </InfoTextBox>
    );
  else return <></>;
};

export default InfoText;
