import React from "react";
import "../joinRoomLogic/CreateGame.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

// const socket = io.connect("http://localhost:5001");

function RoadMap(props) {

const reset = props.resetGame;
const submit = props.submit;


  // room state
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");

  const [messageRecieved, setMessageRecieved] = useState("");


  // const joinRoom = () => {
  //   if (room !== "") {
  //     socket.emit("join_room", room);
  //   }
  // };

  // const sendMessage = () => {
  //   socket.emit("send_message", { message, room });
  // };

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setMessageRecieved(data.message);
  //   });
  //   // eslint-disable-next-line
  // }, [socket]);

  return (
    <>
      <div className="createGame">

        <Modal show={true}  centered>
          <Modal.Header>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="1">
                <Form.Label>Time</Form.Label>
                <select id="time">
                  <option value="3">3+0</option>
                  <option value="5">5+0</option>
                  <option value="10">10+0</option>
                </select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="2">
                <Form.Label>Color</Form.Label>
                <Form.Select id="color">
                  <option value="1">White</option>
                  <option value="2">Black</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={reset}>
              Close
            </Button>
            <Button variant="primary" onClick={submit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default RoadMap;

// function RoadMap () {
//     const HTTP_BASE_URL = 'https://afternoon-peak-46279.herokuapp.com/https://en.lichess.org';
//     async function getNextTraining() {
//         fetch(`${HTTP_BASE_URL}/training/new?_${Date.now()}`, {
//           headers: {
//             Accept: 'application/vnd.lichess.v2+json',
//             'X-Requested-With': 'XMLHttpRequest',
//           },
//         })
//           .then(res => res.json())
//           .then(res => console.log(res));
//       }

//       getNextTraining();
//     return (
//         <div className="home">
//             <h1>RoadMap</h1>
//         </div>
//     )
// }
