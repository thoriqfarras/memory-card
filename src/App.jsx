import { useState, useEffect } from 'react';
import './index.css';
import { fetchPokemons } from './api';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [clicked, setClicked] = useState([]);

  useEffect(() => {
    fetchPokemons().then((pokemons) => {
      setPokemons(pokemons);
    });
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col font-pixel text-zinc-100">
      <h1 className="text-2xl outlined self-center">MEMORY GAME</h1>
      <div className="flex gap-4 justify-center items-center outlined">
        <p>Score: {score}</p>
        <p>Best: {bestScore}</p>
      </div>
      {score === 20 ? (
        <p className="outlined self-center mt-4">
          You memorized 20 out of 20! Well done!
        </p>
      ) : null}
      <CardGrid
        pokemons={pokemons}
        setPokemons={setPokemons}
        clicked={clicked}
        setClicked={setClicked}
        score={score}
        setScore={setScore}
        setBestScore={setBestScore}
      />
      <Footer />
    </div>
  );
}

function CardGrid({
  pokemons,
  setPokemons,
  clicked,
  setClicked,
  score,
  setScore,
  setBestScore,
}) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(
      pokemons.map((pokemon) => (
        <Card
          key={pokemon.name}
          pokemonName={pokemon.name}
          pokemonSprite={pokemon.img}
          pokemons={pokemons}
          setPokemons={setPokemons}
          clicked={clicked}
          setClicked={setClicked}
          score={score}
          setScore={setScore}
          setBestScore={setBestScore}
        />
      ))
    );
    console.log('Grid rendering');
  }, [pokemons]);

  console.log(clicked);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] px-20 mt-4 gap-8 place-items-center">
      {cards}
    </div>
  );
}

function Card({
  pokemonName,
  pokemonSprite,
  pokemons,
  setPokemons,
  clicked,
  setClicked,
  score,
  setScore,
  setBestScore,
}) {
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

  function handleCardClick() {
    if (!clicked.includes(pokemonName)) {
      setScore((score) => score + 1);
      setClicked((clicked) => [...clicked, pokemonName]);
      setBestScore((bestScore) => (score >= bestScore ? score + 1 : bestScore));
    } else {
      setScore(0);
      setClicked([]);
    }
  }

  return (
    <div
      className="flex flex-col gap-2 hover:cursor-pointer rounded-md bg-zinc-800 border-2 border-zinc-900 w-full h-full items-center p-2"
      onClick={() => {
        handleCardClick();
        const shuffled = shuffle(pokemons);
        setPokemons(shuffled);
      }}
    >
      <img
        src={pokemonSprite}
        alt={`image of ${pokemonName}`}
        className="border-2 border-black rounded-md h-20 w-20 bg-zinc-200 justify-self-center"
      />
      <p>{pokemonName}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="self-center py-4">
      <p>Thoriq Farras &copy; {`${new Date().getFullYear()}`}</p>
    </footer>
  );
}

export default App;
