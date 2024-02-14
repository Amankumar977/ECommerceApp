import React from "react";
import Header from "../Layouts/Header";
import EventCard from "../EventCard/EventCard";
const Event = () => {
  return (
    <div>
      <Header activeHeading={4} />
      <EventCard />
    </div>
  );
};

export default Event;
