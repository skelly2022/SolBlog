import React, { useState, useEffect } from "react";
import { Container, Modal, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import TacticBoard from "./TacticBoard";
import chessmove from "../audio/chessmove.wav";
import solve from "../audio/puzzle solve.wav";
import wrongmove from "../audio/incorrect move.wav";
import axios from "axios";

const TACTICS = [
  {
    id: "1",
    blunderMove: "f2",
    fen: "8/8/4p3/3pP3/3P4/5p2/1R1K4/5bk1 b - - 9 64",
    solution: ["Rb1", "Kg2", "Ke3", "Bd3", "Rb2", "Bf5", "Rxf2+"],
    orientation: "b",
  },
  {
    id: "2",
    blunderMove: "Ka7",
    fen: "r1bq1b1r/6pp/pk3n2/3p4/5B2/1NQp4/PP3PPP/2R1R1K1 b - - 1 20",
    solution: ["Na5"],
    orientation: "b",
  },
  {
    id: "3",
    blunderMove: "Qxd5",
    fen: "r5k1/ppp2rp1/3p3p/3P2q1/3N1p2/3Q4/PPP5/1K4RR b - - 3 26",
    solution: ["Rxh6", "Kf8", "Rh8+"],
    orientation: "b",
  },
  {
    id: "4",
    blunderMove: "Bd7",
    fen: "rnbqkb1r/ppp1pppp/5n2/8/8/2N1BQ2/PPP3PP/3RKBNR b Kkq - 3 7",
    solution: ["Qxb7"],
    orientation: "b",
  },
  {
    blunderMove: "Bd6",
    fen: "2r5/6k1/p1q2p2/1p1b2pp/2rPp3/Q1P1P1BP/5PP1/1RR3K1 w - - 2 33",
    solution: ["Ra4", "Qc5", "Qb7"],
    orientation: "w",
    id: "557b234ae13823b8379035b0",
  },
];

function TacticSession() {
  const [chessboardSize, setChessboardSize] = useState(undefined);
  const [score, SetScore] = useState(0);
  const [tactics, setTactics] = useState([TACTICS[0]]);
  const [key, setKey] = useState(Date.now());
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const tactic = tactics[0];

  const getPuzzle = () => {
    const initData = axios("https://chess-puzzle-server.herokuapp.com/").then(
      (data) => {
        return data.data.data;
      }
    );
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
            const nextTactic =
              TACTICS[Math.floor(Math.random() * TACTICS.length)];
            setTactics(tactics.slice(1).concat(nextTactic));
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
