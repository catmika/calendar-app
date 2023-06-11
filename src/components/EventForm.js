import React from "react";
import { Form, Input, DatePicker, Row, Button, Select } from "antd";
import { rules } from "../utils/rules";
import { useState } from "react";
import { formatDate } from "../utils/date";
import { useSelector } from "react-redux";

const EventForm = (props) => {
  const { user } = useSelector((state) => state.authReducer);

  const [event, setEvent] = useState({
    author: "",
    date: "",
    description: "",
    guest: "",
  });

  const selectDate = (date) => {
    if (date) {
      const formattedDate = formatDate(date.toDate());
      setEvent((prevEvent) => ({ ...prevEvent, date: formattedDate }));
    }
  };

  const submitForm = (event) => {
    const formattedEvent = {
      ...event,
      date: formatDate(event.date.toDate()),
      author: user.username,
    };
    props.submit(formattedEvent);
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Event description"
        name="description"
        rules={[rules.required()]}
      >
        <Input
          value={event.description}
          onChange={(e) =>
            setEvent((prevEvent) => ({
              ...prevEvent,
              description: e.target.value,
            }))
          }
        />
      </Form.Item>
      <Form.Item
        label="Date"
        name="date"
        rules={[
          rules.required(),
          rules.isDateAfter("Can't create event in the past"),
        ]}
      >
        <DatePicker onChange={(date) => selectDate(date)} />
      </Form.Item>
      <Form.Item label="Choose guest" name="guest" rules={[rules.required()]}>
        <Select
          onChange={(guest) =>
            setEvent((prevEvent) => ({ ...prevEvent, guest }))
          }
        >
          {props.guests.map((guest) => (
            <Select.Option key={guest.username} value={guest.username}>
              {guest.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Row justify="end">
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button style={{ marginRight: 50 }} type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;
