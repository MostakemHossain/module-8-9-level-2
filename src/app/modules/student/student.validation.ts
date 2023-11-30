import { z } from 'zod';
const userNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20),
    middleName: z.string().optional(),
    lastName: z.string().min(1) 
  });
  
  const guardianValidationSchema = z.object({
    fatherName: z.string().min(1),
    fatherOccupation: z.string().min(1),
    fatherContactNo: z.string().min(1),
    motherName: z.string().min(1),
    motherOccupation: z.string().min(1),
    motherContactNo: z.string().min(1),
  });
  
  const localGuardianValidationSchema = z.object({
    name: z.string().min(1),
    occupation: z.string().min(1),
    contactNo: z.string().min(1),
    address: z.string().min(1),
  });
  
  const createStudentValidationSchema = z.object({
    body:z.object({
      password: z.string().max(20),
     student:z.object({
      name: userNameValidationSchema,
      gender: z.enum(['Male', 'Female','Other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string().min(1),
      emergencyContactNo: z.string().min(1),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']).optional(),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().optional(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().optional(),
      admissionSemester:z.string(),
     })
   
    }),
  })

  export const studentValidations={
    createStudentValidationSchema
  };