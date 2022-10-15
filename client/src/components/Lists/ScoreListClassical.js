import React, { useState } from "react";
import { Link } from "react-router-dom";

const ScoreList = ({ scores }) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const arrayForSort = [...scores]
  const sortedScores = arrayForSort.sort((a,b) => {
    if (a.elo > b.elo){
      return -1
    } else {
      return 1
    }
  });


  return (
    <div className="puzzleleaderboard">
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Wallet</th>
            <th scope="col">HighScore</th>
          </tr>
        </thead>
        <tbody>
          {/* {scores.slice(0,10).map((score) => ( */}
          {sortedScores.slice().map((score) => (
            <tr className="lobbyRow" key={score.id}>
              <td>{score.wallet}</td>
              <td>{score.elo}</td>
            </tr>
          ))}
          {/* // ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreList;
