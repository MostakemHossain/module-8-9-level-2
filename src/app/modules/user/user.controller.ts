/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";

const createStudent = async (req: Request, res: Response,next:NextFunction) => {
    try {
  
    
      const {password ,student: studentData } = req.body;
  
    
  
      //student validation using Zod
    //   const zodParsedData= studentValidationSchema.parse(studentData);
  
  
       const result = await userServices.createStudentIntoDB(password,studentData);
      res.status(200).json({
        status: true,
        message: 'student is created Successfully',
        data: result,
      });
    } catch (err) {
     next(err);
    }
  };

export const UserControllers={
    createStudent
}