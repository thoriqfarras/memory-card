export async function fetchPokemons() {
  console.log('fetchPokemons is called');
  const response = await fetch('https://pokeapi.co/api/v2/pokemon-form/', {
    mode: 'cors',
  });
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error.message);
  }
  const pokemons = data.results;
  const promises = pokemons.map(async (pokemon) => {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.error.message);
    }
    return { name: data.name, img: data.sprites.front_default };
  });

  return Promise.all(promises);
}
