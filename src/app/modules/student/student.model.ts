// student.model.ts

import bcrypt from "bcrypt";
import { model, Schema } from 'mongoose';
import validator from 'validator';
import config from "../../config";
import { StudentModel, TGuardian, TLocalGuardian, TStudent, UserName } from './student.interface';
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "First name is required."],
    maxlength: [20, "First name cannot be more than 20 characters"],
    trim: true,
    // validate: {
    //   validator: function (value: string) {
    //     const res = value.charAt(0).toUpperCase() + value.slice(1);
    //     return value === res;
    //   },
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required."],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father name is required."],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father occupation is required."],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father contact number is required."],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "Mother name is required."],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother occupation is required."],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother contact number is required."],
    trim: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
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

const studentSchema = new Schema<TStudent,StudentModel>({
  id: {
    type: String,
    unique: true,
    required: [true, "Student ID is required."],
    trim: true,
  },
  password: {
    type: String,
    unique: true,
    required: [true, "Student Password is required."],
    maxlength:[20,'Password cannot be more than 20 characters']
   
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
    
  },
  dateOfBirth: { type: String, trim: true },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required.'],
    trim: true,
    // validate:{
    //   validator:(value:string)=> validator.isEmail(value),
    //   message:"{VALUE} is not a valid Email",
    // }
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
  permanentAddress: { type: String },
  guardian: {
    type: guardianSchema,
   
  },
  localGuardian: {
    type: localGuardianSchema,
  
  },
  profileImg: { type: String, trim: true },
  isActive: {
    type: String,
    enum: ['Active', 'Blocked'],
    default: 'Active',
    trim: true,
  },
});


// pre save middleWare/hook: will work on save function and create()
studentSchema.pre('save',async function(next){
  // console.log(this,'pre hook: we will save the data');
  // hashing password and save into db
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user= this;
  user.password= await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds))
  next();
  
})

// post save middleWare/hook
studentSchema.post('save',function(){
  // console.log(this,'post hook: we  saved our data');
  
})









// creating a custom static method

studentSchema.statics.isUserExists= async function(id:string){
  const existingUser= await Student.findOne({id});
  return existingUser;
}



// creating a custom instance method
// studentSchema.methods.isUserExists= async function(id:string){
//   const existingUser= await Student.findOne({id})
//   return existingUser;
// }

export const Student = model<TStudent,studentModel>('Student', studentSchema);
