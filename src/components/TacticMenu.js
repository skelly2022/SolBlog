import React, { useEffect, useState } from 'react';

const TEST_WALLETS = [
  { wallet: 'asparagus', score: 'vegetables' },
  { wallet: 'asparagus', score: 'vegetables' },
  { wallet: 'asparagus', score: 'vegetables' },
  { wallet: 'asparagus', score: 'vegetables' },
  { wallet: 'asparagus', score: 'vegetables' },
];

const TacticMenu = () => {

   // State
   const [walletAddress, setWalletAddress] = useState(null);

   // Actions
   const checkIfWalletIsConnected = async () => {
     try {
       const { solana } = window;
 
       if (solana) {
         if (solana.isPhantom) {
           console.log('Phantom wallet found!');
           const response = await solana.connect({ onlyIfTrusted: true });
           console.log(
             'Connected with Public Key:',
             response.publicKey.toString()
           );
 
           /*
            * Set the user's publicKey in state to be used later!
            */
           setWalletAddress(response.publicKey.toString());
         }
       } else {
         alert('Solana object not found! Get a Phantom Wallet 👻');
       }
     } catch (error) {
       console.error(error);
     }
   };
 
   const connectWallet = async () => {
    const { solana } = window;
  
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
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
    <a
    style={{ width: "30%" }}
    className="btn btn-primary"
    href='/beginner'
  >
    Start
  </a>
  );

  const renderConnectedWallet = () => (
<h4 className='connectedWallet'>Connected Wallet : {walletAddress}</h4>
  );


  const renderHighScoresContainer = () => (
      <div className="gif-grid">
        {TEST_WALLETS.map(wallet => (
          <div className="gif-item" key={wallet}>
            <p>{wallet.wallet}</p>
            <p>{wallet.score}</p>
          </div>
        ))}
      </div>
  );
 
   // UseEffects
   useEffect(() => {
     const onLoad = async () => {
       await checkIfWalletIsConnected();
     };
     window.addEventListener('load', onLoad);
     return () => window.removeEventListener('load', onLoad);
   }, []);

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

      <div className="Intro2">
      <h1 className="highScoreh1">HighScores</h1>
        {renderHighScoresContainer()}
      </div>
    </div>
    
    
  );
}

export default TacticMenu;
