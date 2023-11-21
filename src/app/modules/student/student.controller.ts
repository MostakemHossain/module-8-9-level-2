import { Request, Response } from 'express';
import { studentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    //send response
    const { student: studentData } = req.body;

    //will call service function to send this data
    const result = await studentServices.createStudentIntoDB(studentData);

    // send response
    res.status(200).json({
      status: true,
      message: 'student is created Successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentFromDB();
    res.status(200).json({
      status: true,
      message: 'student are retrieved Successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleAllStudentFromDB(studentId);
    res.status(200).json({
      status: true,
      message: 'student is retrieved Successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
