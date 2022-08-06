import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouters from './lib/routers/usersRouters.js';
import urlsRouters from './lib/routers/urlsRouters.js';
import rankingRouters from './lib/routers/rankingRouters.js';

dotenv.config();

const SERVER_PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use(usersRouters);
app.use('/urls', urlsRouters);
app.use('/ranking', rankingRouters);

const server = app.listen(SERVER_PORT, () => console.log(`Servidor online na porta: ${SERVER_PORT}`));