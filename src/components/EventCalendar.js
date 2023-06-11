import React from "react";
import { Calendar } from "antd";
import { formatDate } from "../utils/date";

const EventCalendar = (props) => {
  const dateCellRender = (value) => {
    const formatedDate = formatDate(value.toDate());
    const currentDayEvents = props.events.filter(
      (ev) => ev.date === formatedDate
    );
    return (
      <div>
        {currentDayEvents.map((ev, i) => (
          <div key={i}>{ev.description}</div>
        ))}
      </div>
    );
  };

  return <Calendar cellRender={dateCellRender} />;
};

export default EventCalendar;
