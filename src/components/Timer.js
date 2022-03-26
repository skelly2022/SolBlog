import React, { useEffect } from "react";

function Timer({ time }) {
  const { hours = 0, minutes = 0, seconds = 60 } = time;
  const [[hrs, mins, secs], setTime] = React.useState([
    hours,
    minutes,
    seconds,
  ]);

  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) reset();
    else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  const reset = () =>
    setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div style={{ textAlign: "center" }}>
      <h2>{`${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`}</h2>
    </div>
  );
}

export default Timer;
