import React, {useState}  from "react";
import {Link} from 'react-router-dom';

const ScoreList = ({ scores }) => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar) 

  console.log(scores);
  

  return (

    <div className="puzzleleaderboard">
    
      <table className="table table-dark">
        
        <thead>
          <tr>
          <th scope="col">Rank</th>
            <th scope="col">Wallet</th>
            <th scope="col">HighScore</th>
          </tr>
        </thead>
        <tbody>
          {/* {scores.slice(0,10).map((score) => ( */}
            <tr>
                <td>1</td>
              <td>{scores[0].wallet}</td>
              <td>{scores[0].highScore}</td>
            </tr>
            <tr>
                <td>2</td>
              <td>{scores[1].wallet}</td>
              <td>{scores[1].highScore}</td>
            </tr>
            <tr>
                <td>3</td>
              <td>{scores[2].wallet}</td>
              <td>{scores[2].highScore}</td>
            </tr>
            <tr>
                <td>4</td>
              <td>{scores[3].wallet}</td>
              <td>{scores[3].highScore}</td>
            </tr>
            <tr>
                <td>5</td>
              <td>{scores[4].wallet}</td>
              <td>{scores[4].highScore}</td>
            </tr>
            <tr>
                <td>6</td>
              <td>{scores[5].wallet}</td>
              <td>{scores[5].highScore}</td>
            </tr>
            <tr>
                <td>7</td>
              <td>{scores[6].wallet}</td>
              <td>{scores[6].highScore}</td>
            </tr>
            <tr>
                <td>8</td>
              <td>{scores[7].wallet}</td>
              <td>{scores[7].highScore}</td>
            </tr>
            <tr>
                <td>9</td>
              <td>{scores[8].wallet}</td>
              <td>{scores[8].highScore}</td>
            </tr>
            <tr>
                <td>10</td>
              <td>{scores[9].wallet}</td>
              <td>{scores[9].highScore}</td>
            </tr>
          {/* // ))} */}
        </tbody>
      </table>
      </div>

     
  );
};

export default ScoreList;
