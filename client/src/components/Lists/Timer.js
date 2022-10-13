import React, { useEffect,useState} from "react";
import { useGameUpdateState } from "../../utils/GameContext";

function Timer(props) {
  const { updateShow } = useGameUpdateState();
 
  const { hours = 0, minutes = 0, seconds = 60 } = props.time
  const [[hrs, mins, secs], setTime] = React.useState([
    hours,
    minutes,
    seconds,
  ]);

  const tick = () => {
    if (props.pause === false){
    if (hrs === 0 && mins === 0 && secs === 0);
    else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }}
  };

  const reset = () =>
    setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });


  useEffect(() => {
    if (hrs === 0 && mins === 0 && secs === 0) {
      updateShow();
    }
  }, [hrs, mins, secs]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Timer:</h1>
      <h3 style={{ padding: "5px" }}>{`${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}</h3>
    </div>
  );
}

export default Timer;
