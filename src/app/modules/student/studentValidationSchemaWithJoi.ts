import Joi from "joi";

const userNameSchema = Joi.object({
    firstName: Joi.string().required().max(20).trim()
      .pattern(/^[A-Za-z]+$/),
    middleName: Joi.string().trim(),
    lastName: Joi.string().required().trim()
      .pattern(/^[A-Za-z]+$/),
  });
  
  const guardianSchema = Joi.object({
    fatherName: Joi.string().required().trim(),
    fatherOccupation: Joi.string().required().trim(),
    fatherContactNo: Joi.string().required().trim(),
    motherName: Joi.string().required().trim(),
    motherOccupation: Joi.string().required().trim(),
    motherContactNo: Joi.string().required().trim(),
  });
  
  const localGuardianSchema = Joi.object({
    name: Joi.string().required().trim(),
    occupation: Joi.string().required().trim(),
    contactNo: Joi.string().required().trim(),
    address: Joi.string().required().trim(),
  });
  
  const studentSchema = Joi.object({
    id: Joi.string().required().trim(),
    name: userNameSchema.required(),
    gender: Joi.string().required().valid('Male', 'Female').trim(),
    dateOfBirth: Joi.string().trim(),
    email: Joi.string().required().trim().email(),
    contactNo: Joi.string().required().trim(),
    emergencyContactNo: Joi.string().required().trim(),
    bloodGroup: Joi.string().trim().valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'),
    presentAddress: Joi.string().required().trim(),
    permanentAddress: Joi.string().trim(),
    guardian: guardianSchema.required(),
    localGuardian: localGuardianSchema.required(),
    profileImg: Joi.string().trim(),
    isActive: Joi.string().valid('Active', 'Blocked').default('Active').trim(),
  });

  export default studentSchema;