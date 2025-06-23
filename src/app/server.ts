import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import app from './app';
// import { connectDB } from './config/db';

dotenv.config(); // Load .env file

const port = process.env.PORT || 5000;
let server;

const main = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.log(' Database connected successfully');

    server = app.listen(port, () => {
      console.log(` Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(' Database connection failed:', error);
  }
};

main();
