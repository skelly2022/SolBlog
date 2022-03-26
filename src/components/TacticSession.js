import React, { useState, useEffect } from "react";
import { Container, Modal, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import TacticBoard from "./TacticBoard";
import chessmove from "../audio/chessmove.wav";
import solve from "../audio/puzzle solve.wav";
import wrongmove from "../audio/incorrect move.wav";
import axios from "axios";
import Timer from "./Timer";
import { getSideToPlayFromFen } from "../utils/chessTactics";

function TacticSession() {
  const [chessboardSize, setChessboardSize] = useState(undefined);
  const [score, SetScore] = useState(0);
  const [key, setKey] = useState(Date.now());
  const [tactic, setTactic] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isGameOver, setIsGameOver] = useState(false);

  async function getPuzzle() {
    let data = await axios("https://chess-puzzle-server.herokuapp.com/").then(
      (data) => {
        const payload = data.data;

        return payload;
      }
    );

    setTactic(data);
  }

  useEffect(() => {
    async function getAPuzzle() {
      let data = await axios("https://chess-puzzle-server.herokuapp.com/").then(
        (data) => {
          const payload = data.data;

          return payload;
        }
      );

      setTactic(data);
    }
    getAPuzzle();
  }, []);

  useEffect(() => {
    function handleResize() {
      const display = document.getElementsByClassName("container")[0];
      const displayDiv = display.getElementsByTagName("div")[0];
      const chessBoardContainer = displayDiv.getElementsByTagName("div")[0];

      chessBoardContainer.setAttribute(
        "style",
        "position: relative; display: flex; align-items: center; justify-content: center;"
      );

      if (display.offsetWidth >= 1140) {
        setChessboardSize(display.offsetWidth * 0.45);
      }

      if (display.offsetWidth >= 960 && display.offsetWidth < 1140) {
        setChessboardSize(display.offsetWidth * 0.55);
      }

      if (display.offsetWidth >= 720 && display.offsetWidth < 960) {
        setChessboardSize(display.offsetWidth * 0.75);
      }

      if (display.offsetWidth <= 540) {
        setChessboardSize(display.offsetWidth * 0.9);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
        flexDirection: "column-reverse",
      }}
    >
      <Col>
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TacticBoard
            key={key}
            tactic={tactic}
            boardWidth={chessboardSize}
            onCorrect={() => {
              let audio = new Audio(chessmove);
              audio.play();
              setTimeout(() => {
                audio.pause();
              }, 700);
            }}
            onIncorrect={() => {
              let audio = new Audio(wrongmove);
              audio.play();
              setTimeout(() => {
                audio.pause();
              }, 700);
              handleShow();
              setIsGameOver(true);
            }}
            onSolve={async () => {
              let audio = new Audio(solve);
              audio.play();
              setTimeout(() => {
                audio.pause();
              }, 700);
              SetScore(score + 1);
              await getPuzzle();
              setKey(Date.now());
            }}
          />
        </Container>
      </Col>

      {!isGameOver && (
        <Col>
          <Timer time={{ hours: 0, minutes: 5, seconds: 0 }} />
          <div style={{ textAlign: "center" }}>
            <h2>
              {getSideToPlayFromFen(tactic.fen) === "b"
                ? "White to Play"
                : "Black to Play"}
            </h2>
          </div>
        </Col>
      )}

      <Modal
        show={show}
        onHide={handleClose}
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
          <Link className="btn btn-primary" to="/">
            Return to menu
          </Link>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TacticSession;
