import { Request, Response } from 'express';
// import Borrow from '../models/borrow.model';
import Borrow from '../../src/models/Borrow.model'; 

// Borrow a book
export const borrowBook = async (req: Request, res: Response) => {
  try {
    const borrowed = new Borrow(req.body);
    await borrowed.save();

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to borrow book',
      error,
    });
  }
};


// Get all borrowed books
export const getAllBorrowedBooks = async (_req: Request, res: Response) => {
  try {
    const data = await Borrow.find();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch borrowed books', error });
  }
};
// Return a borrowed book
export const returnBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Borrow.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Borrowed record not found' });
    }

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to return book', error });
  }
};

