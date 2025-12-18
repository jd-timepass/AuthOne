import express from 'express';
import authRoutes from './modules/auth.routes.js';
const app = express();

//Middlewares

//to parse JSON req/Data
app.use(express.json({ limit: '12 kb' })); 


//Routes
app.use('/auth', authRoutes);

export { app };