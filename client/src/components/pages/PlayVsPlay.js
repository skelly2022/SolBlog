import { useRef, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Chess, { BLACK } from "chess.js";
import { Chessboard } from "react-chessboard";
import "../css/PlayGame.css";
import Timer from "../Lists/Timer";
import TimerMe from "../Lists/TimerMe";
import { QUERY_ROOM } from "../../utils/queries";
import { useGameState, useGameUpdateState } from "../../utils/GameContext";
import { Modal } from "react-bootstrap";

// const socket = io.connect("");
// const socket = io.connect("http://localhost:5001");

export default function PlayVsRandom(props) {
  const gameTime = props.gameTime;
  const room = props.room;
  const roomString = { roomNumber: props.room.toString() };
  const socket = props.socket;
  const gameSide = props.gameColor;
  const walletAddress = props.walletAddress;

  const { gameOver } = useGameState(false);
  const { updateGameOver } = useGameUpdateState();
  const { updateShow } = useGameUpdateState();
  const { show } = useGameState();

  const [pause, setPause] = useState(false);
  const [thisGameTime, setGameTime] = useState(3);
  const [mePause, setMePause] = useState(true);
  const [score, setscore] = useState(0);
  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());
  const [arrows, setArrows] = useState([]);
  const [win, setWin] = useState(null);
  const [lose, setLose] = useState(null);
  const [turn, setTurn] = useState(false);
  const [wallet, setWallet] = useState("");
  const [wallet2, setWallet2] = useState("Loading...");

  console.log(gameOver);
  console.log(show);
  const { loading, data } = useQuery(QUERY_ROOM, {
    fetchPolicy: "no-cache",
    variables: { ...roomString },
  });

  const playData = data?.room;

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  const renderLose = () => <h1>You Lose!</h1>;

  const renderWin = () => <h1>You Win!!</h1>;

  function onDrop(sourceSquare, targetSquare) {
    if (turn === true) {
      const gameCopy = { ...game };
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });

      if (move === null) return false;

      setGame(gameCopy);
      console.log(gameCopy.in_checkmate(gameCopy));

      if (gameCopy.in_checkmate(gameCopy) === true) {
        sendMove(sourceSquare, targetSquare);
        setWin(true);
        setPause(true);
        setMePause(true);
        return true;
      }

      // illegal move
      // store timeout so it can be cleared on undo/reset so computer doesn't execute move
      // const newTimeout = setTimeout(makeRandomMove, 200);
      // setCurrentTimeout(newTimeout);
      else {
        setTurn(false);
        setMePause(true);
        setPause(false);
        console.log(targetSquare);
        sendMove(sourceSquare, targetSquare);
        return true;
      }
    } else {
      return false;
    }
  }

  function onDrop2(sourceSquare, targetSquare) {
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    setGame(gameCopy);

    if (gameCopy.in_checkmate(gameCopy) === true) {
      setPause(true);
      setMePause(true);
      setLose(true);
      return true;
    }

    setTurn(true);
    setPause(true);
    setMePause(false);

    return true;
  }

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", { room, walletAddress });
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setTurn(true);

      onDrop2(data.sourceSquare, data.targetSquare);
      return;
    });
    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    socket.on("player_joined", (data) => {
      // console.log(data);
      setWallet2(data);
      setscore(1);
      return;
    });
    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    if (gameSide === "white") {
      setMePause(false);
      setPause(true);
      setTurn(true);
    } else {
      setPause(false);
      setTurn(false);
    }
  }, [gameSide]);

  useEffect(() => {
    joinRoom();
  });

  useEffect(() => {
    setGameTime(gameTime);
  }, [gameTime]);

  const sendMove = (sourceSquare, targetSquare) => {
    socket.emit("send_message", { sourceSquare, targetSquare, room });
  };

  if (score === 0) {
    return (
      <div className="loading-wrapper">
        <h1 className="loader-h1">Waiting For Second Player.....</h1>
        <h2 className="loader-h1">Room:{room}</h2>
        <div className="spinner-border"></div>
      </div>
    );
  }
  if ((score === 1) & (gameTime === 0)) {
    return (
      <div className="loading-wrapper">
        <h1 className="loader-h1">Waiting For Second Player.....</h1>
        <h2 className="loader-h1">Room:{room}</h2>
        <div className="spinner-border"></div>
      </div>
    );
  }
  if ((score === 1) & (gameSide === "white")) {
    console.log(gameTime);
    return (
      <div className="gameBody">
        <div className="gameContainer container">
          <div className="walletContainer">
            <h4>{wallet2}</h4>
          </div>
          <Chessboard
            id="PlayVsRandom"
            animationDuration={200}
            boardOrientation={gameSide}
            customArrows={arrows}
            position={game.fen()}
            onPieceDrop={onDrop}
            customBoardStyle={{
              borderRadius: "4px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
            }}
            ref={chessboardRef}
          />
          <div className="walletContainer">
            <h4>{props.walletAddress}</h4>
          </div>
        </div>
        <div className="timer">
          <Timer
            time={{ hours: 0, minutes: gameTime, seconds: 0 }}
            pause={pause}
          />
          {gameOver && renderLose()}
          {show && renderWin()}
          {win && renderWin()}
          {lose && renderLose()}
          <TimerMe
            time={{ hours: 0, minutes: gameTime, seconds: 0 }}
            pause={mePause}
          />
        </div>
      </div>
    );
  }
  if ((score === 1) & (gameSide === "black")) {
    console.log(gameTime);
    return (
      <div className="gameBody">
        <div className="gameContainer container">
          <div className="walletContainer">
            <h4>{wallet2}</h4>
          </div>
          <Chessboard
            id="PlayVsRandom"
            animationDuration={200}
            boardOrientation={gameSide}
            customArrows={arrows}
            position={game.fen()}
            onPieceDrop={onDrop}
            customBoardStyle={{
              borderRadius: "4px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
            }}
            ref={chessboardRef}
          />
          <div className="walletContainer">
            <h4>{props.walletAddress}</h4>
          </div>
        </div>
        <div className="timer">
          <Timer
            time={{ hours: 0, minutes: gameTime, seconds: 0 }}
            pause={pause}
          />
          {gameOver && renderLose()}
          {show && renderWin()}
          {win && renderWin()}
          {lose && renderLose()}
          <TimerMe
            time={{ hours: 0, minutes: gameTime, seconds: 0 }}
            pause={mePause}
          />
        </div>
      </div>
    );
  }
}
