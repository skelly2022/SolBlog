import Chess from "chess.js";
const [game, setGame] = useState(new Chess());
const position=game.fen()

console.log(position);
