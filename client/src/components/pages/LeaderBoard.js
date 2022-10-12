import React, {useState}  from "react";
import "../css/LeaderBoard.css";
import ScoreList from "../Lists/ScoreList";
import { useQuery } from "@apollo/client";
import { QUERY_SCORES } from "../../utils/queries";
import {Link} from 'react-router-dom';

function LeaderBoard () {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar) 

    const [classicalScore, setClassicalScore] = useState(false);

    const showClassicalScore = () => setClassicalScore(!classicalScore) ;

    const { loading, data } = useQuery(QUERY_SCORES);
    const scores = data?.scores || [];

    const renderClassical = async () => {
      showSidebar();
      setClassicalScore();
    };

    const renderUnderReview = async () => {
      showSidebar();
      setClassicalScore();
    };

    console.log(scores);
    console.log(sidebar);
    return (
      <>
        {loading ? (
          <div className="loader-wrapper">
            <div className="loader">
              <div className="loader loader-inner"></div>
            </div>
          </div>
        ) : (<div className="home">
    
        <div className="highscoresfeature">
        <div className="leaderboardheader">
           <h1>SolChess LeaderBoard</h1>
           <div className="leaderboardoptions">
           <Link to ="#" onClick={showSidebar}>
             <h4 className='leaderboard1'>Puzzle Rush</h4>
            
           </Link>
           <Link to ="#" className='' >
             <h4>Classical (Under Development)</h4>
           </Link>
           </div>
         </div>
        
         <div className="botdiv">
        {!sidebar && <ScoreList scores={scores}/>}
        {classicalScore && <ScoreList scores={scores}/>}
        </div>
        </div>
           </div>
        
       
        )}
      </>
    );
}

export default LeaderBoard;

