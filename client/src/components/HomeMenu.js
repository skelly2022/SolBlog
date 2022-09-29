import React, { useEffect, useState } from "react";
import "./css/HomePage.css";
import { useQuery } from "@apollo/client";
import { QUERY_SCORES } from "../utils/queries";
import { QUERY_SCORE } from "../utils/queries";
import ScoreList from "../components/ScoreList";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

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
      localStorage.removeItem('wallet');
      localStorage.setItem('wallet', x);
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

    const adding = {"wallet":x}

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
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const renderConnectedButton = () => (
    <a className="  btn1 " href="/play">
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
      <div className="hero">
        <div className="herofeature">
          <h1>Solana Chess</h1>
          <h4>Currently under production</h4>
        </div>
        <div className="herofeature">
          <h1>Play Puzzle Rush Now</h1>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedButton()}
        </div>
      </div>
      <div className="features">
        <div className="feature">
          <h1> Roadmap</h1>
        </div>

        {loading ? <div>Loading...</div> : <ScoreList scores={scores} />}
      </div>
    </div>
  );
};

export default HomeMenu;
