import React, { useState, useEffect } from "react";

import "./Clock.css";

const Clock = () => {
  const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const [secondsRatio, setSecondsRatio] = useState(0);
  const [minutesRatio, setMinutesRatio] = useState(0);
  const [hoursRatio, setHoursRatio] = useState(0);

  const updateTime = () => {
    const date = new Date();
    const secondsRatio = date.getSeconds() / 60;
    const minutesRatio = (secondsRatio + date.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + date.getHours()) / 12;

    setSecondsRatio(secondsRatio);
    setMinutesRatio(minutesRatio);
    setHoursRatio(hoursRatio);
  };

  const getRotation = (ratio) => {
    return { transform: `translateX(-50%) rotate(calc(${ratio * 360}deg))` };
  };

  useEffect(() => {
    updateTime();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateTime();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="clock">
      <div className="hand hour" style={getRotation(hoursRatio)}></div>
      <div className="hand minute" style={getRotation(minutesRatio)}></div>
      <div className="hand second" style={getRotation(secondsRatio)}></div>
      {hours.map((hour, index) => (
        <div key={index} className="number" style={{ transform: `rotate(${index * 30}deg)` }}>
          {hour}
        </div>
      ))}
    </div>
  );
};

export default Clock;
