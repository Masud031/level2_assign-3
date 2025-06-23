import { Request, Response, NextFunction } from 'express';
import { Book } from '../../src/models/Book.models';

// Enhanced Get all books with filter, sort, limit, pagination
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    // Destructure query params with defaults
    const {
      filter,         // e.g. genre filter like 'FANTASY'
      sortBy = 'createdAt', // sort field, default 'createdAt'
      sort = 'desc',  // sort direction, default descending
      limit = '10',   // limit results, default 10
      page = '1',     // pagination page number, default 1
    } = req.query;

    // Build filter query object
    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    // Calculate pagination values
    const limitNumber = parseInt(limit as string, 10);
    const pageNumber = parseInt(page as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // Build sort object
    const sortOptions: any = {};
    sortOptions[sortBy as string] = sort === 'asc' ? 1 : -1;

    // Fetch books with filtering, sorting, pagination
    const books = await Book.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber);

    // Optionally: get total count for pagination info
    const totalBooks = await Book.countDocuments(query);

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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching books',
      error: error.message,
    });
  }
};

// The rest of your code stays unchanged:

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching book',
      error: error.message,
    });
  }
};


export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: newBook,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create book',
       next(error);,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error updating book',
      error: error.message
    });
  }
};


export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error deleting book',
      error: error.message,
      data: null
    });
  }
};


module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookById,
};
