import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import type { CorsOptions } from 'cors';


const app = express();

const allowedOrigins = ['http://localhost:4200'];

const corsOptions: CorsOptions = {
    origin: allowedOrigins,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/hello', (req: Request, res: Response) => {
    res.json({ message: 'Hello from Express backend with TypeScript' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
