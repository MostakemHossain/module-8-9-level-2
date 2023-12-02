import { z } from 'zod';
const createUserNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20),
    middleName: z.string().optional(),
    lastName: z.string().min(1) 
  });
  
  const createLocalguardianValidationSchema = z.object({
    fatherName: z.string().min(1),
    fatherOccupation: z.string().min(1),
    fatherContactNo: z.string().min(1),
    motherName: z.string().min(1),
    motherOccupation: z.string().min(1),
    motherContactNo: z.string().min(1),
  });
  
  const createLocalGuardianValidationSchema = z.object({
    name: z.string().min(1),
    occupation: z.string().min(1),
    contactNo: z.string().min(1),
    address: z.string().min(1),
  });
  
  const createStudentValidationSchema = z.object({
    body:z.object({
      password: z.string().max(20),
     student:z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['Male', 'Female','Other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string().min(1),
      emergencyContactNo: z.string().min(1),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']).optional(),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().optional(),
      guardian: createLocalguardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      profileImg: z.string().optional(),
      admissionSemester:z.string(),
     })
   
    }),
  })
  const updateUserNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20).optional(),
    middleName: z.string().optional(),
    lastName: z.string().min(1).optional(),
  });
  
  const updateLocalguardianValidationSchema = z.object({
    fatherName: z.string().min(1).optional(),
    fatherOccupation: z.string().min(1).optional(),
    fatherContactNo: z.string().min(1).optional(),
    motherName: z.string().min(1).optional(),
    motherOccupation: z.string().min(1).optional(),
    motherContactNo: z.string().min(1).optional(),
  });
  
  const updateLocalGuardianValidationSchema = z.object({
    name: z.string().min(1).optional(),
    occupation: z.string().min(1).optional(),
    contactNo: z.string().min(1).optional(),
    address: z.string().min(1).optional(),
  });
  
  const updateStudentValidationSchema = z.object({
    body: z.object({
      password: z.string().max(20).optional(),
      student: z.object({
        name: updateUserNameValidationSchema.optional(),
        gender: z.enum(['Male', 'Female', 'Other']).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email().optional(),
        contactNo: z.string().min(1).optional(),
        emergencyContactNo: z.string().min(1).optional(),
        bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']).optional(),
        presentAddress: z.string().min(1).optional(),
        permanentAddress: z.string().optional(),
        guardian: updateLocalguardianValidationSchema.optional(),
        localGuardian: updateLocalGuardianValidationSchema.optional(),
        profileImg: z.string().optional(),
        admissionSemester: z.string().optional(),
      }),
    }),
  });

  export const studentValidations={
    createStudentValidationSchema,
    updateStudentValidationSchema 
  };