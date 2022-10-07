import React, { useState } from "react";
import "../css/HomePage.css";
import { useQuery } from "@apollo/client";
import { QUERY_SCORES } from "../../utils/queries";
// import { QUERY_SCORE } from "../utils/queries";
// import ScoreList from "../components/ScoreList";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import { Link, Navigate } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import CreateGame from "..//sub/joinRoomLogic/CreateGame";
import PlayVsPlay from "./PlayVsPlay";
import Board from "./Board";
import io from "socket.io-client";
import JoinGame from "../sub/joinRoomLogic/JoinGame";

// const socket = io.connect("http://localhost:5001");

const randomIntFromInterval = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const rndInt = randomIntFromInterval(1, 1000);

const HomeMenu = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);
  const [game, setGame] = useState(0);
  const [room, setRoom] = useState();
  const [gameTime, setGameTime] = useState(0);
  const [gameColor, setColor] = useState(0);

  // console.log(gameTime, gameColor);
  const [formState, setFormState] = useState({ wallet: "" });

  // const [getMyScore] = useQuery(QUERY_SCORE);

  const { loading, data } = useQuery(QUERY_SCORES);
  const scores = data?.scores || [];

  const [addUser, { error }] = useMutation(ADD_USER);

  //socket

  // Actions
  // const checkIfWalletIsConnected = async () => {
  //   try {
  //     const { solana } = window;

  //     if (solana) {
  //       if (solana.isPhantom) {
  //         console.log("Phantom wallet found!");
  //         const response = await solana.connect({ onlyIfTrusted: true });
  //         console.log(
  //           "Connected with Public Key:",
  //           response.publicKey.toString()
  //         );

  //         /*
  //          * Set the user's publicKey in state to be used later!
  //          */
  //         setWalletAddress(response.publicKey.toString());

  //       }
  //     } else {
  //       alert("Solana object not found! Get a Phantom Wallet 👻");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
          <Link to="/leaderboard" className="">
            <BsIcons.BsTwitter size={50} />
          </Link>
          <Link to="/leaderboard" className="">
            <FaIcons.FaDiscord size={50} />
          </Link>
          <Link to="/leaderboard" className="btn2">
            <h4 className="leaderboard2">LeaderBoard</h4>
          </Link>
        </div>
      </div>
    </div>
  );

  const start = "play";
  const join = "join";

  const startGame = () => {
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
    var gameTime = time.value;
    const color = document.getElementById("color");
    var gameColor = color.value;
    setGameTime(gameTime);
    setColor(gameColor);
    setGame(3);
    const room = randomIntFromInterval(1, 1000);
    setRoom(room);
  };


  const joinRoom = () => {
    const roomnumber = document.getElementById("roomnumber");
    var room = parseInt(roomnumber.value);
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
          <button className={`btn btn-primary`} onClick={startGame}>
            Start New
          </button>
          <button className={`btn btn-secondary`} onClick={joinGame}>
            Join Game
          </button>
        </div>
      </div>
      <div className="herofeature">
        <Link to="/play" className="">
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

  const renderPlayVsPlay = () => (
    <div className="games">
      <form></form>
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
      <div className="body">
        {console.log(room)}
    <PlayVsPlay room={room}/>
      </div>
    );
  }
};

export default HomeMenu;
