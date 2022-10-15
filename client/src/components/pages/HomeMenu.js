import React, { useState } from "react";
import "../css/HomePage.css";
import { useQuery } from "@apollo/client";
import { QUERY_SCORES } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import { ADD_ROOM } from "../../utils/mutations";
import { START_GAME } from "../../utils/mutations";
import { Link, Navigate } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import CreateGame from "..//sub/joinRoomLogic/CreateGame";
import PlayVsPlay from "./PlayVsPlay";
import Board from "./Board";
import io from "socket.io-client";
import JoinGame from "../sub/joinRoomLogic/JoinGame";

const randomIntFromInterval = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const rndInt = randomIntFromInterval(1, 1000);
const socket = io.connect("https://solchess-app-server.herokuapp.com/");
// const socket = io.connect("http://localhost:5001");

const HomeMenu = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);
  const [game, setGame] = useState(0);
  const [score, setScore] = useState(0);
  const [room, setRoom] = useState();
  const [elo, setElo] = useState();
  const [gameTime, setGameTime] = useState(0);
  const [gameColor, setColor] = useState(0);
  const [wallet2Elo, setWallet2Elo] = useState(0);
  const [wallet2Address, setWallet2Address] = useState(0);

  // console.log(gameTime, gameColor);
  const [formState, setFormState] = useState({ wallet: "" });

  const [addUser, { error }] = useMutation(ADD_USER);
  const [addRoom, { startData }] = useMutation(ADD_ROOM, {
    onCompleted: (startData) => {

      setGameTime(startData.addRoom.room.roomTime);
      setColor(startData.addRoom.room.roomColor.toString());
    },
  });
  // const [startGame] = useMutation(START_GAME);
  const [startGame, { gameData }] = useMutation(START_GAME, {
    onCompleted: (gameData) => {
      console.log(gameData.startGame);
      if (gameData.startGame === null) {
        setGame(2);
      } else {
        console.log(gameData.startGame);
        setGameTime(gameData.startGame.roomTime);
        setWallet2Address(gameData.startGame.wallet)
        setWallet2Elo(gameData.startGame.elo);
        setScore(1);

        if (gameData.startGame.roomColor === "white") {
          setColor("black");
        } else {
          setColor("white");
        }
      }
    },
  });

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      const x = response.publicKey.toString();
      localStorage.removeItem("wallet");
      localStorage.setItem("wallet", x);
      const wallet1 = "wallet";

      setFormState({
        ...formState,
        [wallet1]: x,
      });
      setWalletAddress(response.publicKey.toString());
      createPlayer(x);
    }
  };

  const createPlayer = async (x) => {
    const adding = { wallet: x };

    try {
      const { data } = await addUser({
        variables: { ...adding },
      });
      setElo(data.addUser.elo);
    } catch (err) {
      if (err) throw err.message;
      console.log(err.message);
    }
  };

  const renderNotConnectedContainer = () => (
    <div className="hero">
      <div className="herohome">
        <div className="herofeature">
          <h1>Solana Chess</h1>
          <h4>Currently under production</h4>
          <button
            className="cta-button connect-wallet-button"
            onClick={connectWallet}
          >
            Connect to Wallet
          </button>
        </div>

        <div className="herofeature">

        </div>
      </div>
    </div>
  );

  const letsGame = () => {
    setGame(1);
  };
  const joinGame = () => {
    setGame(2);
  };

  const resetGame = () => {
    setGame(0);
  };

  const submit = () => {
    const time = document.getElementById("time");
    const gameTime = time.value;
    const color = document.getElementById("color");
    const gameColor = color.value;
    setGame(3);
    const room = randomIntFromInterval(1, 1000);
    const roomString = room.toString();
    setRoom(room);
    const roomVariables = {
      wallet: walletAddress,
      roomNumber: roomString,
      roomTime: gameTime,
      roomColor: gameColor,
      elo: elo,
    };
    createRoom(roomVariables);
  };

  const createRoom = async (x) => {

    try {
      const { data } = await addRoom({
        variables: { ...x },
      });
    } catch (err) {
      if (err) throw err.message;
      console.log(err.message);
    }
  };

  const sGame = async (wallet2) => {
    try {
      const { gameData } = await startGame({
        variables: { ...wallet2 },
      });
    } catch (err) {
      if (err) throw err.message;
      console.log(err.message);
    }
  };

  const joinRoom = () => {
    const roomNumber = document.getElementById("roomnumber");

    var room = parseInt(roomNumber.value).toString();

    if (room === "NaN") {
      alert("Please enter a room number.");
      setGame(2);
      return;
    }
    console.log(room);

    var work = { roomNumber: room, wallet2: walletAddress };
    sGame(work);

    var room = parseInt(roomNumber.value);

    setRoom(room);
    setGame(3);
  };

  const renderPuzzlePlay = () => (
    <div className="games">
      <div className="herofeature">
        <h1>Play Puzzle Rush</h1>
        <Link to="play" className="">
          <AiIcons.AiFillPlayCircle size={50} />
        </Link>
        <h1>Play vs Friend</h1>
        <div className="choice-container">
          <button className={`btn btn-primary`} onClick={letsGame}>
            Start New
          </button>
          <button className={`btn btn-secondary`} onClick={joinGame}>
            Join Game
          </button>
        </div>
      </div>
      <div className="herofeature">
        <Link to="/profile">
          <BsIcons.BsTwitter size={50} />
        </Link>
        <Link to="play" className="">
          <FaIcons.FaDiscord size={50} />
        </Link>
        <Link to="/leaderboard" className="btn2">
          <h4 className="leaderboard2">LeaderBoard</h4>
        </Link>
      </div>
    </div>
  );

  // UseEffects
  // useEffect(() => {
  //   const onLoad = async () => {
  //     await checkIfWalletIsConnected();
  //   };
  //   window.addEventListener("load", onLoad);
  //   return () => window.removeEventListener("load", onLoad);
  // }, []);

  if (game === 0) {
    return (
      <div className="body">
        {!walletAddress && renderNotConnectedContainer()}
        {walletAddress && renderPuzzlePlay()}
      </div>
    );
  }
  if (game === 1) {
    return (
      <div className="body">
        <CreateGame resetGame={resetGame} submit={submit} />
      </div>
    );
  }
  if (game === 2) {
    return (
      <div className="body">
        <JoinGame resetGame={resetGame} submit={joinRoom} />
      </div>
    );
  }
  if (game === 3) {
    return (
      <PlayVsPlay
        room={room}
        socket={socket}
        walletAddress={walletAddress}
        gameColor={gameColor}
        gameTime={gameTime}
        elo={elo}
        OpponentElo={wallet2Elo}
        OpponentWallet={wallet2Address}
        score= {score}
      />
    );
  }
};

export default HomeMenu;
