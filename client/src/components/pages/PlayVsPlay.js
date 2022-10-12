import { useRef, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Chess, { BLACK } from "chess.js";
import { Chessboard } from "react-chessboard";
import "../css/PlayGame.css";
import { QUERY_ROOM } from "../../utils/queries";

// const socket = io.connect("");
// const socket = io.connect("http://localhost:5001");

export default function PlayVsRandom(props) {

  const [score, setscore] = useState(0);
  const room = props.room;
  const roomString = { roomNumber: props.room.toString() };
  const socket = props.socket;
  const gameSide = props.gameColor;
  const walletAddress = props.walletAddress;
  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());
  const [arrows, setArrows] = useState([]);
  const [currentTimeout, setCurrentTimeout] = useState(undefined);
  const [turn, setTurn] = useState(false);
  const [wallet, setWallet] = useState("");
  const [wallet2, setWallet2] = useState("Loading...");

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
    if (turn === true) {
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
        setTurn(false);
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

    setTurn(true);

    return true;
  }

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", {room, walletAddress});
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
      console.log(data);
      setWallet2(data);
      setscore(1)
      return;
    });
    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    if (gameSide === "white") {
      setTurn(true);
    } else {
      setTurn(false);
    }
  }, [gameSide]);

  useEffect(() => {
    joinRoom();
  });

  const sendMove = (sourceSquare, targetSquare) => {
    socket.emit("send_message", { sourceSquare, targetSquare, room });
  };

  if (score === 0){
  return (
    <div className="loading-wrapper">
      <h1 className="loader-h1">Waiting For Second Player.....</h1>
      <h2 className="loader-h1">Room:{room}</h2>
    <div className="spinner-border" >
    </div>
  </div>
  )
}
else {
  return (<div className="gameContainer container">
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
  {/* <button
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
  </button> */}
  <div className="walletContainer">
    <h4>{props.walletAddress}</h4>
  </div>
</div>
);
}
};

