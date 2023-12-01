/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sentResponse';
import { AcademicSemesterServices } from './academicSemseter.service';

const createAcademicSemester = catchAsync(async (req, res) => {

    const result= await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);

  

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Academic Semester is created successfully",
    data:result

  });
});
const getAllAcademicSemesters= catchAsync(async (req,res)=>{
    
    const result= await await AcademicSemesterServices.getAllAcademicSemesterFromDB();
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic semesters are retrieved successfully",
        data:result
    
      });
})

const getSingleAcademicSemester= catchAsync(async (req,res)=>{
    const {semesterId}= req.params;
    const result= await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semester is retrieved succesfully',
        data: result,
      });
})

const updateAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
      semesterId,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is Updated succesfully',
      data: result,
    });
  });

export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    updateAcademicSemester,
};
