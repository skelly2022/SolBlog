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
      <div className="Intro">
        <h1 className="introText">Puzzle Rush</h1>
        <Form.Group
          style={{ width: "60%", marginTop: "20px" }}
          className="mb-3"
          controlId="formBasicEmail"
        >
          <Form.Control type="text" placeholder="Enter Name" />
        </Form.Group>
        <Link
          style={{ width: "30%" }}
          className="btn btn-primary"
          to="/beginner"
        >
          Begin
        </Link>
      </div>
    </Container>
  );
}

export default TacticMenu;
