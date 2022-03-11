import React, { useState, useEffect } from "react";
import { Container, Modal, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import TacticBoard from "./TacticBoard";
import chessmove from "../audio/chessmove.wav";
import solve from "../audio/puzzle solve.wav";
import wrongmove from "../audio/incorrect move.wav";
import axios from "axios";

function TacticSession() {
  const [chessboardSize, setChessboardSize] = useState(undefined);
  const [score, SetScore] = useState(0);
  const [key, setKey] = useState(Date.now());
  const [tactic, setTactic] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getPuzzle = async () => {
    const initData = await axios(
      "https://chess-puzzle-server.herokuapp.com/"
    ).then((data) => {
      return data.data;
    });

    setTactic(initData);
  };

  useEffect(() => {
    getPuzzle();
    function handleResize() {
      const display = document.getElementsByClassName("col")[0];
      const displayDiv = display.getElementsByTagName("div")[0];
      const chessBoardContainer = displayDiv.getElementsByTagName("div")[0];

      chessBoardContainer.setAttribute(
        "style",
        "position: relative;,display: flex;, align-items: center;, justify-content: center;"
      );

      if (display.offsetWidth > 900) {
        setChessboardSize(display.offsetWidth - 350);
      }

      if (display.offsetWidth <= 900) {
        setChessboardSize(display.offsetWidth - 30);
      }

      if (display.offsetWidth <= 660) {
        setChessboardSize(display.offsetWidth - 40);
      }

      if (display.offsetWidth <= 480) {
        setChessboardSize(display.offsetWidth + 10);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(tactic);
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
      }}
    >
      <Col
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
          boardHeight
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
          }}
          onSolve={() => {
            let audio = new Audio(solve);
            audio.play();
            setTimeout(() => {
              audio.pause();
            }, 700);
            SetScore(score + 1);
            getPuzzle();
            setKey(Date.now());
          }}
        />
      </Col>

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
