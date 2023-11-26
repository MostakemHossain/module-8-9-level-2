import { Student } from './student.model';



const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleAllStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  // aggrigate
  const result= await Student.aggregate([
    {$match:{id:id}}
  ])
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
