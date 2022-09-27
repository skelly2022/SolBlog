import React from 'react';

const ScoreList = ({ scores, title }) => {

  return (

<div className="gif-grid">
<h3>{title}</h3>
{scores.map((score) => (
  <div className="gif-item" key={score._id}>
    <p>{score.wallet}</p>
  </div>
))}
</div>
  );
};

export default ScoreList;
