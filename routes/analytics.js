import express from 'express';
import Book from '../models/Book.js';
import Student from '../models/Student.js'; // ✅ Use `import` instead of `require`

const router = express.Router();

// Mock analytics data (you can enhance this later)
const analyticsData = {
  totalUsers: 500,
  activeUsers: 120,
  pageViews: 1500,
  registrationsToday: 20,
  totalBooks: 2500,
  booksBorrowed: 1500,
  dueBooks: 200,
  revenue: 15000,
  mostBorrowedBooks: [
    { bookId: 'book1', title: 'The Great Gatsby', borrowCount: 150 },
    { bookId: 'book2', title: 'To Kill a Mockingbird', borrowCount: 120 },
  ]
};

// Combined route that uses actual DB data and mock data
router.get('/summary', async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const issuedBooks = await Book.countDocuments({ status: 'issued' }); // adjusted field
    const overdueBooks = await Book.countDocuments({
      'issueHistory.returnDate': { $lt: new Date() },
      status: 'issued'
    });

    const totalStudents = await Student.countDocuments();
    console.log('Total Books:', totalStudents);

    res.json({
      ...analyticsData,
      totalBooks,
      issuedBooks,
      overdueBooks,
      totalStudents
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
