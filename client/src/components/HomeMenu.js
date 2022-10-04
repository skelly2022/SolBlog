import React, { useState } from "react";
import "./css/HomePage.css";
import { useQuery } from "@apollo/client";
import { QUERY_SCORES } from "../utils/queries";
// import { QUERY_SCORE } from "../utils/queries";
// import ScoreList from "../components/ScoreList";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Link } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

const HomeMenu = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);
  const [formState, setFormState] = useState({ wallet: "" });

  // const [getMyScore] = useQuery(QUERY_SCORE);

  const { loading, data } = useQuery(QUERY_SCORES);
  const scores = data?.scores || [];

  const [addUser, { error }] = useMutation(ADD_USER);

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

  const renderPuzzlePlay = () => (
    <div className="games">
      <div className="herofeature">
        <h1>Play Puzzle Rush</h1>
        <Link to="play" className="">
          <AiIcons.AiFillPlayCircle size={50} />
        </Link>
        <h1>Play vs Friend</h1>
        <Link to="play" className="">
          <AiIcons.AiFillPlayCircle size={50} />
        </Link>
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
    <a className="  btn1 " href="/p">
      Launch App
    </a>
  );

  // UseEffects
  // useEffect(() => {
  //   const onLoad = async () => {
  //     await checkIfWalletIsConnected();
  //   };
  //   window.addEventListener("load", onLoad);
  //   return () => window.removeEventListener("load", onLoad);
  // }, []);

  return (
    <div className="body">
      {!walletAddress && renderNotConnectedContainer()}
      {walletAddress && renderPuzzlePlay()}
    </div>
  );
};

export default HomeMenu;
