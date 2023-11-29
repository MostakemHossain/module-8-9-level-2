import catchAsync from '../../utils/catchAsync';
import { studentServices } from './student.service';


// higher order function->catchAsync

const getSingleStudent = catchAsync(async (req, res) => {
 
    const { studentId } = req.params;
    const result = await studentServices.getSingleAllStudentFromDB(studentId);
    res.status(200).json({
      status: true,
      message: 'student is retrieved Successfully',
      data: result,
    });
   
});



const getAllStudents = catchAsync( async (req, res) => {
  
    const result = await studentServices.getAllStudentFromDB();
    res.status(200).json({
      status: true,
      message: 'student are retrieved Successfully',
      data: result,
    });
 
});


const deleteStudent= catchAsync( async (req, res) => {
 
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      status: true,
      message: 'student is deleted Successfully',
      data: result,
    });
  
});

export const studentControllers = {
 
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
