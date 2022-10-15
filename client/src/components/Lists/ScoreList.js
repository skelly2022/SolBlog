import React, {useState}  from "react";
import {Link} from 'react-router-dom';

const ScoreList = ({ scores }) => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar) 

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
          {scores.slice().map((score) => (
                    <tr className="lobbyRow" key={score.id}>
                      <td>{score.wallet}</td>
                      <td>{score.highScore}</td>
                    </tr>
                  ))}
          {/* // ))} */}
        </tbody>
      </table>
      </div>

     
  );
};

export default ScoreList;
