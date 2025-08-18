const { Client } = require("pg");

async function main() {
    const client = new Client({
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || "product_explorer_user",
        password: process.env.DB_PASSWORD || "explorer",
        database: process.env.DB_NAME || "product_explorer_db",
    });

    await client.connect();

    try {
        for (let i = 1; i <= 10; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            await fetch(url).then(res => res.json()).then(async pokemon => {
                const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                const types = pokemon.types.map(t => t.type.name).reduce((acc, type) => acc + "," + type);
                const abilities = pokemon.abilities.map(a => a.ability.name).reduce((acc, ability) => acc + "," + ability);
                const weight = pokemon.weight;
                const height = pokemon.height;
                
                await client.query(
                    `INSERT INTO pokemon(name, types, abilities, weight, height, url)
                     VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING`,
                    [name, types, abilities, weight, height, url]
                );
                
                console.log("add pokemon: ", {
                    "name": name,
                    "types": types,
                    "abilities": abilities,
                    "weight": weight,
                    "height": height,
                    "url": url,
                });
            });
        }
    }
    catch (err) {
        console.log("Error while fetching pokemons to populate database:", err);
    }
    finally {
        await client.end();
    }
}

main();

