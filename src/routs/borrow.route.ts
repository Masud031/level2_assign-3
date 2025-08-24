import express from 'express';
import { borrowBook, getAllBorrowedBooks, getAllBorrowedBooksById, returnBook } from '../controllers/borrow.controller';

const router = express.Router();

router.post('/', borrowBook);
router.get('/', getAllBorrowedBooks);
router.get('/:id', getAllBorrowedBooksById);
router.delete('/:id', returnBook);
// router.get('/', getBorrowSummary); 

export default router;
