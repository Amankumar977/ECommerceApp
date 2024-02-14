import React, { useEffect, useState } from "react";

const CountDown = ({ startDate, endDate }) => {
  const [timeleft, setTimeLeft] = useState(calculateTimeleft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeleft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  function calculateTimeleft() {
    const difference = new Date(endDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timerComponent = Object.keys(timeleft).map((interval) => {
    if (!timeleft[interval]) {
      return null;
    }
    return (
      <span key={interval} className="text-[25px] text-[#283276]">
        {timeleft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponent.length ? (
        timerComponent
      ) : (
        <span className="text-red text-[25px]">Times Up!</span>
      )}
    </div>
  );
};

export default CountDown;
