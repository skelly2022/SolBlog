import { useRef, useState } from "react";
import Chess from "chess.js";
import { Container, Modal, Col, Card, ListGroup } from "react-bootstrap";

import { Chessboard } from "react-chessboard";

export default function PlayVsPlay({ boardWidth }) {
  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    setGame(gameCopy);
    return move;
  }

  return (
    <Container className="mainContainer">
      <Col className="chessBody">
        <Container className="chessContainer">
          <Chessboard
            id="PlayVsPlay"
            animationDuration={200}
            boardWidth={boardWidth}
            position={game.fen()}
            onPieceDrop={onDrop}
            customBoardStyle={{
              borderRadius: "4px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
            }}
            ref={chessboardRef}
          />
        </Container>
      </Col>
        <Col className="chessHeader">
          <Card className="cardShadow">
            <ListGroup>
              <ListGroup.Item>
                {/* <Timer time={{ hours: 0, minutes: 0, seconds: 10 }} /> */}
              </ListGroup.Item>
              <ListGroup.Item>
                <div style={{ textAlign: "center" }}>
                  {/* <h2>Score: {score}</h2> */}
                  <h4>hi
                    {/* {getSideToPlayFromFen(tactic.fen) === "b"
                      ? "White to Play"
                      : "Black to Play"} */}
                  </h4>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
  

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
  );
}
