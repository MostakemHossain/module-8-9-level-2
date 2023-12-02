import httpStatus from 'http-status';
import mongoose from 'mongoose';
import appError from '../../../errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const getSingleAllStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  // aggrigate
  const result = await Student.findOne({id})
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const updateStudentIntoDB= async (id:string,payload:Partial<TStudent>)=>{


  const {name,guardian,localGuardian,...remainingStudentData}=payload;
  const modifiedUpdatedData:Record<string,unknown>={
    ...remainingStudentData
  }
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }


  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;

}


const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  

  try {
    
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleated: true },
      {
        new: true,
        session,
      },
    );
    if(!deletedStudent){
      throw new appError(httpStatus.BAD_REQUEST,"Failed to delete student");
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
    if(!deletedUser){
      throw new appError(httpStatus.BAD_REQUEST,"Failed to delete user");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
   await session.endSession();
   throw new appError(httpStatus.BAD_REQUEST,"Failed to delete Student");
  }
};

export const studentServices = {
  getAllStudentFromDB,
  getSingleAllStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
