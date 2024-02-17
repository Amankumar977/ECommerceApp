import React, { useEffect } from "react";
import Event from "../components/Event/Event.jsx";
const EventPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Event />
    </div>
  );
};

export default EventPage;
