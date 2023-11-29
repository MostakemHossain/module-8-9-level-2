/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;



  const result = await userServices.createStudentIntoDB(password, studentData);
  res.status(200).json({
    status: true,
    message: 'student is created Successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
