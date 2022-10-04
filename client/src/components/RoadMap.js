import React from "react";
import "./css/RoadMap.css";
import axios from "axios";

function RoadMap () {
    const elo = 1700;
    async function fetchTactic() {

  

        const res = await axios.post(
          `https://afternoon-peak-46279.herokuapp.com/https://chessblunders.org/api/blunder/get`,
          {
            type: "explore",
          }
        );
      
        const data = res.data.data;
        // console.log(data.elo);

    console.log(data);
      }
      
      fetchTactic();
    return (
        <div className="home">
            <h1>RoadMap</h1>
        </div>
    )
}

export default RoadMap;

// function RoadMap () {
//     const HTTP_BASE_URL = 'https://afternoon-peak-46279.herokuapp.com/https://en.lichess.org';
//     async function getNextTraining() {
//         fetch(`${HTTP_BASE_URL}/training/new?_${Date.now()}`, {
//           headers: {
//             Accept: 'application/vnd.lichess.v2+json',
//             'X-Requested-With': 'XMLHttpRequest',
//           },
//         })
//           .then(res => res.json())
//           .then(res => console.log(res));
//       }
      
//       getNextTraining();
//     return (
//         <div className="home">
//             <h1>RoadMap</h1>
//         </div>
//     )
// }