import React, { useState, Fragment, useRef } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import ClickOutside from "./ClickOutside";
import { Manager, Reference, Popper } from "react-popper";
import classes from './DatePicker.module.css'


const DateRangePicker = (props) => {
  let refer = useRef(null);
  const [open, setOpen] = useState(false);

  const toggleDatePicker = () => {
    if (!props.disabled)
      setOpen(!open);
  };

  const onChange = newDate => {
    toggleDatePicker()
    if (props.onChange)
      props.onChange(newDate)
  };

  const formatDate = newDate => {
    if (newDate) return moment(newDate).format("DD/MM/YYYY");
    else return "";
  };

  const formatDates = () => {
    if (props.start_date && props.end_date) return `${formatDate(props.start_date)} - ${formatDate(props.end_date)}`;
    else return "";
  };

  const displayText = () => {
    if (props.dateFiltering) {
      return formatDates()
    } else {
      return ""
    }
  }

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
                value={displayText()}
                onClick={toggleDatePicker}
                onChange={() => {}} //shut up pls
                placeholder={"Select a date range"}
                  />
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
                    value={[props.start_date, props.end_date]}
                    view="month"
                    minDetail="month"
                  />
                </div>
              </ClickOutside>
            );
          }}
        </Popper>
      </Manager>
    </Fragment>
  );
};

const app = props => (<DateRangePicker {...props}/>);

export default app;

DateRangePicker.defaultProps = {
  start_date: new Date(),
  end_date: new Date(),
  onChange: () => {console.log('Provide on change')}
};