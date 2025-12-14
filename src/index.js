import dotenv from 'dotenv';
dotenv.config();
import { app } from './app.js';
import connectDB from './config/db.js';


connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`server is running at PORT: ${process.env.PORT}`);
    });
});