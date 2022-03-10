import React from "react";
import { Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import img from "../image/Smother-Mate-1.gif";

function TacticMenu() {
  return (
    <Container>
      <Col>
        <h1>Tactics Trainer</h1>
        <img src={img} alt={`TacticsTrainerImage`} />
      </Col>
      <Link className="btn btn-primary" to="/beginner">
        Beginner
      </Link>
    </Container>
  );
}

export default TacticMenu;
