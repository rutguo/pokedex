export interface Pokemon {
  id: number;
  name: string;
  type: string;
  stats: Statistics;
}

export interface Statistics {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}
