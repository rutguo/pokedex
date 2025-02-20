import express, { Application, Request, Response } from "express";
import { Pokemon } from "./data/types";
import { pokemon } from "./data/pokemon";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

const app: Application = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Root response
app.get("/", (_req: Request, res: Response<{ message: string }>) => {
  res.json({ message: "Welcome to the Pokédex! 🎮" });
});

// Get all Pokémon
app.get("/pokemon", (_req: Request, res: Response<Pokemon[]>) => {
  res.json(pokemon);
});

// Get Pokémon by ID
app.get(
  "/pokemon/:id",
  (
    req: Request<{ id: string }>,
    res: Response<Pokemon | { error: string }>
  ) => {
    const pokemonId = parseInt(req.params.id, 10);

    if (isNaN(pokemonId)) {
      return res.status(400).json({ error: "Invalid Pokémon ID" });
    }

    const p = pokemon.find((p: Pokemon) => p.id === pokemonId);

    if (!p) {
      return res.status(404).json({ error: "Pokémon not found" });
    }

    return res.json(p);
  }
);

// Start the server
app.listen(PORT, () =>
  console.log(`✅ Pokédex running at http://localhost:${PORT}`)
);
