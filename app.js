import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const SERVER_PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

const server = app.listen(SERVER_PORT, () => console.log(`Servidor online na porta: ${SERVER_PORT}`));