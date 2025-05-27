import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  studentId: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true
  },
  borrowerName: {
    type: String,
    required: true
  },
  department: String,
  course: String,
  semester: String,
  issueDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    default: null
  },
  fine: {
    type: Number,
    default: 0
  },
  fineCollected: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Method to calculate fine
issueSchema.methods.calculateFine = function () {
  if (!this.returnDate && this.dueDate < new Date()) {
    const daysOverdue = Math.floor((new Date() - this.dueDate) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysOverdue * 2); // Rs. 2 per day
  }
  return 0;
};

// Update fine before saving
issueSchema.pre('save', function (next) {
  if (!this.returnDate && this.dueDate < new Date()) {
    this.fine = this.calculateFine();
  }
  next();
});

const IssueRecord = mongoose.model('IssueRecord', issueSchema);
export default IssueRecord;
