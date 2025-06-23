import express from 'express';
import { borrowBook, getAllBorrowedBooks, returnBook } from '../controllers/borrow.controller';

const router = express.Router();

router.post('/', borrowBook);
router.get('/', getAllBorrowedBooks);
router.delete('/:id', returnBook);
// router.get('/', getBorrowSummary); 

export default router;
