"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pokemon_1 = require("./data/pokemon");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 3000;
// Root response
app.get("/", (_req, res) => {
    res.json({ message: "Welcome to the Pokédex! 🎮" });
});
// Get all Pokémon
app.get("/pokemon", (_req, res) => {
    res.json(pokemon_1.pokemon);
});
// Get Pokémon by ID
app.get("/pokemon/:id", (req, res) => {
    const pokemonId = parseInt(req.params.id, 10);
    if (isNaN(pokemonId)) {
        return res.status(400).json({ error: "Invalid Pokémon ID" });
    }
    const p = pokemon_1.pokemon.find((p) => p.id === pokemonId);
    if (!p) {
        return res.status(404).json({ error: "Pokémon not found" });
    }
    return res.json(p);
});
// Start the server
app.listen(PORT, () => console.log(`✅ Pokédex running at http://localhost:${PORT}`));
