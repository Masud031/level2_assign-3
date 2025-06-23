import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IBorrow extends Document {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

const borrowSchema = new Schema<IBorrow>({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  quantity: { type: Number, required: true, min: 1 },
  dueDate: { type: Date, required: true },
}, { timestamps: true });

const Borrow = mongoose.model<IBorrow>('Borrow', borrowSchema);

export default Borrow;
