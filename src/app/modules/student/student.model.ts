import { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  userName
} from './student.interface';

const userNameSchema = new Schema<userName>({
  firstName: {
    type: String,
    required: [true, "First name is Required."],
    maxlength: [20, "First name can not be more than 20 Characters"],
    trim: true,
    validate:{
      validator:function(value:string){
        const res= value.charAt(0).toUpperCase()+value.slice(1);
        return value===res;
      }
    }
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is Required."],
    trim: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, "Father name is Required."],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father Occupation is Required."],
    trim: true,
  },
  fatherContactNO: {
    type: String,
    required: [true, "Father ContactNo is Required."],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "Mother name is Required."],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother Occupation is Required."],
    trim: true,
  },
  motherContactNO: {
    type: String,
    required: [true, "Mother ContactNo is Required."],
    trim: true,
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name is required.'],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required.'],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required.'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required.'],
    trim: true,
  },
});

const studentSchema = new Schema<Student>({
  id: {
    type: String,
    unique: true,
    required: [true, "Student ID is Required."],
    trim: true,
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female'],
      message: '{VALUE} is not valid',
    },
    required: [true, 'Gender is required.'],
    trim: true,
  },
  dateOfBirth: { type: String, trim: true },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required.'],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required.'],
    trim: true,
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required.'],
    trim: true,
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      message: '{VALUE} is not a valid Blood Group',
    },
    trim: true,
  },
  presentAddress: { type: String, required: [true, 'Present address is required.'], trim: true },
  permanentAddress: { type: String, required: [true, 'Permanent address is required.'], trim: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String, trim: true },
  isActive: {
    type: String,
    enum: ['Active', 'blocked'],
    default: 'active',
    trim: true,
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
