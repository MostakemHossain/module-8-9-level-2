// student.interface.ts

export interface UserName {
  firstName: string;
  middleName?: string; // Middle name is optional
  lastName: string;
}

export interface Guardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface LocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}

export interface Student {
  id: string;
  name: UserName;
  gender: 'Male' | 'Female'| 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress?: string; // Corrected the spelling of 'permanent'
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string; // Profile image is optional
  isActive?: 'Active' | 'Blocked'; // Corrected case for consistency
}
