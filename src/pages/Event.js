import React, { useState, useEffect } from "react";
import EventCalendar from "../components/EventCalendar";
import { Button, Layout, Modal, Row } from "antd";
import EventForm from "../components/EventForm";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, fetchEvents, fetchGuests } from "../store/reducers/event";

const Event = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { guests, events } = useSelector((state) => state.eventReducer);
  const { user } = useSelector((state) => state.authReducer);
  useEffect(() => {
    dispatch(fetchGuests());
    dispatch(fetchEvents(user.username));
  }, []);
  const addNewEvent = (event) => {
    setModalOpen(false);
    dispatch(createEvent(event));
  };
  console.log(events);
  return (
    <Layout>
      <EventCalendar events={events} />
      <Row justify="center">
        <Button onClick={() => setModalOpen(true)}>Add event</Button>
      </Row>
      <Modal
        title="Add event"
        open={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  );
};

export default Event;
