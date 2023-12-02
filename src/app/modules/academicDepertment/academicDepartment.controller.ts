/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sentResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartmnt = catchAsync(async (req, res) => {

    const result= await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

  

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Academic Department is created successfully",
    data:result

  });
});
const getAllAcademicDepartments= catchAsync(async (req,res)=>{
    
    const result= await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic Departments are retrieved successfully",
        data:result
    
      });
})

const getSingleAcademicFaculty= catchAsync(async (req,res)=>{
    const {departmentId}= req.params;
    const result= await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department is retrieved succesfully',
        data: result,
      });
})

const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.updateAcademicDepartmentFromDB(
      departmentId,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is Updated successfuully',
      data: result,
    });
  });

export const AcademicDepartmentControllers = {
     createAcademicDepartmnt,
    getAllAcademicDepartments,
    getSingleAcademicFaculty,
     updateAcademicDepartment,
};
