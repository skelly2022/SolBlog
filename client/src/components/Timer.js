import React, { useEffect } from "react";
import { useGameUpdateState } from "../utils/GameContext";

function Timer({ time }) {
  const { updateGameOver } = useGameUpdateState();
  const { updateShow } = useGameUpdateState();
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

  useEffect(() => {
    if (hrs === 0 && mins === 0 && secs === 0) {
      updateGameOver();
      updateShow();
    }
  }, [hrs, mins, secs, updateGameOver, updateShow]);

  return (
    <div style={{ textAlign: "center" }}>
      <h3 style={{ padding: "5px" }}>{`${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}</h3>
    </div>
  );
}

export default Timer;
