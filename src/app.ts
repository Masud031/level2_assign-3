import express from 'express';
import cors from 'cors';
import bookRouter from '../src/routs/book.route';
import borrowRouter from '../src/routs/borrow.route';
import errorHandler from '../src/middlewares/errorHandler';
import { Request, Response, NextFunction } from 'express';
// import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/books', bookRouter);
app.use('/api/borrow', borrowRouter);
app.use(errorHandler);
// app.use('/api', borrowRoutes);
app.get('/', (req, res) => {
  res.send('Server is working!');
});
// app.use('/favicon.ico', 
//   express.static(path.join(__dirname, 'public', 'favicon.ico')));

// Global Error Handling Middleware
// Global Error Handling Middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err); // for debugging

  if (err.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      error: err,
    });
  } else {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
});

export default app;