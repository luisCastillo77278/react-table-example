import { RickAndMortyAdapter } from "../adapters/rm.adapters";
export const getRickAndMorty = async () => {
  const resp = await fetch('https://rickandmortyapi.com/api/character').then(resp => resp.json());
  return RickAndMortyAdapter(resp.results);
}