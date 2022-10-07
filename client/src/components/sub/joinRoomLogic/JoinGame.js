import React from "react";
import "../joinRoomLogic/JoinGame.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function JoinGame(props) {
  const reset = props.resetGame;
  const submit = props.submit;

  console.log(props);

  // room state
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");

  const [messageRecieved, setMessageRecieved] = useState("");

  return (
    <>
      <div className="createGame">
        <Modal show={true} centered>
          <Modal.Header>
            <Modal.Title>Join Game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="1">
                <Form.Label>Room Number</Form.Label>
                <input id="roomnumber" type="text" className="color" maxLength="4"/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={reset}>
              Close
            </Button>
            <Button variant="primary" onClick={submit}>
              Join Game
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default JoinGame;
