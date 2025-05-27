import express from 'express';
import bookController from '../controllers/bookController.js';
import Book from '../models/Book.js';
import IssueRecord from '../models/IssueRecord.js';

const router = express.Router();

// GET /api/books - Get all books
router.get('/', bookController.getBooks);

// GET /api/books/:id - Get single book
router.get('/:id', bookController.getBookById);

// POST /api/books - Add new book
router.post('/', bookController.addOrUpdateBook);

// PUT /api/books/:id - Update book
router.put('/:id', bookController.updateBook);

// DELETE /api/books/:id - Delete book
router.delete('/:id', bookController.deleteBook);

// POST /api/books/issue - Issue a book
router.post('/issue', async (req, res) => {
  try {
    const {
      bookId,
      studentId,
      borrowerName,
      department,
      course,
      semester,
      issueDate,
      returnDate
    } = req.body;

    // Validate required fields
    if (!bookId || !studentId || !studentId || !borrowerName) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // Check if book exists and is available
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.status === 'issued') {
      return res.status(400).json({ message: 'Book is already issued' });
    }

    // Create issue record
    const issueRecord = new IssueRecord({
      bookId,
      studentId,
      studentId,
      borrowerName,
      department,
      course,
      semester,
      issueDate: new Date(issueDate),
      returnDueDate: new Date(returnDate)
    });

    // Update book status
    book.status = 'issued';
    book.currentBorrower = studentId;
    
    // Save both records
    await Promise.all([
      issueRecord.save(),
      book.save()
    ]);

    res.status(200).json({ 
      message: 'Book issued successfully',
      issueRecord
    });

  } catch (err) {
    console.error('Issue error:', err);
    res.status(500).json({ message: 'Failed to issue book' });
  }
});

// POST /api/books/return - Return a book
router.post('/return', async (req, res) => {
  try {
    const { bookId } = req.body;
    const issueRecord = await IssueRecord.findOne({ bookId, returned: false });
    if (!issueRecord) {
      return res.status(404).json({ message: 'No active issue found for this book' });
    }

    issueRecord.returned = true;
    issueRecord.returnedAt = new Date();
    await issueRecord.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/books/renew - Renew a book
router.post('/renew', async (req, res) => {
  try {
    const { bookId } = req.body;
    const issueRecord = await IssueRecord.findOne({ bookId, returned: false });
    if (!issueRecord) {
      return res.status(404).json({ message: 'No active issue found for this book' });
    }

    const newReturnDate = new Date();
    newReturnDate.setDate(newReturnDate.getDate() + 14); // Extend by 14 days
    issueRecord.returnDueDate = newReturnDate;
    await issueRecord.save();

    res.status(200).json({ message: 'Book renewed successfully', newReturnDate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Backend API endpoint for updating book location
// router.patch('/api/books/:id/location', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { shelf, section } = req.body;
    
//     const book = await Book.findByIdAndUpdate(
//       id,
//       { shelf, section },
//       { new: true }
//     );
    
//     if (!book) {
//       return res.status(404).json({ message: 'Book not found' });
//     }
    
//     res.json(book);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// router.patch('/api/books/:id/location', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { shelf, section } = req.body;
    
//     const book = await Book.findByIdAndUpdate(
//       id,
//       { $set: { shelf, section } },
//       { new: true }
//     );
    
//     if (!book) {
//       return res.status(404).json({ message: 'Book not found' });
//     }
    
//     res.json(book);
//   } catch (error) {
//     console.error('Error updating book location:', error);
//     res.status(500).json({ message: 'Failed to update book location' });
//   }
// });

// Update book location route
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { shelf, section } = req.body;
    
    const book = await Book.findOneAndUpdate(
      { bookId: id }, // Use bookId instead of _id
      { $set: { shelf, section } },
      { new: true }
    );
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    console.error('Error updating book location:', error);
    res.status(500).json({ message: 'Failed to update book location' });
  }
});

export default router;
