import httpStatus from 'http-status';
import { model, Schema } from 'mongoose';
import appError from '../../../errors/AppError';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.constant';
import { TAcademicSemester } from './AcademicSemester.interface';


const academicSemseterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum:AcademicSemesterName,
  },
  year: {
    type: String,
    required: true,
  },
  code:{
    
    type: String,
    required: true,
    enum:AcademicSemesterCode,
  },
  startMonth:{
    type:String,
    enum:Months,
    required: true,

  },
  endMonth:
  {
    type:String,
    enum:Months,
    required: true,

  }


});

 academicSemseterSchema.pre('save', async  function(next){
    const isSemesterExists= await AcademicSemester.findOne({
        year:this.year,
        name: this.name,
    })
    if(isSemesterExists){
        throw new appError(httpStatus.NOT_FOUND,'Semester is Already exists');
    }
    next();
 })


export const AcademicSemester= model<TAcademicSemester>('AcademicSemester',academicSemseterSchema);