import React from "react";
import { Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function TacticMenu() {
  return (
    <Container>
      <Col className="menuHeader">
        <h1>Tactics Trainer</h1>
      </Col>

      <Link className="btn btn-primary" to="/beginner">
        Begin
      </Link>
    </Container>
  );
}

export default TacticMenu;
