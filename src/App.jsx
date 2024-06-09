import { useState } from 'react';
import './index.css';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <div className="bg-green-900 h-screen w-screen flex flex-col font-pixel text-zinc-100">
      <h1 className="text-2xl outlined self-center">Memory Card</h1>
      <div className="flex gap-4 justify-center items-center outlined">
        <p>Score: {score}</p>
        <p>Best: {bestScore}</p>
      </div>
      <CardGrid />
    </div>
  );
}

function CardGrid() {
  const cards = [];
  for (let i = 0; i < 20; i += 1) {
    cards.push(<Card />);
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] p-20 gap-8">
      {cards}
    </div>
  );
}

function Card() {
  return (
    <div className="flex flex-col gap-2">
      <img
        src="/"
        alt="Pokemon image"
        className="border-2 border-black rounded-md h-10"
      />
      <p className="self-center">Pokemon Name</p>
    </div>
  );
}

export default App;
