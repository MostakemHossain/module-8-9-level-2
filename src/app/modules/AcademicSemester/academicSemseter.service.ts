import httpStatus from 'http-status';
import appError from '../../../errors/AppError';
import { AcademicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './AcademicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (playload: TAcademicSemester) => {
  if (AcademicSemesterNameCodeMapper[playload.name] !== playload.code) {
    throw new appError(httpStatus.NOT_FOUND,'Invilid Semester Code');
  }

  const result = AcademicSemester.create(playload);

  return result;
};

const getAllAcademicSemesterFromDB= async()=>{
    const result = await AcademicSemester.find();
    return result;
}

const getSingleAcademicSemesterFromDB= async(id:string)=>{
    const result = await AcademicSemester.findById(id);
    return result;
}

const updateAcademicSemesterIntoDB= async(id:string,  payload:Partial<TAcademicSemester>)=>{

    if (
        payload.name &&
        payload.code &&
        AcademicSemesterNameCodeMapper[payload.name] !== payload.code
      ) {
        throw new appError(httpStatus.NOT_FOUND,'Invalid Semester Code');
      }

    const result= await AcademicSemester.findByIdAndUpdate({_id:id},payload,{
        new:true
    });
    return result;
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
