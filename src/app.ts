import express, { Application, Request, Response } from "express";
import { Pokemon } from "./data/types";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";

// Load environment variables
dotenv.config();

const app: Application = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Load Pokémon data from JSON file
const pokemonDataPath = path.join(__dirname, "../src/data/pokemon.json");
const pokemonData: Pokemon[] = JSON.parse(
  fs.readFileSync(pokemonDataPath, "utf-8")
);

// Root response
app.get("/", (_req: Request, res: Response<{ message: string }>) => {
  res.json({ message: "Welcome to the Pokédex! 🎮" });
});

// Get all Pokémon
app.get("/pokemon", (req: Request, res: Response<Pokemon[]>) => {
  res.json(pokemonData);
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

    const pokemon = pokemonData.find((p) => p.id === pokemonId);

    if (!pokemon) {
      return res.status(404).json({ error: "Pokémon not found" });
    }

    return res.json(pokemon);
  }
);

app.listen(PORT, () =>
  console.log(`Pokédex running at http://localhost:${PORT}`)
);
