import React from "react";
import { Container, Form, Card, ListGroup } from "react-bootstrap";
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
        <Card className="cardShadow">
          <ListGroup>
            <ListGroup.Item>
              <h3>Rules</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>
                You only get one chance, the game immediately ends once you get
                one incorrect.
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Solve as many as you can</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>You only have 5 mins.</h4>
            </ListGroup.Item>
          </ListGroup>
        </Card>
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
