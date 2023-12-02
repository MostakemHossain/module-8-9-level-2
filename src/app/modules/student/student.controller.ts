import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sentResponse';
import { studentServices } from './student.service';


// higher order function->catchAsync

const getSingleStudent = catchAsync(async (req, res) => {
 
    const { studentId } = req.params;
    const result = await studentServices.getSingleAllStudentFromDB(studentId);
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"student is retrieved Successfully",
      data:result
  
    });
   
   
});



const getAllStudents = catchAsync( async (req, res) => {
  
    const result = await studentServices.getAllStudentFromDB();
    
   
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"student is retrieved Successfully",
      data:result
  
    });
 
});

const updateStudent= catchAsync( async (req, res) => {
 
  const { studentId } = req.params;
  const {student}= req.body;
  const result = await studentServices.updateStudentIntoDB(studentId,student);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"student is updated Successfully",
    data:result

  });

});


const deleteStudent= catchAsync( async (req, res) => {
 
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentFromDB(studentId);
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"student is deleted Successfully",
      data:result
  
    });
  
});

export const studentControllers = {
 
  getAllStudents,
  getSingleStudent,
  deleteStudent,
   updateStudent,
};
