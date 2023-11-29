import { RequestHandler } from 'express';
import { studentServices } from './student.service';





const getAllStudents:RequestHandler = async (req, res,next) => {
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

const getSingleStudent:RequestHandler = async (req, res,next) => {
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
const deleteStudent:RequestHandler = async (req, res,next) => {
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
