import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SCORES } from "../utils/queries";
import ScoreList from "../components/ScoreList";

const TacticMenu = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);

  const { loading, data } = useQuery(QUERY_SCORES);
  const scores = data?.scores || [];

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

  // const addUser = async () => {
  //   try {
  //     console.log("we tryin");
  //     const { data } = await addUser({
  //       variables: { ...formState }
  //     });
  //     console.log("username created", data);

  //   } catch (err) {
  //     if (err) throw err;
  //     console.log(err);
  //   }
  // };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log(response.publicKey.toString);
      setWalletAddress(response.publicKey.toString());
      
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
    <a style={{ width: "30%" }} className="btn btn-primary" href="/beginner">
      Start
    </a>
  );

  const renderConnectedWallet = () => (
    <h4 className="connectedWallet">Connected Wallet : {walletAddress}</h4>
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "inline",
        height: "80vh",
      }}
    >
      <div className="Intro">
        <h1 className="introText">Puzzle Rush</h1>

        {!walletAddress && renderNotConnectedContainer()}
        {walletAddress && renderConnectedButton()}
        {walletAddress && renderConnectedWallet()}
      </div>

      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ScoreList scores={scores} title="Some Feed for Thought(s)..." />
        )}
      </div>
    </div>
  );
};

export default TacticMenu;
