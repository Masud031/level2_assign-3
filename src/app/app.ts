import express from 'express';
import cors from 'cors';
import bookRouter from '../../src/routs/book.route';
import borrowRouter from '../../src/routs/borrow.route';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/books', bookRouter);
app.use('/api/borrow', borrowRouter);
// app.use('/api', borrowRoutes);
app.get('/test', (req, res) => {
  res.send('Server is working!');
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err); // log error for debugging

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      error: err,
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong',
    error: err,
  });
});



export default app;
