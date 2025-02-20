import { Pokemon } from "./types";

export const pokemon: Pokemon[] = [
  {
    id: 1,
    name: "Bulbasaur",
    type: ["grass", "poison"],
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45,
    },
  },
  {
    id: 2,
    name: "Ivysaur",
    type: ["grass", "poison"],
    stats: {
      hp: 60,
      attack: 62,
      defense: 63,
      specialAttack: 80,
      specialDefense: 80,
      speed: 60,
    },
  },
];
