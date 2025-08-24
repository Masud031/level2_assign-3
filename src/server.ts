
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
import app from './app';
import { Server } from 'http';
// import { connectDB } from './config/db';

dotenv.config(); // Load .env file

let server: Server;
const port = process.env.PORT || 5000;
 
// let server;


const main = async () => {
  try {

      if (!process.env.DB_URI) {
      throw new Error('Missing DB_URI in environment variables');
    }
    await mongoose.connect(process.env.DB_URI as string);
    console.log(' Database connected successfully');

    server= app.listen(port, () => {
      console.log(` Server is running on port ${port}`);
    });
    
  } catch (error) {
    console.error(' Database connection failed:', error);
      process.exit(1);
  }
};

main();

