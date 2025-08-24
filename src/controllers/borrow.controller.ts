/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
// import Borrow from '../models/borrow.model';
import Borrow from '../models/Borrow.model'; 
import mongoose from 'mongoose';
import { Book } from '../models/Book.models';

// Borrow a book
export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
       res.status(400).json({
        success: false,
        message: 'Invalid book ID format',
      });
    }

    // Step 1–3: Validate, deduct copies, update availability
    const updatedBook = await Book.updateAvailability(bookId, quantity);

    // Step 4: Save the borrow record
    const borrowed = new Borrow({
      book: bookId,
      quantity,
      dueDate,
    });

    await borrowed.save();


  res.status(201).json({
  success: true,
  message: 'Book borrowed successfully',
  data: {
    borrowed: {
      _id: borrowed._id,
      book: borrowed.book,
      quantity: borrowed.quantity,
      dueDate: borrowed.dueDate,
      createdAt: borrowed.createdAt,
      updatedAt: borrowed.updatedAt,
    },
    updatedBook, // include the updated book info
  },
});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to borrow book',
      error: error.message,
    });
  }
};


// Get all borrowed books
export const getAllBorrowedBooks = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books', // collection name in MongoDB
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails',
        },
      },
      {
        $unwind: '$bookDetails',
      },
      {
        $project: {
          _id: 0,
          book: {
            title: '$bookDetails.title',
            isbn: '$bookDetails.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve borrowed books summary',
      error: error.message,
    });
  }
};
// Return a borrowed book
export const returnBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Borrow.findByIdAndDelete(id);

    if (!deleted) {
       res.status(404).json({ message: 'Borrowed record not found' });
    }

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to return book', error });
  }
};
// Get a single borrowed book by ID
export const getAllBorrowedBooksById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const borrowed = await Borrow.findById(id);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch borrowed record',
      error,
    });
  }
};


