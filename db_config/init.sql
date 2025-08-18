CREATE TABLE IF NOT EXISTS pokemon (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE,
    types TEXT,
    abilities TEXT,
    weight INTEGER,
    height INTEGER,
    url TEXT
);
