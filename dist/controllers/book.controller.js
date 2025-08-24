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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getAllBooks = void 0;
const Book_models_1 = require("../../src/models/Book.models");
// Enhanced Get all books with filter, sort, limit, pagination
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destructure query params with defaults
        console.log('Received query params:', req.query);
        const { filter, // e.g. genre filter like 'FANTASY'
        sortBy = 'createdAt', // sort field, default 'createdAt'
        sort = 'desc', // sort direction, default descending
        limit = '10', // limit results, default 10
        page = '1', // pagination page number, default 1
         } = req.query;
        // Build filter query object
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        // Calculate pagination values
        const limitNumber = parseInt(limit, 10);
        const pageNumber = parseInt(page, 10);
        const skip = (pageNumber - 1) * limitNumber;
        // Build sort object
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sortOptions = {};
        sortOptions[sortBy] = sort === 'asc' ? 1 : -1;
        console.log('MongoDB query:', query);
        console.log('Sort options:', sortOptions);
        console.log('Pagination - limit:', limitNumber, 'page:', pageNumber);
        // Fetch books with filtering, sorting, pagination
        const books = yield Book_models_1.Book.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNumber);
        // Optionally: get total count for pagination info
        const totalBooks = yield Book_models_1.Book.countDocuments(query);
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books,
            pagination: {
                total: totalBooks,
                page: pageNumber,
                pages: Math.ceil(totalBooks / limitNumber),
                limit: limitNumber,
            },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.error('Error in getAllBooks:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching books',
            error: error.message,
        });
    }
});
exports.getAllBooks = getAllBooks;
// The rest of your code stays unchanged:
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book_models_1.Book.findById(req.params.id);
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching book',
            error: error.message,
        });
    }
});
exports.getBookById = getBookById;
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = yield Book_models_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: newBook,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBook = yield Book_models_1.Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating book',
            error: error.message
        });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBook = yield Book_models_1.Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                data: null
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: null
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting book',
            error: error.message,
            data: null
        });
    }
});
exports.deleteBook = deleteBook;
// module.exports = {
//   getAllBooks,
//   createBook,
//   updateBook,
//   deleteBook,
//   getBookById,
// };
