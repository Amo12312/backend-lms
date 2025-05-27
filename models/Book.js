import mongoose from 'mongoose';

// Book Schema Definition
const bookSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: false,
    },
    materialType: {
      type: String,
      required: true,
      enum: ['book', 'magazine', 'journal', 'thesis', 'report', 'research', 'newspaper','research paper'],
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },
    shelf: {
      type: String,
      required: true,
      default: 'Unassigned',
    },
    section: {
      type: String,
      required: true,
      default: 'Unassigned',
    },
    publisher: {
      type: String,
      required: false,
    },
    edition: String,
    category: String,
    subCategory: String,
    status: {
      type: String,
      enum: ['available', 'issued', 'lost'],
      default: 'available',
    },
    price: {
      type: Number,
      min: 0, // Ensure the price can't be negative
    },
    // Add purchase details
    vendor: {
      type: String,
      required: false
    },
    purchaseDate: {
      type: Date,
      required: false
    },
    invoiceNumber: {
      type: String,
      required: false
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'upi', 'bank_transfer', 'cheque'],
      required: false
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'partial', 'completed'],
      required: false
    },
    currentBorrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      default: null, // Set default to null, indicating no borrower
    },
    issueHistory: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Student',
          required: true, // Ensure each issue history is associated with a student
        },
        issueDate: {
          type: Date,
          default: Date.now, // Automatically set issue date if not provided
        },
        returnDate: {
          type: Date,
          required: true, // Ensure a return date is always specified
        },
        actualReturnDate: Date,
        fine: {
          type: Number,
          default: 0, // Set default fine to 0 if not provided
          min: 0, // Ensure fine is non-negative
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create Book model
const Book = mongoose.model('Book', bookSchema);

export default Book;