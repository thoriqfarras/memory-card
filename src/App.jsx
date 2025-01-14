import { useState, useEffect } from 'react';
import './index.css';
import { fetchPokemons } from './api';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons().then((pokemons) => {
      setPokemons(pokemons);
    });
  }, []);

  return (
    <div className="bg-green-900 h-screen w-screen flex flex-col font-pixel text-zinc-100">
      <h1 className="text-2xl outlined self-center">Memory Card</h1>
      <div className="flex gap-4 justify-center items-center outlined">
        <p>Score: {score}</p>
        <p>Best: {bestScore}</p>
      </div>
      <CardGrid
        pokemons={pokemons}
        setScore={setScore}
        setPokemons={setPokemons}
      />
    </div>
  );
}

function CardGrid({ pokemons, setScore, setPokemons }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(
      pokemons.map((pokemon) => (
        <Card
          key={pokemon.name}
          pokemonName={pokemon.name}
          pokemonSprite={pokemon.img}
          setScore={setScore}
          pokemons={pokemons}
          setPokemons={setPokemons}
        />
      ))
    );
    console.log('Grid rendering');
  }, [pokemons]);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] p-20 gap-8">
      {cards}
    </div>
  );
}

function Card({ pokemonName, pokemonSprite, setScore, setPokemons, pokemons }) {
  function shuffle(array) {
    array = [...array];
    let m = array.length;
    let t = 0;
    let i = 0;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    console.log('array is shuffled');
    return array;
  }

  return (
    <div
      className="flex flex-col gap-2 hover:cursor-pointer"
      onClick={() => {
        setScore((score) => score + 1);
        const shuffled = shuffle(pokemons);
        setPokemons(shuffled);
      }}
    >
      <img
        src={pokemonSprite}
        alt={`image of ${pokemonName}`}
        className="border-2 border-black rounded-md h-20 w-20"
      />
      <p className="self-center">{pokemonName}</p>
    </div>
  );
}

export default App;
