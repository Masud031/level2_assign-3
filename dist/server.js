/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import dotenv from 'dotenv';
// dotenv.config();
// import mongoose from 'mongoose';
// mongoose.set('strictQuery', true);
// import app from './app';
// import { Server } from 'http';
// // import { connectDB } from './config/db';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// eslint-disable-next-line no-undef
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
// dotenv.config(); // Load .env file
// let server: Server;
// const port = process.env.PORT || 5000;
// // let server;
// const main = async () => {
//   try {
//       if (!process.env.DB_URI) {
//       throw new Error('Missing DB_URI in environment variables');
//     }
//     await mongoose.connect(process.env.DB_URI1 as string);
//     console.log(' Database connected successfully');
//     server= app.listen(port, () => {
//       console.log(` Server is running on port ${port}`);
//     });
//   } catch (error) {
//     console.error(' Database connection failed:', error);
//       process.exit(1);
//   }
// };
// main();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('strictQuery', true);
const app_1 = __importDefault(require("./app"));
let server;
let isConnected = false;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!isConnected && process.env.DB_URI) {
        yield mongoose_1.default.connect(process.env.DB_URI);
        isConnected = true;
        console.log('✅ MongoDB connected');
    }
});
// For Vercel
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectDB();
            return (0, app_1.default)(req, res);
        }
        catch (error) {
            console.error('MongoDB connection error:', error);
            res.status(500).send('Internal server error');
        }
    });
}
// For local development
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    connectDB().then(() => {
        server = app_1.default.listen(port, () => {
            console.log(`🚀 Server is running on http://localhost:${port}`);
        });
    });
}
