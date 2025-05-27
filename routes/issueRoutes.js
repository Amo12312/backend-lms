import express from 'express';
import IssueRecord from '../models/IssueRecord.js';
import Book from '../models/Book.js';

const router = express.Router();

// Issue a book
// router.post('/issue', async (req, res) => {
//   try {
//     const {
//       bookId,
//       borrowerType,
//       employeeId,
//       studentId,
//       borrowerName,
//       designation,
//       department,
//       issueDate,
//       dueDate
//     } = req.body;

//     // Validate required fields
//     // if (!bookId || !borrowerType || !(studentId || employeeId) || !borrowerName) {
//     //   return res.status(400).json({ 
//     //     success: false,
//     //     message: 'Required fields missing'
//     //   });
//     // }

//     // Create issue record
//     const issueRecord = new IssueRecord({
//       bookId,
//       borrowerType,
//       borrowerId: borrowerType === 'student' ? studentId : employeeId,
//       borrowerName,
//       designation: borrowerType === 'faculty' ? designation : undefined,
//       department,
//       issueDate: issueDate || new Date(),
//       dueDate: dueDate || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // Default 15 days
//       status: 'active',
//       transactionType: 'issue'
//     });
//     // Update book quantity
//     book.quantity -= 1;

//     // Save both records
//     await Promise.all([
//       issueRecord.save(),
//       book.save()
//     ]);

//     res.status(201).json({ 
//       success: true,
//       message: 'Book issued successfully',
//       data: {
//         issueRecord: issueRecord,
//         remainingQuantity: book.quantity
//       }   
//     });

//     // await issueRecord.save();
//     // res.status(201).json({
//     //   success: true,
//     //   message: 'Book issued successfully',
//     //   data: issueRecord
//     // });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to issue book',
//       error: err.message
//     });
//   }
// });

// Issue a book
// router.post('/issue', async (req, res) => {
//   try {
//     const {
//       bookId,
//       bookTitle,
//       borrowerType,
//       employeeId,
//       studentId,
//       borrowerName,
//       designation,
//       department,
//       issueDate,
//       dueDate
//     } = req.body;

//     // Verify if book exists
//     const book = await Book.findOne({ bookId });
//     if (!book) {
//       return res.status(404).json({
//         success: false,
//         message: 'Book not found'
//       });
//     }

//     // Check if book is available
//     if (book.quantity < 1) {
//       return res.status(400).json({
//         success: false,
//         message: 'Book is out of stock'
//       }); 
//     }

//     // Create issue record
//     const issueRecord = new IssueRecord({
//       bookId,
//       bookTitle,
//       borrowerType,
//       borrowerId: borrowerType === 'student' ? studentId : employeeId,
//       borrowerName,
//       designation: borrowerType === 'faculty' ? designation : undefined,
//       department,
//       issueDate: issueDate || new Date(),
//       dueDate: dueDate || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//       status: 'active',
//       transactionType: 'issue'
//     });

//     // Decrease book quantity
//     book.quantity -= 1;

//     // Save both records
//     await Promise.all([
//       issueRecord.save(),
//       book.save()
//     ]);

//     res.status(201).json({
//       success: true,
//       message: 'Book issued successfully',
//       data: {
//         issueRecord,
//         remainingQuantity: book.quantity
//       }
//     });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to issue book',
//       error: err.message
//     });
//   }
// });

// router.post('/issue', async (req, res) => {
//   try {
//     const {
//       bookId,
//       bookTitle,
//       studentId,
//       studentName,
//       borrowerType,
//       department,
//       semester,
//       course,
//       email,
//       phone,
//       issueDate,
//       dueDate
//     } = req.body;

//     // Validate required fields
//     if (!bookId || !bookTitle || !studentId || !studentName || !borrowerType) {
//       return res.status(400).json({
//         success: false,
//         message: 'Required fields missing'
//       });
//     }

