import mongoose, { Model, Schema } from 'mongoose';

const genreOptions = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];

interface IBook extends Document {
  title: string;
  copies: number;
  available: boolean;
  // ...other fields
}
interface BookModel extends Model<IBook> {
  updateAvailability(id: string, quantity: number): Promise<IBook | null>;
}

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, enum: genreOptions, required: true },
    isbn: { type: String, unique: true, required: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true,
   
   }

   
);
bookSchema.statics.updateAvailability = async function (id: string, quantity: number) {
  const book = await this.findById(id);
  if (!book) throw new Error('Book not found');

  if (book.copies < quantity) {
    throw new Error('Not enough copies available');
  }

  book.copies -= quantity;
  if (book.copies === 0) {
    book.available = false;
  }

  await book.save();
  return book;
};

// export const Book = model('Book', bookSchema);
export const Book = mongoose.model<IBook, BookModel>('Book', bookSchema);