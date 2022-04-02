import Chess from "chess.js";

export function getPossibleMoves(fen, square) {
  const chess = new Chess(fen);
  let moves = chess.moves({
    square: square,
    verbose: true,
  });

  return moves;
}

export function playerInCheck(fen) {
  const chess = new Chess(fen);
  let inCheck = chess.in_check();

  return inCheck;
}

export function getMoveOnClick(fen, data) {
  const next = moveOnCLick(fen, data);

  return next ? next.moves.san : null;
}

export function getSideToPlayFromFen(fen) {
  const chess = new Chess(fen);
  return chess.turn();
}

export function moveOnCLick(fen, move) {
  const chess = new Chess(fen);
  let moves = chess.move(move);

  return moves ? { moves, fen: chess.fen() } : null;
}

export function makeMove(fen, move) {
  const chess = new Chess(fen);
  const fullMove = chess.move(move);
  return fullMove ? { fullMove, fen: chess.fen() } : null;
}

export function validateMoveOnClick(fen, move, solution) {
  if (solution.length === 0) {
    return null;
  }

  const next = moveOnCLick(fen, move);

  if (next && next.moves.san === solution[0]) {
    return {
      fen: next.fen,
      solution: solution.slice(1),
    };
  }

  return null;
}

export function validateMove(fen, move, solution) {
  if (solution.length === 0) {
    return null;
  }

  const next = makeMove(fen, move);

  if (next && next.fullMove.san === solution[0]) {
    return {
      fen: next.fen,
      solution: solution.slice(1),
    };
  }

  return null;
}
