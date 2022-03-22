import React, { useContext, useState } from "react";
import axios from "axios";

const PuzzleContext = React.createContext();
const PuzzleUpdateContext = React.createContext();

export function usePuzzle() {
  return useContext(PuzzleContext);
}

export function usePuzzleUpdate() {
  return useContext(PuzzleUpdateContext);
}

export function PuzzleProvider({ children }) {
  const [tactic, setTactic] = useState({});

  async function getPuzzle() {
    await axios("https://chess-puzzle-server.herokuapp.com/").then((data) => {
      const payload = data.data;

      if (tactic !== payload) {
        setTactic(payload);
      }
    });
  }

  return (
    <PuzzleContext.Provider value={tactic}>
      <PuzzleUpdateContext.Provider value={getPuzzle}>
        {children}
      </PuzzleUpdateContext.Provider>
    </PuzzleContext.Provider>
  );
}
