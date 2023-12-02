import { Student } from './student.model';



const getAllStudentFromDB = async () => {
  const result = await Student.find().populate('admissionSemester').populate({
    path:"academicDepartment",
    populate:{
      path:"academicFaculty"
    }
  });
  return result;
};
const getSingleAllStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  // aggrigate
  const result = await Student.findById(id).populate('admissionSemester').populate({
    path:"academicDepartment",
    populate:{
      path:"academicFaculty"
    }
  });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id },{isDeleated:true });
  return result;
};

export const studentServices = {

  getAllStudentFromDB,
  getSingleAllStudentFromDB,
  deleteStudentFromDB
};