//     // Create issue record
//     const issueRecord = new IssueRecord({
//       bookId,
//       bookTitle,
//       studentId,
//       studentName,
//       currentBorrower: {
//         borrowerType: borrowerType.toLowerCase()
//       },
//       department,
//       semester,
//       course,
//       email,
//       phone,
//       issueDate: issueDate || new Date(),
//       dueDate: dueDate || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//       transactionType: 'issue'
//     });

//     await issueRecord.save();

//     res.status(201).json({
//       success: true,
//       message: 'Book issued successfully',
//       data: issueRecord
//     });

//   } catch (err) {
//     console.error('Issue error:', err);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to issue book',
//       error: err.message
//     });
//   }
// });
// router.post('/issue', async (req, res) => {
//   try {
//     const {
//       bookId,
//       bookTitle,
//       studentId,
//       studentName,
//       department,
//       semester,
//       course,
//       email,
//       phone,
//       issueDate,
//       dueDate
//     } = req.body;

//     // Validate required fields
//     if (!bookId || !bookTitle || !studentId || !studentName) {
//       return res.status(400).json({
//         success: false,
//         message: 'Required fields missing'
//       });
//     }

//     // Create issue record
//     const issueRecord = new IssueRecord({
//       bookId,
//       bookTitle,
//       studentId,
//       studentName,
//       currentBorrower: {
//         borrowerType: 'student'  // Set default borrower type
//       },
//       department,
//       semester, 
//       course,
//       email,
//       phone,
//       issueDate: issueDate || new Date(),
//       dueDate: dueDate || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//       status: 'active',
//       transactionType: 'issue'
//     });

//     await issueRecord.save();

//     res.status(201).json({
//       success: true,
//       message: 'Book issued successfully',
//       data: issueRecord
//     });

//   } catch (err) {
//     console.error('Issue error:', err);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to issue book',
//       error: err.message
//     });
//   }
// });

router.post('/issue', async (req, res) => {
  try {
    const { borrowerType } = req.body;

    // Validate based on borrower type
    if (borrowerType === 'student') {
      if (!req.body.bookId || !req.body.bookTitle || !req.body.studentId || !req.body.studentName) {
        return res.status(400).json({
          success: false,
          message: 'For students: Book ID, Book Title, BT Number and Student Name are required'
        });
      }
    } else if (borrowerType === 'faculty') {
      if (!req.body.bookId || !req.body.bookTitle || !req.body.employeeId || !req.body.facultyName) {
        return res.status(400).json({
          success: false,
          message: 'For faculty: Book ID, Book Title, Employee ID and Faculty Name are required'
        });
      }
    }

    // Find the book and check its availability
    const book = await Book.findOne({ bookId: req.body.bookId });
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Check if book has available quantity
    if (book.quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Book is out of stock'
      });
    }

    // Create issue record
    const issueRecord = new IssueRecord({
      ...req.body,
      issueDate: req.body.issueDate || new Date(),
      dueDate: req.body.dueDate || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      status: 'active',
      transactionType: 'issue'
    });

    // Decrease book quantity
    book.quantity -= 1;
    
    // Update book status if quantity becomes 0
    if (book.quantity === 0) {
      book.status = 'issued';
    }

    // Save both records
    await Promise.all([
      issueRecord.save(),
      book.save()
    ]);

    res.status(201).json({
      success: true,
      message: 'Book issued successfully',
      data: {
        issueRecord,
        remainingQuantity: book.quantity
      }
    });
  } catch (err) {
    console.error('Issue error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to issue book',
      error: err.message
    });
  }
});

// Get books issued to a student
// router.get('/student/:studentId', async (req, res) => {
//   try {
//     const { studentId } = req.params;

//     if (!studentId) {
//       return res.status(400).json({
//         success: false,
//         message: 'BT Number is required'
//       });
//     }

//     // Find all active issues for the student
//     const issuedBooks = await IssueRecord.find({
//       studentId: studentId,
//       status: 'active',
//       transactionType: 'issue'
//     }).select('_id bookId bookTitle author returnDate issueDate');

//     // If no books are issued
//     if (!issuedBooks || issuedBooks.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'No active books issued to this student'
//       });
//     }

