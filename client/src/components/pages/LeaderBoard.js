import React, { useState } from "react";
import "../css/LeaderBoard.css";
import ScoreList from "../Lists/ScoreList";
import ScoreListClassical from "../Lists/ScoreListClassical";
import { useQuery } from "@apollo/client";
import { QUERY_SCORES } from "../../utils/queries";
import { Link } from "react-router-dom";

function LeaderBoard() {
  const [sidebar, setSidebar] = useState(true);
  const [classicalScore, setClassicalScore] = useState(true);
  const showClassicalScore = () => setClassicalScore(!classicalScore);
  const { loading, data } = useQuery(QUERY_SCORES);
  
  const scores = data?.scores || [];

  const renderClassical = async () => {
    setSidebar(true);
    setClassicalScore(false);
 
  };

  const renderPuzzle = async () => {
    setClassicalScore(true);
    setSidebar(false);
  };

  return (
    <>
      {loading ? (
        <div className="loader-wrapper">
          <div className="loader">
            <div className="loader loader-inner"></div>
          </div>
        </div>
      ) : (
        <div className="home">
          <div className="highscoresfeature">
            <div className="leaderboardheader">
              <h1>SolChess LeaderBoard</h1>
              <div className="leaderboardoptions">
                <Link to="#" onClick={renderPuzzle}>
                  <h4 className="leaderboard1">Puzzle Rush</h4>
                </Link>
                <Link to="#" className="" onClick={renderClassical}>
                  <h4>Classical (Under Development)</h4>
                </Link>
              </div>
            </div>

            <div className="botdiv">
              {!sidebar && <ScoreList scores={scores} />}
              {!classicalScore && <ScoreListClassical scores={scores} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LeaderBoard;
