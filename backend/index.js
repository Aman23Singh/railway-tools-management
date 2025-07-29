import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import './Models/db.js';
import AuthRoutes from './Routes/AuthRouter.js';
import TodoRoutes from './Routes/TodoRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/', AuthRoutes);
app.use('/', TodoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
