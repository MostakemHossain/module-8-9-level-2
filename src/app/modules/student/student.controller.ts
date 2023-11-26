import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';





const getAllStudents = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await studentServices.getAllStudentFromDB();
    res.status(200).json({
      status: true,
      message: 'student are retrieved Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleAllStudentFromDB(studentId);
    res.status(200).json({
      status: true,
      message: 'student is retrieved Successfully',
      data: result,
    });
  } catch (err ) {
  
    next(err);
  }
};
const deleteStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      status: true,
      message: 'student is deleted Successfully',
      data: result,
    });
  } catch (err ) {
    next(err);
  }
};

export const studentControllers = {
 
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
