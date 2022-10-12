import React, { Component, useEffect, useState  } from "react";
import { Navigate, Redirect } from "react-router-dom";

import Wait from "../sub/joinRoomLogic/Wait";

import io from "socket.io-client";
import qs from "qs";
import PlayVsPlay from "./PlayVsPlay";

const ENDPOINT = "http://localhost:5001";


class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: new Array(9).fill(null),
      piece: "X",
      turn: true,
      end: false,
      room: "",
      statusMessage: "",
      currentPlayerScore: 0,
      opponentPlayer: [],
      
      //State to check when a new user join
      waiting: false,
      joinError: false,
    };
    console.log(this.state);
    this.socketID = null;
  }



  componentDidMount() {
    //Getting the room and the username information from the url
    //Then emit to back end to process
    this.socket = io(ENDPOINT);
    const { room, name } = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    console.log(room);
    this.setState({ room });
    this.socket.emit("join_room", room);

    console.log(this.socket)

    //New user join, logic decide on backend whether to display
    //the actual game or the wait screen or redirect back to the main page
    this.socket.on("waiting", () =>
      this.setState({
        waiting: true,
        currentPlayerScore: 0,
        opponentPlayer: [],
      })
    );
    this.socket.on("starting", ({ gameState, players, turn }) => {
      this.setState({ waiting: false });
      this.gameStart(gameState, players, turn);
    });
    this.socket.on("joinError", () => this.setState({ joinError: true }));

    //Listening to the assignment of piece store the piece along with the in state
    //socket id in local socketID variable
    this.socket.on("pieceAssignment", ({ piece, id }) => {
      this.setState({ piece: piece });
      this.socketID = id;
    });

    //Game play logic events
    this.socket.on("update", ({ gameState, turn }) =>
      this.handleUpdate(gameState, turn)
    );
    this.socket.on("winner", ({ gameState, id }) =>
      this.handleWin(id, gameState)
    );
    this.socket.on("draw", ({ gameState }) => this.handleDraw(gameState));

    this.socket.on("restart", ({ gameState, turn }) =>
      this.handleRestart(gameState, turn)
    );
  }


  handleInput() {
    console.log("hey")
    // console.log(this.socket)
  }

  //Setting the states to start a game when new user join
  gameStart(gameState, players, turn) {
    const opponent = players.filter(([id, name]) => id !== this.socketID)[0][1];
    this.setState({ opponentPlayer: [opponent, 0], end: false });
    this.setBoard(gameState);
    this.setTurn(turn);
    this.setMessage();
  }

  //When some one make a move, emit the event to the back end for handling
  handleClick = (index) => {
    const { game, piece, end, turn, room } = this.state;
    if (!game[index] && !end && turn) {
      this.socket.emit("move", { room, piece, index });
    }
  };

  //Setting the states each move when the game haven't ended (no wins or draw)
  handleUpdate(gameState, turn) {
    this.setBoard(gameState);
    this.setTurn(turn);
    this.setMessage();
  }

  //Setting the states when some one wins
  handleWin(id, gameState) {
    this.setBoard(gameState);
    if (this.socketID === id) {
      const playerScore = this.state.currentPlayerScore + 1;
      this.setState({
        currentPlayerScore: playerScore,
        statusMessage: "You Win",
      });
    } else {
      const opponentScore = this.state.opponentPlayer[1] + 1;
      const opponent = this.state.opponentPlayer;
      opponent[1] = opponentScore;
      this.setState({
        opponentPlayer: opponent,
        statusMessage: `${this.state.opponentPlayer[0]} Wins`,
      });
    }
    this.setState({ end: true });
  }

  //Setting the states when there is a draw at the end
  handleDraw(gameState) {
    this.setBoard(gameState);
    this.setState({ end: true, statusMessage: "Draw" });
  }

  playAgainRequest = () => {
    this.socket.emit("playAgainRequest", this.state.room);
  };

  //Handle the restart event from the back end
  handleRestart(gameState, turn) {
    this.setBoard(gameState);
    this.setTurn(turn);
    this.setMessage();
    this.setState({ end: false });
  }

  //Some utilities methods to set the states of the board

  setMessage() {
    const message = this.state.turn
      ? "Your Turn"
      : `${this.state.opponentPlayer[0]}'s Turn`;
    this.setState({ statusMessage: message });
  }

  setTurn(turn) {
    if (this.state.piece === turn) {
      this.setState({ turn: true });
    } else {
      this.setState({ turn: false });
    }
  }

  setBoard(gameState) {
    this.setState({ game: gameState });
  }

  // renderSquare(i){
  //   return(
  //     <Square key={i} value={this.state.game[i]}
  //                             player={this.state.piece}
  //                             end={this.state.end}
  //                             id={i}
  //                             onClick={this.handleClick}
  //                             turn={this.state.turn}/>
  //   )
  // }

  render() {
    return (
      <>
        {/* <Wait display={this.state.waiting} room={this.state.room}/> */}
        <div className="board">
          <PlayVsPlay  handleInput={this.handleInput}/>
        </div>
      </>
    );
  }
}

export default Board;
