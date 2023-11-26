// student.interface.ts

import { Model, Types } from "mongoose";

export interface UserName {
  firstName: string;
  middleName?: string; // Middle name is optional
  lastName: string;
}

export interface TGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface TLocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}

export interface TStudent {
  id: string;
  user:Types.ObjectId
  password: string,
  name: UserName;
  gender: 'Male' | 'Female'| 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress?: string; // Corrected the spelling of 'permanent'
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string; // Profile image is optional
  isDeleated:boolean
}


// for creating static

export interface StudentModel extends Model<TStudent>{
 isUserExists(id:string): Promise<TStudent| null>
}



////--- for creating instance ---///

// export type studentMethods={
//   isUserExists(id:string): Promise<TStudent| null>
// }

// export type  studentModel = Model<TStudent,Record<string, never>,studentMethods>