//     // Return the issued books
//     res.status(200).json({
//       success: true,
//       data: issuedBooks,
//       count: issuedBooks.length
//     });

//   } catch (err) {
//     console.error('Error fetching issued books:', err);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch issued books',
//       error: err.message
//     });
//   }
// });

// Get books issued to a borrower (student or faculty)
router.get('/borrower/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { borrowerType } = req.query;

    if (!id || !borrowerType) {
      return res.status(400).json({
        success: false,
        message: 'Borrower ID and type are required'
      });
    }

    // Build query based on borrower type
    const query = {
      status: 'active',
      transactionType: 'issue'
    };

    if (borrowerType === 'student') {
      query.studentId = id;
    } else {
      query.employeeId = id;
    }

    const issuedBooks = await IssueRecord.find(query)
      .select('_id bookId bookTitle author dueDate issueDate');

    if (!issuedBooks.length) {
      return res.status(404).json({
        success: false,
        message: 'No active books issued to this borrower'
      });
    }

    res.status(200).json({
      success: true,
      data: issuedBooks
    });

  } catch (err) {
    console.error('Error fetching issued books:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch issued books',
      error: err.message
    });
  }
});
// Return a book with fine calculation
router.post('/return', async (req, res) => {
  try {
    const { bookId, borrowerId, borrowerType } = req.body;
    // Find active issue record

     if (!bookId || !borrowerId || !borrowerType) {
      return res.status(400).json({
        success: false,
        message: 'Book ID, Borrower ID and Borrower Type are required'
      });
    }

  // Build query based on borrower type
    const query = {
      bookId,
      status: 'active'
    };

    if (borrowerType === 'student') {
      query.studentId = borrowerId;
    } else {
      query.employeeId = borrowerId;
    }

    const issueRecord = await IssueRecord.findOne(query);

    if (!issueRecord) {
      return res.status(404).json({
        success: false,
        message: 'No active issue found for this book and student'
      });
    }

    const today = new Date();
    issueRecord.actualReturnDate = today;
    let fineAmount = 0;

    // Calculate fine if book is overdue (2 Rs per day)
    if (today > issueRecord.returnDate) {
      const daysOverdue = Math.floor(
        (today - issueRecord.returnDate) / (1000 * 60 * 60 * 24)
      );
      fineAmount = daysOverdue * 2;
    }

    // Update issue record
    issueRecord.status = 'returned';
    issueRecord.transactionType = 'return';
    issueRecord.actualReturnDate = today;
    issueRecord.fineAmount = fineAmount;
    issueRecord.fineStatus = fineAmount > 0 ? 'pending' : 'none';

    // Update book quantity
    const book = await Book.findOne({ bookId });
    if (book) {
      book.quantity += 1;
      await book.save();
    }

    await issueRecord.save();

    res.status(200).json({
      success: true,
      message: fineAmount > 0
        ? `Book returned successfully. Fine amount: Rs. ${fineAmount}`
        : 'Book returned successfully',
      data: issueRecord
    });

  } catch (err) {
    console.error('Return error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to return book',
      error: err.message
    });
  }
});

