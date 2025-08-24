/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_route_1 = __importDefault(require("../src/routs/book.route"));
const borrow_route_1 = __importDefault(require("../src/routs/borrow.route"));
// import path from 'path';
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/books', book_route_1.default);
app.use('/api/borrow', borrow_route_1.default);
// app.use('/api', borrowRoutes);
app.get('/', (req, res) => {
    res.send('Server is working!');
});
// app.use('/favicon.ico', 
//   express.static(path.join(__dirname, 'public', 'favicon.ico')));
// Global Error Handling Middleware
// Global Error Handling Middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    console.error(err); // for debugging
    if (err.name === 'ValidationError') {
        res.status(400).json({
            success: false,
            message: 'Validation failed',
            error: err,
        });
    }
    else {
        res.status(err.status || 500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
exports.default = app;
