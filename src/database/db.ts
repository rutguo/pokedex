import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export const getPokemonById = async (id: number) => {
  const query = `
    SELECT 
      p.id, 
      p.name, 
      json_agg(t.name) AS types
    FROM pokemon p
    JOIN pokemon_types pt ON p.id = pt.pokemon_id
    JOIN type t ON pt.type_id = t.id
    WHERE p.id = $1
    GROUP BY p.id, p.name;
  `;

  try {
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      return null; // No Pokémon found
    }
    return rows[0]; // JSON output with id, name and types-array
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    throw error;
  }
};
