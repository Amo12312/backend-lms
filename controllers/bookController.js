import mongoose from 'mongoose';
import Book from '../models/Book.js';

const bookController = {
  // Get all books
  getBooks: async (req, res) => {
    try {
      const books = await Book.find(req.query)
        .populate('currentBorrower', 'name')
        .sort({ createdAt: -1 });
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single book by bookId
  getBookById: async (req, res) => {
    try {
      const book = await Book.findOne({ bookId: req.params.id })
        .populate('currentBorrower', 'name')
        .populate('issueHistory.student', 'name');

      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

// ✅ Add a new book or update quantity if ISBN already exists
addOrUpdateBook: async (req, res) => {
  try {
    const { 
      isbn, 
      title, 
      author, 
      quantity, 
      shelf, 
      section, 
      publisher, 
      edition, 
      category, 
      subCategory, 
      status, 
      materialType,
      vendor,
      purchaseDate,
      invoiceNumber,
      price,
      paymentMethod,
      paymentStatus
    } = req.body;

    // Check if a book with this ISBN already exists
    const existingBook = await Book.findOne({ isbn });

    if (existingBook) {
      existingBook.quantity += Number(quantity);
      await existingBook.save();
      return res.status(200).json({
        message: 'Book already exists. Quantity updated.',
        book: existingBook
      });
    }

    // Create a new book if not exists
    const newBook = new Book({
      bookId: new mongoose.Types.ObjectId().toString(),
      isbn,
      title,
      author,
      quantity,
      shelf,
      section,
      publisher,
      edition,
      category,
      subCategory,
      status,
      materialType,
      vendor,
      purchaseDate,
      invoiceNumber,
      price,
      paymentMethod,
      paymentStatus
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
},

// Add a new book
addBook: async (req, res) => {
  try {
    const {
      title,
      author,
      isbn,
      quantity,
      bookId,
      shelf,
      section,
      materialType,
      publisher,
      vendor,
      purchaseDate,
      invoiceNumber,
      price,
      paymentMethod,
      paymentStatus
    } = req.body;

    // Validate material type
    const validMaterialTypes = ['book', 'magazine', 'journal', 'thesis', 'report', 'research', 'newspaper'];
    if (!validMaterialTypes.includes(materialType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid material type'
      });
    }

    const newBook = new Book({
      title,
      author,
      isbn,
      quantity,
      bookId,
      shelf,
      section,
      materialType,
      publisher,
      vendor,
      purchaseDate,
      invoiceNumber,
      price,
      paymentMethod,
      paymentStatus
    });

    await newBook.save();

    res.status(201).json({
      success: true,
      message: 'Material added successfully',
      data: newBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
},

  // Update book by bookId
  updateBook: async (req, res) => {
    try {
      const book = await Book.findOneAndUpdate(
        { bookId: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );

      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete book by bookId
  deleteBook: async (req, res) => {
    try {
      const book = await Book.findOneAndDelete({ bookId: req.params.id });

      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default bookController;
