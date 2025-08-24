"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBorrowedBooksById = exports.returnBook = exports.getAllBorrowedBooks = exports.borrowBook = void 0;
// import Borrow from '../models/borrow.model';
const Borrow_model_1 = __importDefault(require("../models/Borrow.model"));
// Borrow a book
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowed = new Borrow_model_1.default(req.body);
        yield borrowed.save();
        // Manually pick only required fields
        const responseData = {
            _id: borrowed._id,
            book: borrowed.book,
            quantity: borrowed.quantity,
            dueDate: borrowed.dueDate,
            createdAt: borrowed.createdAt,
            updatedAt: borrowed.updatedAt,
        };
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: responseData,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to borrow book',
            error,
        });
    }
});
exports.borrowBook = borrowBook;
// Get all borrowed books
const getAllBorrowedBooks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Borrow_model_1.default.find();
        res.status(200).json({ data });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch borrowed books', error });
    }
});
exports.getAllBorrowedBooks = getAllBorrowedBooks;
// Return a borrowed book
const returnBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield Borrow_model_1.default.findByIdAndDelete(id);
        if (!deleted) {
            res.status(404).json({ message: 'Borrowed record not found' });
        }
        res.status(200).json({ message: 'Book returned successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to return book', error });
    }
});
exports.returnBook = returnBook;
// Get a single borrowed book by ID
const getAllBorrowedBooksById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const borrowed = yield Borrow_model_1.default.findById(id);
        if (!borrowed) {
            res.status(404).json({
                success: false,
                message: 'Borrowed record not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Borrowed record fetched successfully',
            data: borrowed,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch borrowed record',
            error,
        });
    }
});
exports.getAllBorrowedBooksById = getAllBorrowedBooksById;
