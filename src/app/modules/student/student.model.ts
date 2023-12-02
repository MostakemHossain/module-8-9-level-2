// student.model.ts

import httpStatus from 'http-status';
import { model, Schema } from 'mongoose';
import validator from 'validator';
import appError from '../../../errors/AppError';
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
  user:{
    type:Schema.Types.ObjectId,
    required: [true, "User id is required."],
    unique:true,
    ref:"User",
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female','Other'],
      message: '{VALUE} is not valid',
    },
    required: [true, 'Gender is required.'],
    
  },
  dateOfBirth: { type: Date, trim: true },
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
  admissionSemester:{
    type: Schema.Types.ObjectId,
    ref:'AcademicSemester',

  },
  academicDepartment:{
    type:Schema.Types.ObjectId,
    ref:'AcademicDepartment',
  },
  isDeleated:{
    type:Boolean,
    default:false
  },
  
},{
  toJSON:{
    virtuals:true,
  }
});


  studentSchema.virtual('fullName').get(function(){
    return `${this.name.firstName} ${this.name.middleName}`;
  })


  studentSchema.pre('findOneAndUpdate',async function(next){
    const query= this.getQuery();
    const isDepartmentExists= await Student.findOne(
        query
    )
    if(!isDepartmentExists){
        throw new appError(httpStatus.NOT_FOUND,"Student Id is not exists");
    }
    next();

} )




// Query middleWare

studentSchema.pre('find',function(next){
  this.find({isDeleated: { $ne:true}})


  next();
})
studentSchema.pre('findOne',function(next){
  this.find({isDeleated: { $ne:true}})


  next();
})

studentSchema.pre('aggregate',function(next){
  this.pipeline().unshift({$match:{isDeleated:{$ne: true}}})


  next();
})
















// creating a custom static method

studentSchema.statics.isUserExists= async function(id:string){
  const existingUser= await Student.findOne({id});
  return existingUser;
}



export const Student = model<TStudent,StudentModel>('Student', studentSchema);
