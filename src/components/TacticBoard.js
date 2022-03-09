import React, { useEffect, useState } from "react";
import {
  getSideToPlayFromFen,
  makeMove,
  getPossibleMoves,
  validateMoveOnClick,
} from "../utils/chessTactics";
import { Chessboard } from "react-chessboard";
import Chess from "chess.js";
import chessmove from "../audio/chessmove.wav";

function TacticBoard({ tactic, onSolve, onCorrect, onIncorrect }) {
  const [fen, setFen] = useState(tactic.fen);
  const [solution, setSolution] = useState(tactic.solution);
  const [squareStyles, setSquareStyles] = useState({});
  const [game, setGame] = useState(new Chess(fen));
  const [moveFrom, setMoveFrom] = useState("");
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});

  useEffect(() => {
    setTimeout(() => {
      const next = makeMove(tactic.fen, tactic.blunderMove);
      if (next) {
        setFen(next.fen);
      }
    }, 700);
  }, [tactic]);

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }
  const highlightSquares = (currentSquare, squaresToHighlight) => {
    const highlightStyles = [currentSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
              borderRadius: "50%",
            },
          },
          ...squareStyling(currentSquare, squaresToHighlight),
        };
      },
      {}
    );

    setSquareStyles({
      ...squareStyles,
      ...highlightStyles,
    });
  };

  const squareStyling = (square, history) => {
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;

    return {
      [square]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
      ...(history.length && {
        [sourceSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)",
        },
      }),
      ...(history.length && {
        [targetSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)",
        },
      }),
    };
  };

  const removeHighlight = (square) => {
    setSquareStyles(squareStyling(square, []));
  };

  function getMoveOptions(square) {
    const moves = getPossibleMoves(fen, square);

    console.log(moves);

    if (moves.length === 0) {
      return;
    }

    const newSquares = {};
    moves.map((move) => {
      console.log(game.get(move.to));
      newSquares[move.to] = {
        background:
          "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
      return move;
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    setOptionSquares(newSquares);
  }

  /*function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
  }*/

  function onSquareClick(square) {
    let moves = getPossibleMoves(fen, square);

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    highlightSquares(square, squaresToHighlight);

    setRightClickedSquares({});

    function resetFirstMove(square) {
      setMoveFrom(square);
      getMoveOptions(square);
    }

    // from square
    if (!moveFrom) {
      resetFirstMove(square);
      return;
    }

    // attempt to make move
    let data = {
      from: moveFrom,
      to: square,
      promotion: "q",
    };

    const next = validateMoveOnClick(fen, data, solution);
    if (next) {
      setFen(next.fen);

      setSolution(next.solution);

      if (next.solution.length > 0) {
        onCorrect();

        const autoNext = validateMoveOnClick(
          next.fen,
          next.solution[0],
          next.solution
        );

        if (autoNext) {
          setFen(autoNext.fen);
          setSolution(autoNext.solution);
        }
      } else {
        onSolve();
      }
    } else if (data.from && data.from !== data.to) {
      onIncorrect();
    }

    // if invalid, setMoveFrom and getMoveOptions
    if (next === null) {
      resetFirstMove(square);
      return;
    }

    //setTimeout(makeRandomMove, 300);
    setMoveFrom("");
    setOptionSquares({});
  }

  function onSquareRightClick(square) {
    const colour = "rgba(0, 0, 255, 0.4)";
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] &&
        rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : { backgroundColor: colour },
    });
  }

  function onDrop(sourceSquare, targetSquare) {
    let move = null;
    safeGameMutate((game) => {
      move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });
    });
    if (move === null) return false; // illegal move
    //setTimeout(makeRandomMove, 200);
    return true;
  }

  return (
    <Chessboard
      id="tacticBoard"
      animationDuration={300}
      arePiecesDraggable={false}
      boardOrientation={
        getSideToPlayFromFen(tactic.fen) === "b" ? "white" : "black"
      }
      position={fen}
      onSquareClick={onSquareClick}
      onSquareRightClick={onSquareRightClick}
      customBoardStyle={{
        borderRadius: "4px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
      }}
      customSquareStyles={{
        ...moveSquares,
        ...optionSquares,
        ...rightClickedSquares,
      }}
    />
  );
}

export default TacticBoard;
