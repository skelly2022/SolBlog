import React from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function TacticMenu() {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <h1>Puzzle Rush</h1>
      <Form.Group
        style={{ width: "40%" }}
        className="mb-3"
        controlId="formBasicEmail"
      >
        <Form.Control type="text" placeholder="Enter Name" />
      </Form.Group>
      <Link className="btn btn-primary" to="/beginner">
        Begin
      </Link>
    </Container>
  );
}

export default TacticMenu;
