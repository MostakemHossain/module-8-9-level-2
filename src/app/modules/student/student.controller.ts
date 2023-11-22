import { Request, Response } from 'express';
import { studentServices } from './student.service';
import studentValidationSchema from './student.validation';


const createStudent = async (req: Request, res: Response) => {
  try {

    // data validation with Zod
    


    
    //send response
    const { student: studentData } = req.body;

    // data validation with joi
    // const {error,value}= studentSchema.validate(studentData)
     //will call service function to send this data

    //student validation using Zod
    const zodParsedData= studentValidationSchema.parse(studentData);


     const result = await studentServices.createStudentIntoDB(zodParsedData);
    // if(error){
    //   res.status(500).json({
    //     status: false,
    //     message: 'Something went wrong',
    //     error
    //   });
      
    // }

   

    // send response
    res.status(200).json({
      status: true,
      message: 'student is created Successfully',
      data: result,
    });
  } catch (err : any) {
    res.status(500).json({
      status: false,
      message: err.message || 'Something went wrong',
      error:err,
    });
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
    res.status(500).json({
      status: false,
      message: 'Something went wrong',
      error:err,
    });
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
