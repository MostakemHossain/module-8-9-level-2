/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import handleValidationError from '../../errors/validationError';
import { TErrorSources } from '../../interface/error';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

  //setting different values
let statusCode = err.statusCode || 500;
  let message = err.message || 'Something Went Wrong';

  let errorSources:TErrorSources=[{
    path:"/",
    message:'Something went Wrong'

  }]

 

  if(err instanceof ZodError){
    const simplifiedError= handleZodError(err);
    statusCode= simplifiedError?.statusCode;
    message=simplifiedError?.message;
    errorSources=simplifiedError?.errorSources;
  }else if(err?.name==="ValidationError"){
    const simplifiedError= handleValidationError(err);
    statusCode= simplifiedError?.statusCode;
    message=simplifiedError?.message;
    errorSources=simplifiedError?.errorSources;

  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
  
   stack: config.NODE_ENV==='development'?err?.stack:null
  });
};
export default globalErrorHandler;