router.post('/return/confirm-payment', async (req, res) => {
  try {
    const { issueId } = req.body;

    const record = await IssueRecord.findById(issueId);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Issue record not found' });
    }

    if (record.fineAmount > 0) {
      record.fineStatus = 'paid';
      await record.save();
      return res.status(200).json({ success: true, message: 'Fine marked as paid' });
    }

    return res.status(400).json({ success: false, message: 'No fine to confirm' });
  } catch (err) {
    console.error('Fine confirm error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Renew a book
router.post('/renew', async (req, res) => {
  try {
    // const { bookId, studentId, newReturnDate } = req.body;

    const { bookId, borrowerId, borrowerType, newReturnDate } = req.body;

    // // Find active issue record
    // const currentIssue = await IssueRecord.findOne({
    //   bookId,
    //   studentId,
    //   status: 'active'
    // });

      if (!bookId || !borrowerId || !borrowerType || !newReturnDate) {
      return res.status(400).json({
        success: false,
        message: 'Book ID, Borrower ID, Borrower Type and New Return Date are required'
      });
    }

     // Build query based on borrower type
    const query = {
      bookId,
      status: 'active'
    };

    if (borrowerType === 'student') {
      query.studentId = borrowerId;
    } else {
      query.employeeId = borrowerId;
    }

    const currentIssue = await IssueRecord.findOne(query);

    if (!currentIssue) {
      return res.status(404).json({
        success: false,
        message: 'No active issue found for this book and student'
      });
    }

    // Check if book has any pending fines
    if (currentIssue.fineStatus === 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Cannot renew - Book has pending fines'
      });
    }

    // Create new issue record for renewal
    const renewalRecord = new IssueRecord({
      bookId: currentIssue.bookId,
      bookTitle: currentIssue.bookTitle,
      studentId: currentIssue.studentId,
      studentName: currentIssue.studentName,
      department: currentIssue.department,
      course: currentIssue.course,
      semester: currentIssue.semester,
      email: currentIssue.email,
      phone: currentIssue.phone,
      issueDate: new Date(),
      returnDate: new Date(newReturnDate),
      status: 'active',
      transactionType: 'renew',
      previousIssueId: currentIssue._id,
      renewalCount: currentIssue.renewalCount + 1
    });

    // Update current issue status
    currentIssue.status = 'renewed';
    currentIssue.actualReturnDate = new Date();

    // Save both records
    await Promise.all([
      renewalRecord.save(),
      currentIssue.save()
    ]);

    res.status(200).json({
      success: true,
      message: 'Book renewed successfully',
      data: {
        renewalRecord,
        previousIssue: currentIssue
      }
    });

  } catch (err) {
    console.error('Renew error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to renew book',
      error: err.message
    });
  }
});

// Get active issues with fines
router.get('/active', async (req, res) => {
  try {
    const activeIssues = await Issue.find({ returnDate: null })
      .populate('bookId', 'title author')
      .lean();

    const issuesWithFines = activeIssues.map(issue => {
      const today = new Date();
      let fine = 0;
      let daysOverdue = 0;

      if (today > issue.dueDate) {
        daysOverdue = Math.floor((today - issue.dueDate) / (1000 * 60 * 60 * 24));
        fine = daysOverdue * 2;
      }

      return {
        ...issue,
        currentFine: fine,
        daysOverdue
      };
    });

    res.json(issuesWithFines);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch active issues' });
  }
});

// Get transaction history with filters
router.get('/history', async (req, res) => {
  try {
   const { bookId, studentId, employeeId, borrowerType, transactionType, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);


    // Build filter object
    const filter = {};
    
    if (bookId) {
      filter.bookId = bookId;
    }
     
    // Handle both student and faculty cases
    if (borrowerType === 'student' && studentId) {
      filter.studentId = studentId;
    } else if (borrowerType === 'faculty' && employeeId) {
      filter.employeeId = employeeId;
    }
    
    if (transactionType && transactionType !== 'all') {
      filter.transactionType = transactionType;
    }
    // Get total count for pagination
    const totalRecords = await IssueRecord.countDocuments(filter);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    // Get records with pagination
    const records = await IssueRecord.find(filter)
      .sort({ createdAt: -1 }) // Sort by latest first
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    res.status(200).json({
      success: true,
      data: {
        records,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalRecords,
          limit: parseInt(limit)
        }
      }
      
    });

  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction history',
      error: err.message
    });
  }
});

// Generic issue creation endpoint
router.post('/', async (req, res) => {
  try {
    const issue = new Issue({
      ...req.body,
      issueDate: new Date(req.body.issueDate),
      returnDate: req.body.returnDate ? new Date(req.body.returnDate) : null
    });

    const savedIssue = await issue.save();

    res.status(201).json({
      success: true,
      message: 'Book issued successfully',
      data: savedIssue
    });
  } catch (error) {
    console.error('Issue error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to issue book'
    });
  }
});

export default router;