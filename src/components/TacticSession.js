import React, { useState, useEffect } from "react";

import { Container, Modal, Col, Card, ListGroup } from "react-bootstrap";
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
    getPuzzle();
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
        setChessboardSize(display.offsetWidth * 0.59);
      }

      if (display.offsetWidth >= 960 && display.offsetWidth < 1140) {
        setChessboardSize(display.offsetWidth * 0.69);
      }

      if (display.offsetWidth >= 720 && display.offsetWidth < 960) {
        setChessboardSize(display.offsetWidth * 0.82);
      }

      if (display.offsetWidth >= 720 && display.offsetWidth < 960) {
        setChessboardSize(display.offsetWidth * 0.85);
      }

      if (display.offsetWidth <= 540) {
        setChessboardSize(display.offsetWidth);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function solutionFunction() {
    let audio = new Audio(solve);
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 1000);
    SetScore(score + 1);
    await getPuzzle();
    setKey(Date.now());
  }

  return (
    <Container className="mainContainer">
      <Col className="chessBody">
        <Container className="chessContainer">
          <TacticBoard
            key={key}
            tactic={tactic}
            boardWidth={chessboardSize}
            onCorrect={() => {
              let audio = new Audio(chessmove);
              audio.play();
              setTimeout(() => {
                audio.pause();
              }, 1000);
            }}
            onIncorrect={() => {
              let audio = new Audio(wrongmove);
              audio.play();
              setTimeout(() => {
                audio.pause();
              }, 1000);
              handleShow();
              setIsGameOver(true);
            }}
            onSolve={solutionFunction}
          />
        </Container>
      </Col>

      {!isGameOver && (
        <Col className="chessHeader">
          <Card className="cardShadow">
            <ListGroup>
              <ListGroup.Item>
                <Timer time={{ hours: 0, minutes: 5, seconds: 0 }} />
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
