import React, { useState } from "react";

const Game = () => {
  const [health, setHealth] = useState(50);
  const [points, setPoints] = useState(0);

  const feedPet = () => {
    if (points >= 10) {
      setHealth(health + 10);
      setPoints(points - 10);
    } else {
      alert("Not enough points to feed the pet!");
    }
  };

  const waterPet = () => {
    if (points >= 5) {
      setHealth(health + 5);
      setPoints(points - 5);
    } else {
      alert("Not enough points to water the pet!");
    }
  };

  const playWithPet = () => {
    if (points >= 15) {
      setHealth(health + 20);
      setPoints(points - 15);
    } else {
      alert("Not enough points to play with the pet!");
    }
  };

  return (
    <div>
      <h1>Virtual Pet Game</h1>
      <div>
        <img src="packages/client/public/x2/Pig_Up@2x.png" alt="Pet" />
      </div>
      <div>
        <h2>Health: {health}</h2>
        <h2>Points: {points}</h2>
      </div>
      <div>
        <button onClick={feedPet}>Feed</button>
        <button onClick={waterPet}>Water</button>
        <button onClick={playWithPet}>Play</button>
      </div>
    </div>
  );
};

export default Game;
