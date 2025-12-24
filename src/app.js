import express from 'express';
import authRoutes from './modules/auth.routes.js';
const app = express();
import CookieParser from 'cookie-parser';
import { sessionMiddleware } from './config/session.js';

//Middlewares

//to parse JSON req/Data
app.use(express.json({ limit: '12 kb' }));
app.use(sessionMiddleware());
app.use(CookieParser());

//Routes
app.use('/auth', authRoutes);

export { app };