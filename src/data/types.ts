export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  stats: Statistics;
}

interface Statistics {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}
