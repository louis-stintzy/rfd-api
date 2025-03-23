import express, { Request, Response } from 'express';
import router from './routes';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();
const app = express();
const port = process.env.PORT ?? 3000;
const allowedOrigins = (process.env.CORS_ORIGIN ?? '')
  .split(',')
  .map((origin) => origin.trim());

app.use(
  // ajouter middleware pour personnalisé ( if (req.headers !== process.env.CORS_ORIGIN) {)...)
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS': ${origin}`));
      }
    },
    credentials: true, // allow session cookie from browser to pass through
  })
);

// Analyser les requêtes entrantes avec des données JSON (remplace body-parser)
app.use(express.json());

// Permettre l'utilisation de la methode POST
app.use(express.urlencoded({ extended: true }));

// Route '/', route de bienvenue
app.get('/', (_: Request, res: Response) => {
  res.send('Welcome to the Reusable Form Demo Backend !');
});

// Routes '/api', router
app.use('/api', router);

// Gestion des erreurs 404
app.use((req: Request, res: Response) => {
  res.status(404).send('Not Found');
});

// Gestion des erreurs
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
