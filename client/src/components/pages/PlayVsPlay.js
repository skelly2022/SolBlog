import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Chess from "chess.js";
import io from "socket.io-client";
import { Chessboard } from "react-chessboard";
import qs from "qs";

const socket = io.connect("https://solchess-app-server.herokuapp.com/");

export default function PlayVsRandom(props) {
  const room = props.room;
  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());
  const [arrows, setArrows] = useState([]);
  const [boardOrientation, setBoardOrientation] = useState("white");
  const [currentTimeout, setCurrentTimeout] = useState(undefined);
  const [sourceSquare, setSourceSquare] = useState("");
  const [targetSquare, setTargetSquare] = useState("");
  const [newSourceSquare, setNewSourceSquare] = useState("");
  const [newTargetSquare, setNewTargetSquare] = useState("");
  // const [room, setRoom] = useState(room);

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();

    // exit if the game is over
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
  }

  function onDrop(sourceSquare, targetSquare) {
    console.log(sourceSquare);
    console.log(targetSquare);
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    setGame(gameCopy);

    // illegal move
    if (move === null) return false;
    // store timeout so it can be cleared on undo/reset so computer doesn't execute move
    // const newTimeout = setTimeout(makeRandomMove, 200);
    // setCurrentTimeout(newTimeout);
    else {
      console.log(targetSquare);
      sendMove(sourceSquare, targetSquare);
      return true;
    }
  }

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  joinRoom();

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setNewSourceSquare(data.sourceSquare);
      setNewTargetSquare(data.targetSquare);
      onDrop(data.sourceSquare,data.targetSquare)
      return;
    });
    // eslint-disable-next-line
  }, [socket]);

  const sendMove = (sourceSquare, targetSquare) => {
    socket.emit("send_message", { sourceSquare, targetSquare, room });
  };

  // if (newTargetSquare !== ""){
  //   onDrop(newSourceSquare,newTargetSquare);
  // }

  return (
    <div className="createGame">
      <Chessboard
        id="PlayVsRandom"
        animationDuration={200}
        boardOrientation={boardOrientation}
        customArrows={arrows}
        position={game.fen()}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
        }}
        ref={chessboardRef}
      />
      <button
        className="rc-button"
        onClick={() => {
          safeGameMutate((game) => {
            game.reset();
          });
          // stop any current timeouts
          clearTimeout(currentTimeout);
        }}
      >
        reset
      </button>
      <button
        className="rc-button"
        onClick={() => {
          setBoardOrientation((currentOrientation) =>
            currentOrientation === "white" ? "black" : "white"
          );
        }}
      >
        flip board
      </button>
      <button
        className="rc-button"
        // onClick={handleInput}
      >
        undo
      </button>
      <button
        className="rc-button"
        onClick={() => {
          setArrows([
            ["a3", "a5"],
            ["g1", "f3"],
          ]);
        }}
      >
        Set Custom Arrows
      </button>
    </div>
  );
}
