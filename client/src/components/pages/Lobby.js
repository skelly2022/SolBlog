import React, { useState } from "react";
import "../css/Lobby.css";
import LobbyList from "../Lists/LobbyList";
import { useQuery } from "@apollo/client";
import { QUERY_ROOMS, QUERY_SCORES } from "../../utils/queries";
import { Link } from "react-router-dom";

// const socket = io.connect("");
// const socket = io.connect("http://localhost:5001");

export default function Lobby(props) {
  console.log(props);

  const { loading, data } = useQuery(QUERY_ROOMS);
  const lobbyData = data?.rooms || [];

  console.log(lobbyData);

// const getRoomNumber = (x) => {
//   // const roomNumber = document.getElementById("roomnumber").value;
//   console.log(x);
//   props.submit(x)
// }

  return (
    <>
      {loading ? (
        <div className="loader-wrapper">
          <div className="loader">
            <div className="loader loader-inner"></div>
          </div>
        </div>
      ) : (
        <div className="lobbyhome">
          <div className="lobbyheader2">
            <h1>Lobby</h1>
          </div>

          <div className="lobbydiv">
            <div className="lobby">
              <table className="table table-dark ">
                <thead>
                  <tr>
                    <th scope="col">Color</th>
                    <th scope="col">Wallet</th>
                    <th scope="col">Room Number</th>
                    <th scope="col">Join</th>
                  </tr>
                </thead>
                <tbody className="gameBody">
                  {lobbyData.slice().map((room) => (
                    <tr className="lobbyRow" key={room.id}>
                      <td>1</td>
                      <td>{room.wallet}</td>
                      <td id="roomnumber" value={room.roomNumber}>{room.roomNumber}</td>
                      <td>
                        <Link onClick>Hey</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
