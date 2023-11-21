import { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  userName,
} from './student.interface';

const userNameSchema = new Schema<userName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNO: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNO: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: String,
  name: userNameSchema,
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  presentAddress: { type: String, required: true },
  parmanentAddress: { type: String, required: true },
  gurdian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['Active', 'blocked'],
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
