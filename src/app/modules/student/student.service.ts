import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  if( await Student.isUserExists(studentData.id)){
    throw Error('user already exists');
   }

  const result = await Student.create(studentData);// buildin static method

  


  // const student= new Student(studentData); // create an instance
  // if( await student.isUserExists(studentData.id)){
  //   throw Error('user already exists');
  // }
  // const result = await student.save(); // build in instance method

  return result;
};

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
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleAllStudentFromDB,
  deleteStudentFromDB
};
