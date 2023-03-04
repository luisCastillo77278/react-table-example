export const RickAndMortyAdapter = (results) => {
  return results.map(data => ({
    id: data.id,
    name: data.name,
    status: data.status,
    species: data.species,
    gender: data.gender,
    img: data.image
  }))
}