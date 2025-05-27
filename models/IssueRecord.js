// import mongoose from 'mongoose';

// const IssueRecordSchema = new mongoose.Schema({
//   bookId: { type: String, required: true },
//   bookTitle: { type: String, required: true },
//   studentId: { type: String, required: true },
//   studentName: { type: String, required: true },

//   // Add currentBorrower field for population
//   currentBorrower: {
//     borrowerType: { type: String, enum: ['student', 'faculty'], required: true },
//     borrowerId: { type: mongoose.Schema.Types.ObjectId, refPath: 'currentBorrower.borrowerType' }
//   },

//   department: String,
//   semester: String,
//   course: String,
//   email: String,
//   phone: String,
//   issueDate: { type: Date, default: Date.now },

//   dueDate: { type: Date, required: true },
//   returnDate: Date,
//   actualReturnDate: Date,
//   status: { type: String, enum: ['active', 'returned'], default: 'active' },
//   transactionType: { type: String, enum: ['issue', 'return', 'renew'], required: true },
//   fineAmount: { type: Number, default: 0 },
//   fineStatus: {
//     type: String,
//     enum: ['none', 'pending', 'paid'],
//     default: 'none'
//   },

//   // Renewal Tracking
//   previousIssueId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'IssueRecord'
//   },
//   renewalCount: {
//     type: Number,
//     default: 0
//   }
// }, { timestamps: true });

// // Add indexes for better query performance
// IssueRecordSchema.index({ bookId: 1, status: 1 });
// IssueRecordSchema.index({ studentId: 1, status: 1 });
// IssueRecordSchema.index({ transactionType: 1 });
// IssueRecordSchema.index({ 'currentBorrower.borrowerId': 1 });

// // Check if model exists before creating
// const IssueRecord = mongoose.models.IssueRecord || mongoose.model('IssueRecord', IssueRecordSchema);

// export default IssueRecord;

// import mongoose from 'mongoose';

// const IssueRecordSchema = new mongoose.Schema({
//   bookId: { 
//     type: String, 
//     required: true 
//   },
//   bookTitle: { 
//     type: String, 
//     required: true 
//   },
//   borrowerName : {
//     type: String,
//     // required: true
//   }, 
//   studentId: {
//     type: String,
//     // required: true
//   },
//   department: { 
//     type: String, 
//     // required: true 
//   },
//   course: { 
//     type: String,
//     required: function() { 
//       return this.currentBorrower?.borrowerType === 'student' 
//     }
//   },
//   semester: { 
//     type: String,
//     required: function() { 
//       return this.currentBorrower?.borrowerType === 'student' 
//     }
//   },
//   email: String,
//   phone: String,
//   issueDate: { 
//     type: Date, 
//     default: Date.now 
//   },
//   dueDate: { 
//     type: Date, 
//     required: true 
//   },
//   status: {
//     type: String,
//     enum: ['active', 'returned'],
//     default: 'active'
//   },
//   transactionType: {
//     type: String,
//     enum: ['issue', 'return', 'renew'],
//     default: 'issue'
//   }
// }, { timestamps: true });

// // Add indexes for better query performance
// IssueRecordSchema.index({ bookId: 1, status: 1 });
// IssueRecordSchema.index({ studentId: 1, status: 1 });
// IssueRecordSchema.index({ transactionType: 1 });

// const IssueRecord = mongoose.model('IssueRecord', IssueRecordSchema);
// export default IssueRecord;

import mongoose from 'mongoose';

const IssueRecordSchema = new mongoose.Schema({
  bookId: { type: String, required: true },
  bookTitle: { type: String, required: true },
  borrowerType: { type: String, required: true, enum: ['student', 'faculty'], default: 'student' },

  // Student fields
  studentId: { type: String, required: function () { return this.borrowerType === 'student'; } },
  studentName: { type: String, required: function () { return this.borrowerType === 'student'; } },
  semester: { type: String, required: function () { return this.borrowerType === 'student'; } },
  course: { type: String, required: function () { return this.borrowerType === 'student'; } },

  // Faculty fields
  employeeId: { type: String, required: function () { return this.borrowerType === 'faculty'; } },
  facultyName: { type: String, required: function () { return this.borrowerType === 'faculty'; } },
  designation: { type: String, required: function () { return this.borrowerType === 'faculty'; } },

  // Common fields
  department: { type: String },
  email: { type: String },
  phone: { type: String },
  issueDate: { type: Date, default: Date.now },
  dueDate: {
    type: Date, required: true,
    default: () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days from now
  },
   returnDate: Date,
  actualReturnDate: Date,
  status: { type: String, enum: ['active', 'returned'], default: 'active' },
  transactionType: { type: String, enum: ['issue', 'return', 'renew'], default: 'issue' }
}, { timestamps: true });


// Add indexes for better query performance
IssueRecordSchema.index({ bookId: 1, status: 1 });
IssueRecordSchema.index({ studentId: 1, status: 1 });
IssueRecordSchema.index({ transactionType: 1 });

const IssueRecord = mongoose.model('IssueRecord', IssueRecordSchema);
export default IssueRecord;