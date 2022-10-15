import { useRef, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Chess, { BLACK } from "chess.js";
import { Chessboard } from "react-chessboard";
import "../css/PlayGame.css";
import Timer from "../Lists/Timer";
import TimerMe from "../Lists/TimerMe";
import { QUERY_ROOM } from "../../utils/queries";
import { useGameState, useGameUpdateState } from "../../utils/GameContext";
import chessmove from "../audio/chessmove.wav";
import { UPDATE_ELO } from "../../utils/mutations";

// const socket = io.connect("");
// const socket = io.connect("http://localhost:5001");

export default function PlayVsRandom(props) {
  const EloRating = require("elo-rating");
  const gameTime = props.gameTime;
  const elo = props.elo;
  const room = props.room;
  const score2 = props.score;
  const wallet2elo = props.OpponentElo;
  const roomString = { roomNumber: room.toString() };
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
  const [wallet2, setWallet2] = useState("");
  const [eloState, setEloState] = useState(false);
  const [wallet2Elo, setWallet2Elo] = useState("Loading...");
  const [wallet1Elo, setWallet1Elo] = useState(elo);
  const [wallet2NewElo, setWallet2NewElo] = useState("Loading...");
  const [wallet1NewElo, setWallet1NewElo] = useState("Loading...");

  const [updateWinnerElo, { error }] = useMutation(UPDATE_ELO);

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  const renderLose = () => <h1>You Lose!</h1>;

  const renderWin = () => <h1>You Win!!</h1>;

  const postScore = async (playerWin) => {
    const result = EloRating.calculate(+elo, +wallet2Elo, playerWin);
    const newScore = result.playerRating;
    const newOpponentScore = result.opponentRating;
    const updateS = {
      wallet: walletAddress,
      elo: newScore.toString(),
      wallet2: wallet2,
      wallet2Elo: newOpponentScore.toString(),
    };
    try {
      const { data } = await updateWinnerElo({
        variables: { ...updateS },
      });
    } catch (error) {
      console.error(error);
    }
    setWallet1NewElo(newScore);
    setWallet2NewElo(newOpponentScore);
    setEloState(true);
  };

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

      if (gameCopy.in_checkmate(gameCopy) === true) {
        var playerWin = true;
        postScore(playerWin);
        sendMove(sourceSquare, targetSquare);
        setWin(true);
        setPause(true);
        setMePause(true);
        return true;
      }
      else {
        setTurn(false);
        setMePause(true);
        setPause(false);
        sendMove(sourceSquare, targetSquare);
        return true;
      }
    } else {
      return false;
    }
  }

  function onDrop2(sourceSquare, targetSquare, oElo) {
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    setGame(gameCopy);
    let audio = new Audio(chessmove);
    audio.play();

    if (gameCopy.in_checkmate(gameCopy) === true) {
      console.log(oElo);

      const playerWin = false;
      const result = EloRating.calculate(+elo, +oElo, playerWin);
      console.log(result);
      const newScore = result.playerRating;
      const newOpponentScore = result.opponentRating;

      console.log(newScore, newOpponentScore);
      setWallet1NewElo(newScore);
      setWallet2NewElo(newOpponentScore);
      setEloState(true);
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
      socket.emit("join_room", { room, walletAddress, elo });
    }
  };

  const sendMove = (sourceSquare, targetSquare) => {
    socket.emit("send_message", { sourceSquare, targetSquare, room, elo });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setTurn(true);

      onDrop2(data.sourceSquare, data.targetSquare, data.elo);
      return;
    });
    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    socket.on("player_joined", (data) => {
      setWallet2(data.walletAddress);
      setWallet2Elo(data.elo);
      setscore(1);
      return;
    });
    // eslint-disable-next-line
  }, []);

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
    socket.emit("join_room", { room, walletAddress, elo });
    return;
  },[]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setGameTime(gameTime);
    if (score2 === 1) {
      setscore(1);
      setWallet2Elo(wallet2elo);
      setWallet2(props.OpponentWallet);
    }
  });// eslint-disable-line react-hooks/exhaustive-deps

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
    return (
      <div className="gameBody">
        <div className="gameContainer container">
          <div className="walletContainer">
            <div className="walletElo">
              <h6>{wallet2}</h6>
              <h6 id="wal2">
                {!eloState && wallet2Elo}
                {eloState && wallet2NewElo}
              </h6>
            </div>

            <Timer
              time={{ hours: 0, minutes: gameTime, seconds: 0 }}
              pause={pause}
            />
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
            <div className="walletElo">
              <h6>{props.walletAddress}</h6>
              <h6>
                {!eloState && wallet1Elo}
                {eloState && wallet1NewElo}
              </h6>
            </div>
            <TimerMe
              time={{ hours: 0, minutes: gameTime, seconds: 0 }}
              pause={mePause}
            />
          </div>
        </div>
        <div className="timer">
          {gameOver && renderLose()}
          {show && renderWin()}
          {win && renderWin()}
          {lose && renderLose()}
        </div>
      </div>
    );
  }
  if ((score === 1) & (gameSide === "black")) {
    return (
      <div className="gameBody">
        <div className="gameContainer container">
          <div className="walletContainer">
            <div className="walletElo">
              <h6>{wallet2}</h6>
              <h6 id="wal2">
                {!eloState && wallet2Elo}
                {eloState && wallet2NewElo}
              </h6>
            </div>

            <Timer
              time={{ hours: 0, minutes: gameTime, seconds: 0 }}
              pause={pause}
            />
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
            <div className="walletElo">
              <h6>{props.walletAddress}</h6>
              <h6>
                {!eloState && wallet1Elo}
                {eloState && wallet1NewElo}
              </h6>
            </div>
            <TimerMe
              time={{ hours: 0, minutes: gameTime, seconds: 0 }}
              pause={mePause}
            />
          </div>
        </div>
        <div className="timer">
          {gameOver && renderLose()}
          {show && renderWin()}
          {win && renderWin()}
          {lose && renderLose()}
        </div>
      </div>
    );
  }
}
