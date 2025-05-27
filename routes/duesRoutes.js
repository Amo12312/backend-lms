// // import express from 'express';
// // import IssueRecord from '../models/IssueRecord.js';
// // const router = express.Router();

// // router.get('/due', async (req, res) => {
// //   try {
// //     const dues = await IssueRecord.find({ 
// //       dueDate: { $lt: new Date() },
// //       isReturned: false
// //     })
// //     .populate('studentId', 'name rollNumber department')
// //     .populate('bookId', 'title');

// //     const formattedDues = dues.map(issue => ({
// //       studentId: issue.studentId._id,
// //       name: issue.studentId.name,
// //       rollNumber: issue.studentId.rollNumber,
// //       department: issue.studentId.department,
// //       totalFine: calculateFine(issue.returnDate),
// //       books: [{
// //         title: issue.bookId.title,
// //         returnDate: issue.returnDate,
// //         daysLate: calculateDaysLate(issue.returnDate),
// //         fine: calculateFine(issue.returnDate)
// //       }]
// //     }));

// //     res.json(formattedDues);
// //   } catch (error) {
// //     console.error('Dues Error:', error); // Add logging
// //     res.status(500).json({ 
// //       message: 'Failed to fetch dues',
// //       error: error.message 
// //     });
// //   }
// // });

// // const calculateDaysLate = (dueDate) => {
// //   const today = new Date();
// //   const due = new Date(dueDate);
// //   return Math.max(0, Math.floor((today - due) / (1000 * 60 * 60 * 24)));
// // };

// // const calculateFine = (dueDate) => {
// //   const daysLate = calculateDaysLate(dueDate);
// //   return daysLate * 2; // ₹2 per day
// // };

// // export default router;

// import express from 'express';
// import IssueRecord from '../models/IssueRecord.js';
// const router = express.Router();

// router.get('/due', async (req, res) => {
//   try {
//     // Get current date
//     const currentDate = new Date();
    
//     // Find overdue books
//     const dues = await IssueRecord.find({ 
//       dueDate: { $lt: currentDate },
//       status: 'active', // Check for active issues
//       transactionType: 'issue', // Only check issue transactions
//       fineStatus: { $ne: 'paid' } // Exclude paid fines
//     });

//     // console.log('Found dues:', dues); // Debug log

//     if (!dues || dues.length === 0) {
//       return res.json([]);
//     }

//     const formattedDues = dues.map(issue => ({
//       studentId: issue.studentId,
//       name: issue.studentName,
//       department: issue.department,
//       totalFine: calculateFine(issue.dueDate),
//       books: [{
//         title: issue.bookTitle,
//         returnDate: issue.dueDate,
//         daysLate: calculateDaysLate(issue.dueDate),
//         fine: calculateFine(issue.dueDate)
//       }]
//     }));

//     res.json(formattedDues);
//   } catch (error) {
//     // console.error('Dues Error:', error);
//     res.status(500).json({ 
//       message: 'Failed to fetch dues',
//       error: error.message 
//     });
//   }
// });

// // Helper functions remain the same
// const calculateDaysLate = (dueDate) => {
//   const today = new Date();
//   const due = new Date(dueDate);
//   return Math.max(0, Math.floor((today - due) / (1000 * 60 * 60 * 24)));
// };

// const calculateFine = (dueDate) => {
//   const daysLate = calculateDaysLate(dueDate);
//   return daysLate * 2; // ₹2 per day
// };

// export default router;

// import express from 'express';
// import IssueRecord from '../models/IssueRecord.js';
// const router = express.Router();

// router.get('/due', async (req, res) => {
//   try {
//     const dues = await IssueRecord.find({ 
//       dueDate: { $lt: new Date() },
//       isReturned: false
//     })
//     .populate('studentId', 'name rollNumber department')
//     .populate('bookId', 'title');

//     const formattedDues = dues.map(issue => ({
//       studentId: issue.studentId._id,
//       name: issue.studentId.name,
//       rollNumber: issue.studentId.rollNumber,
//       department: issue.studentId.department,
//       totalFine: calculateFine(issue.returnDate),
//       books: [{
//         title: issue.bookId.title,
//         returnDate: issue.returnDate,
//         daysLate: calculateDaysLate(issue.returnDate),
//         fine: calculateFine(issue.returnDate)
//       }]
//     }));

//     res.json(formattedDues);
//   } catch (error) {
//     console.error('Dues Error:', error); // Add logging
//     res.status(500).json({ 
//       message: 'Failed to fetch dues',
//       error: error.message 
//     });
//   }
// });

// const calculateDaysLate = (dueDate) => {
//   const today = new Date();
//   const due = new Date(dueDate);
//   return Math.max(0, Math.floor((today - due) / (1000 * 60 * 60 * 24)));
// };

// const calculateFine = (dueDate) => {
//   const daysLate = calculateDaysLate(dueDate);
//   return daysLate * 2; // ₹2 per day
// };

// export default router;

import express from 'express';
import IssueRecord from '../models/IssueRecord.js';
const router = express.Router();

router.get('/due', async (req, res) => {
  try {
    // Get current date
    const currentDate = new Date();
    
    // Find overdue books
    const dues = await IssueRecord.find({ 
      dueDate: { $lt: currentDate },
      status: 'active', // Check for active issues
      transactionType: 'issue', // Only check issue transactions
      fineStatus: { $ne: 'paid' } // Exclude paid fines
    });

    // console.log('Found dues:', dues); // Debug log

    if (!dues || dues.length === 0) {
      return res.json([]);
    }

    const formattedDues = dues.map(issue => ({
      studentId: issue.studentId,
      name: issue.studentName,
      department: issue.department,
      totalFine: calculateFine(issue.dueDate),
      books: [{
        title: issue.bookTitle,
        returnDate: issue.dueDate,
        daysLate: calculateDaysLate(issue.dueDate),
        fine: calculateFine(issue.dueDate)
      }]
    }));

    res.json(formattedDues);
  } catch (error) {
    // console.error('Dues Error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch dues',
      error: error.message 
    });
  }
});


const calculateDaysLate = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  
  // Set due date to end of day (23:59:59)
  due.setHours(23, 59, 59, 999);
  
  // Add 1 day to due date before calculating difference
  const gracePeriod = new Date(due);
  gracePeriod.setDate(gracePeriod.getDate() + 1);
  
  // Calculate days between grace period and today
  const daysLate = Math.floor((today - gracePeriod) / (1000 * 60 * 60 * 24));
  
  // Return 0 if not late, otherwise return days late
  return Math.max(0, daysLate);
};

const calculateFine = (dueDate) => {
  const daysLate = calculateDaysLate(dueDate);
  return daysLate * 2; // ₹2 per day
};

export default router;