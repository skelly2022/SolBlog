import React from "react";

const ScoreList = ({ scores }) => {
  return (
    <div className="highscoresfeature">
      <div className="leaderboardheader">
        <h1>LeaderBoard</h1>
      </div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Wallet</th>
            <th scope="col">HighScore</th>
          </tr>
        </thead>
        <tbody>
          {scores.slice(0,5).map((score) => (
            <tr key={score._id}>
              <td>{score.wallet}</td>
              <td>{score.highScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreList;
