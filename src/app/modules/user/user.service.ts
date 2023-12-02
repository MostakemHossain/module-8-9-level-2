import httpStatus from 'http-status';
import mongoose from 'mongoose';
import appError from '../../../errors/AppError';
import config from '../../config';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create user object
  const userData: Partial<TUser> = {};

  // if password is not given use default password
  userData.password = password || (config.default_pass as string);

  //set stuent role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new appError(httpStatus.NOT_FOUND, 'error');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user(transaction-1)
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new appError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    //create a student
    if (Object.keys(newUser).length) {
      // array
      //set id _id as user
      payload.id = newUser[0].id; //embedding
      payload.user = newUser[0]._id; // refercnce _id

      // create a student(transaction-2)
      const newStudent = await Student.create([payload], { session });

      if (!newStudent.length) {
        throw new appError(httpStatus.BAD_REQUEST, 'Failed to create student');
      }

      await session.commitTransaction();
      await session.endSession();

      return newStudent;
    }
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new appError(httpStatus.BAD_REQUEST,"Failed to create Student");
  }
};

export const userServices = {
  createStudentIntoDB,
};
