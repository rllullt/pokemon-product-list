import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import type { CorsOptions } from 'cors';
import { query } from './db';

const app = express();

const allowedOrigins = ['http://localhost', 'http://localhost:4200'];

const corsOptions: CorsOptions = {
    origin: allowedOrigins,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

type Item = {
    id: number;
    name: string;
    types: string;
    abilities: string;
    weight: number;
    height: number;
    url: string;
};

// Repository for repository pattern
interface ItemRepository {
    itemTable: string;
    addItem(item: Item): Promise<void>;
    getItemById(id: number): Promise<Item | null>;
    getAllItems(): Promise<Item[]>;
    updateItem(item: Item): Promise<void>;
    deleteItem(id: number): Promise<void>;
}

// Repository
class PostgresPokemonRepository implements ItemRepository {
    itemTable = 'pokemon';
    async addItem(item: Item): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async getItemById(id: number): Promise<Item | null> {
        try {
            const result = await query(`SELECT * FROM ${this.itemTable} WHERE id = $1`, [id]);
            return result.rows[0] || null;
        }
        catch (error) {
            console.error('Error fetching item:', error);
            return null;
        }
    }
    async getAllItems(): Promise<Item[]> {
        try {
            const result = await query(`SELECT * FROM ${this.itemTable}`);
            return result.rows;
        }
        catch (error) {
            console.error('Error fetching items:', error);
            return [];
        }
    }
    async updateItem(item: Item): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async deleteItem(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

app.locals.itemRepository = new PostgresPokemonRepository();

app.get('/api/hello', (req: Request, res: Response) => {
    res.json({ message: 'Hello from Express backend with TypeScript' });
});

app.get('/api/pokemons', async (req: Request, res: Response) => {
    try {
        const items = await app.locals.itemRepository.getAllItems() || null;
        res.json(items);
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/pokemons/:id', async (req: Request, res: Response) => {
    if (req.params.id === undefined) {
        return res.status(400).json({ error: 'ID parameter is required' });
    }

    const id = parseInt(req.params.id, 10);
    try {
        const item = await app.locals.itemRepository.getItemById(id);
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error('Error fetching pokemon:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
