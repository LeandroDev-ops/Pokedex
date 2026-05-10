import axios from "axios";

export async function getPokemons(limit = 20, offset = 0) {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  return response.data;
}

export async function getPokemonDetails(name: string) {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );

  return response.data;
}