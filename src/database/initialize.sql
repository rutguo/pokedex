-- Create tables & relations
CREATE TABLE pokemon (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- (Many-to-Many)
CREATE TABLE pokemon_types (
    pokemon_id INT REFERENCES pokemon(id) ON DELETE CASCADE,
    type_id INT REFERENCES type(id) ON DELETE CASCADE,
    PRIMARY KEY (pokemon_id, type_id)
);

-- Add data
INSERT INTO pokemon (id, name) VALUES (1, 'Bulbasaur');
INSERT INTO type (name) VALUES ('Grass'), ('Poison');
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES 
    (1, (SELECT id FROM type WHERE name = 'Grass')),
    (1, (SELECT id FROM type WHERE name = 'Poison'));