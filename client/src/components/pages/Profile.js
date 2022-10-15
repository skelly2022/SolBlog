import React, { useState, useEffect,  } from "react";
import { useLocation } from 'react-router-dom'
import "../css/Profile.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ROOMS, QUERY_SCORE, QUERY_SCORES } from "../../utils/queries";
import { UPDATE_USERNAME } from "../../utils/mutations";

   // const location = useLocation();
    // const { wallet } = location.state;

    // console.log(wallet);

export default function Profile(props) {
    // const location = useLocation();
    // const { from } = location.state;

    // console.log(from);

  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("wallet")
  );
  //   const [formState, setFormState] = useState({ wallet: "" });
  const [currentUserName, setcurrentUserName] = useState("");
  //   const [highScore, setHighScore] = useState();
  //   const [elo, setElo] = useState();
  const [state, setState] = useState(0);
  const [loading, setLoading] = useState(true);

  // queries
  const cat = localStorage.getItem("wallet");

  const adding = { wallet: cat };
  const { data } = useQuery(QUERY_SCORE, {
    variables: { ...adding },
  });
  const x = data;

  //   console.log(data.score.UserName);

  //mutation

  const [addUserName, { playerData }] = useMutation(UPDATE_USERNAME, {
    onCompleted: (playerData) => {
      setcurrentUserName(playerData.addUserName.userName);
    },
  });

  const changeState = () => setState(1);
  const changeState0 = () => setState(0);

  const newUsername = () => {
    const uName = document.getElementById("roomnumber");
    const uNameOfficial = uName.value.toString();
    var newUserN = { wallet: walletAddress, userName: uNameOfficial };
    postUserName(newUserN);
    changeState0();
  };

  const postUserName = async (newUser) => {
    try {
      const { data } = await addUserName({
        variables: { ...newUser },
      });
    } catch (err) {
      if (err) throw err.message;
      console.log(err.message);
    }
  };

  const renderSetUserName = () => (
    <div className="body">
      <Modal show={true} centered className="modal">
        <Form>
          <Form.Group className="mb-3" controlId="1">
            <input
              id="roomnumber"
              placeholder="Enter Username:"
              type="text"
              className="color"
              maxLength="10"
            />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={changeState0}>
            Close
          </Button>
          <Button variant="primary" onClick={newUsername}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

  const renderProfile = () => (
    <div className="body">
      <div className="profileSection p-4">
        <div className="profileCard">
          <button className="btn btn-secondary">
            <img
              src="https://i.imgur.com/wvxPV9S.png"
              height="100"
              width="100"
            />
          </button>
          <h1 className="wallet">{currentUserName}</h1>
          <button className="btn1" onClick={changeState}>
            Set Username
          </button>
          <h4 className="wallet">{data.score.wallet}</h4>
          <div>
            <h6>Joined: {data.score.createdAt.slice(0, 15)}</h6>
          </div>
        </div>
      </div>
      <div className="scoresContainer">
        <div className="scoreContainer">
          <h1>Puzzle Rush HighScore</h1>
          <h4>Rating:{data.score.highScore}</h4>
        </div>
        <div className="scoreContainer">
          <h1>Classical HighScore</h1>
          <h4>Rating:{data.score.elo}</h4>
        </div>
      </div>
    </div>
  );

  async function getInfo() {
    setInterval(() => {
      setLoading(false);
    }, 300);
  }

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    if (!loading) {
      setcurrentUserName(data.score.userName);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="body">
        <div className="loading-wrapper">
          <div className="spinner-border"></div>
        </div>
      </div>
    );
  }
  if (!loading && state === 0)
    return <div className="body">{renderProfile()}</div>;
  if (!loading && state === 0)
    return <div className="body">{renderProfile()}renderSetUserName</div>;
  if (!loading && state === 1)
    return <div className="body">{renderSetUserName()}</div>;
}
