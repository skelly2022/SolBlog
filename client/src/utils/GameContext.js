import React, { useContext, useState } from "react";

const GameContext = React.createContext();
const GameUpdateContext = React.createContext();

export function useGameState() {
  return useContext(GameContext);
}

export function useGameUpdateState() {
  return useContext(GameUpdateContext);
}

export function GameStateProvider({ children }) {
  const [isGameOver, setIsGameOver] = useState(false);
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow((prevShow) => !prevShow);
  }

  function toggleGameOver() {
    setIsGameOver((gameOver) => !gameOver);
  }

  function resetState() {
    setIsGameOver(false);
    setShow(false);
  }

  return (
    <GameContext.Provider value={{ gameOver: isGameOver, show: show }}>
      <GameUpdateContext.Provider
        value={{
          updateGameOver: toggleGameOver,
          updateShow: toggleShow,
          reset: resetState,
        }}
      >
        {children}
      </GameUpdateContext.Provider>
    </GameContext.Provider>
  );
}
