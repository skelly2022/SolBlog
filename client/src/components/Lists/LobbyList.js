import React, { useState } from "react";
import { Link } from "react-router-dom";

const LobbyList = ({ lobbyData, submit }) => {

  return (
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
          <tr className="lobbyRow" key="{room.id}">
              <td key="{room.id}">1</td>
              <td>{room.wallet}</td>
              <td>{room.roomNumber}</td>
              <td><Link onClick ={submit}>Hey</Link></td>
            </tr> 
           ))}
        </tbody>
      </table>
    </div>
  );
};

export default LobbyList;
