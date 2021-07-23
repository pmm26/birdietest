import React, { useState, Fragment, useRef } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import ClickOutside from "./ClickOutside";
import { Manager, Reference, Popper } from "react-popper";
import classes from './DatePicker.module.css'
const DateRangePicker = (props) => {

  const inicializeDate = (dateString) => {
    if (dateString)
      return moment(dateString).toDate()
    else
      return null;
  }

  let refer = useRef(null);
  const [date, setDate] = useState([inicializeDate(props.start_date.value), inicializeDate(props.end_date.value)]);
  const [open, setOpen] = useState(false);

  const toggleDatePicker = () => {
    if (!props.disabled)
      setOpen(!open);
  };

  const onChange = newDate => {
    setDate(newDate);
    toggleDatePicker()
    // Sending the event back to the parent component.
    if (props.onChange)
      props.onChange(newDate)
  };

  const formatDate = newDate => {
    if (newDate) return moment(newDate).format("DD/MM/YYYY");
    else return "";
  };

  const formatDates = date => {
    if (date[0] && date[1]) return `${formatDate(date[0])} - ${formatDate(date[1])}`;
    else return "";
  };

  const assignRef = (element, ref) => {
    refer.current = element
    ref(element)
  }

  return (
    <Fragment>
      <Manager>
        <Reference>
          {({ ref }) => (
            <span className={classes.Input} ref={ref}>
              <input
                ref={(element) => assignRef(element, ref)}
                className={[classes.Input, "css-yk16xz-control"].join(' ')} 
                onClick={toggleDatePicker}
                value={formatDates(date)}
                onClick={toggleDatePicker}
                onChange={() => {}} //shut up pls
                placeholder={"Select dates"}
                  />
                {/* <div className="invalid-feedback">Title can't be blank</div> */}
            </span>
          )}
        </Reference>
        <Popper placement="bottom">
          {({ ref, style, placement, arrowProps }) => {
            return open && (
              <ClickOutside onClick={toggleDatePicker}>
                <div className="react-calendar-wrapper"
                  ref={ref}
                  style={style}
                  data-placement={placement}
                >
                  <Calendar
                    selectRange={true}
                    onChange={onChange}
                    value={date}
                    view="month"
                    minDetail="month"
                  />
                </div>
              </ClickOutside>
            ) || null;
          }}
        </Popper>
      </Manager>
    </Fragment>
  );
};

const app = props => (<DateRangePicker {...props}/>);

export default app;

DateRangePicker.defaultProps = {
  start_date: {
    value: new Date()
  },
  end_date: {
    value: new Date()
  },
  onChange: () => {console.log('Provide on change')}
};