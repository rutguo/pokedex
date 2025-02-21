import express, { Application, Request, Response } from "express";
import { getPokemonById } from "./database/db";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

// Root response
app.get("/", (_req: Request, res: Response<{ message: string }>) => {
  res.json({ message: "Welcome to the Pokédex! 🎮" });
});

// Get Pokémon by ID
app.get("/pokemon/:id", async (req: Request, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid Pokémon ID" });
  }

  try {
    const pokemon = await getPokemonById(id);
    if (!pokemon) {
      return res.status(404).json({ error: "Pokémon not found" });
    }
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () =>
  console.log(`✅ Pokédex running at http://localhost:${PORT}`)
);
