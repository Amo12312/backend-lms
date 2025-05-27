import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentId: String,
  rollNo: String,
  studentId: String,
  name: String,
  department: String,
  course: String,
  semester: String,
  email: String,
  phone: String,
  gender: String,
  dateOfBirth: String,
  address: String,
  parentName: String,
  parentPhone: String,
  joiningYear: String,
  bloodGroup: String,
  libraryCardNo: String,
  section: String
}, {
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
