import React, { useState, useEffect } from "react";
import { useGameState, useGameUpdateState } from "../utils/GameContext";
import { Container, Modal, Col, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import TacticBoard from "./TacticBoard";
import chessmove from "../audio/chessmove.wav";
import solve from "../audio/puzzle solve.wav";
import wrongmove from "../audio/incorrect move.wav";
import axios from "axios";
import Timer from "./Timer";
import { getSideToPlayFromFen } from "../utils/chessTactics";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SCORE } from "../utils/queries";
import { CREATE_VOTE } from "../utils/mutations";

const TacticSession = () => {
  const [chessboardSize, setChessboardSize] = useState(500);
  const [key, setKey] = useState(Date.now());
  const [tactic, setTactic] = useState({});
  const [score, SetScore] = useState(0);

  const { gameOver } = useGameState();
  // const { show } = useGameState();
  // const { updateShow } = useGameUpdateState();
  // const { updateGameOver } = useGameUpdateState();
  // const { reset } = useGameUpdateState();
  const [loading, setLoading] = useState(true);

  const [walletAddress, setWalletAddress] = useState(null);
  const [updateScore, { error }] = useMutation(CREATE_VOTE);

  const cat = localStorage.getItem("wallet");
  const adding = { wallet: cat };

  const { data } = useQuery(QUERY_SCORE, {
    variables: { ...adding },
  });
  const x = data;

  //   if (x.score.length>0){
  // console.log(x);
  //   };

  // SetScore(data.score.highScore);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            "Connected with Public Key:",
            response.publicKey.toString()
          );

          /*
           * Set the user's publicKey in state to be used later!
           */

          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const postScore = async (newScore) => {
    const id = window.localStorage.getItem("id");
    console.log(newScore);
    // scoreChange = newScore;
    const updateS = { _id: id, elo: newScore.toString()};
    try {
      const { data } = await updateScore({
        variables: { ...updateS },
      });
    } catch (error) {
      console.error(error);
    }
  };

  async function getPuzzle() {
    let data = await axios("https://chess-puzzle-server.herokuapp.com/").then(
      (data) => {
        const payload = data.data;
    

        return payload;
      }
    );

    const potential = {id:'10',blunderMover:'b3',fen:'3r3k/6bp/2p3p1/p1P3P1/8/RB2R3/1P3P2/2Kbr3 w - - 0 38',solution: ['Rxe1','Bxb3','Rxb3']}
console.log(data);
console.log(potential);
    setTactic(data);
    setInterval(() => {
      setLoading(false);
    }, 3000);
  }

  useEffect(() => {
    if (!loading) {
      function handleResize() {
        const display = document.getElementsByClassName("container")[0];
        const displayDiv = display.getElementsByTagName("div")[0];
        const chessBoardContainer = displayDiv.getElementsByTagName("div")[0];

        chessBoardContainer.setAttribute(
          "style",
          "position: relative; display: flex; align-items: center; justify-content: center;"
        );

        if (display.offsetWidth >= 1140) {
          setChessboardSize(display.offsetWidth * 0.49);
        }

        if (display.offsetWidth >= 960 && display.offsetWidth < 1140) {
          setChessboardSize(display.offsetWidth * 0.69);
        }

        if (display.offsetWidth >= 720 && display.offsetWidth < 960) {
          setChessboardSize(display.offsetWidth * 0.82);
        }

        if (display.offsetWidth >= 720 && display.offsetWidth < 960) {
          setChessboardSize(display.offsetWidth * 0.8);
        }

        if (display.offsetWidth <= 540) {
          setChessboardSize(display.offsetWidth);
        }
      }

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      console.log(x);
      const iD = x.score._id;
      localStorage.removeItem("id");
      localStorage.setItem("id", iD);
      const currentScore = x.score.highScore;
      SetScore(currentScore);
    }
  }, [loading]);

  useEffect(() => {
    getPuzzle();
  }, []);

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  async function solutionFunction() {
    let audio = new Audio(solve);
    // audio.play();
    setTimeout(() => {
      audio.pause();
    }, 800);
    const newScore = +score + +1;
    SetScore(newScore);
    postScore(newScore);
    await getPuzzle();
    setKey(Date.now());
  }

  async function correctFunction() {
    let audio = new Audio(chessmove);
    // audio.play();
    setTimeout(() => {
      audio.pause();
    }, 200);
  }

  async function incorrectFunction() {
    let audio = new Audio(wrongmove);
    // audio.play();
    setTimeout(() => {
      audio.pause();
    }, 1000);
    const newScore = score - 1;
    SetScore(newScore);
    postScore(newScore);
    await getPuzzle();
    setKey(Date.now());
  }
  return (
    <>
      {loading ? (
        <div className="loader-wrapper">
          <div className="loader">
            <div className="loader loader-inner"></div>
          </div>
        </div>
      ) : (
        <>
          <Container className="mainContainer">
            <Col className="chessBody">
              <Container className="chessContainer">
                <TacticBoard
                  key={key}
                  tactic={tactic}
                  boardWidth={chessboardSize}
                  onCorrect={correctFunction}
                  onIncorrect={incorrectFunction}
                  onSolve={solutionFunction}
                />
              </Container>
            </Col>

            {!gameOver && (
              <Col className="chessHeader">
                <Card className="cardShadow">
                  <ListGroup>
                    <ListGroup.Item>
                      {/* <Timer time={{ hours: 0, minutes: 0, seconds: 10 }} /> */}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div style={{ textAlign: "center" }}>
                        <h2>Score: {score}</h2>
                        <h4>
                          {getSideToPlayFromFen(tactic.fen) === "b"
                            ? "White to Play"
                            : "Black to Play"}
                        </h4>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            )}

            {/* <Modal
              show={show}
              onHide={updateShow}
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header>
                <Modal.Title style={{ margin: "auto", fontSize: "2.5rem" }}>
                  Game Over!
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h2>Score: {score}</h2>
              </Modal.Body>
              <Modal.Footer>
                <Link onClick={reset} className="btn btn-primary" to="/">
                  Return to menu
                </Link>
              </Modal.Footer>
            </Modal> */}
          </Container>
        </>
      )}
    </>
  );
};

export default TacticSession;
