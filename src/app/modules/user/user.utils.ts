import { TAcademicSemester } from "../AcademicSemester/AcademicSemester.interface";
import { User } from "./user.model";


const findLastStudentId= async ()=>{
    const lastStudent= await User.findOne({
        role:'student',
    },{
        id:1,
        _id:0
    })
    .sort({
        createdAt:-1,
    })
    
    .lean()

    return lastStudent?.id ? lastStudent.id : undefined
};




 // year semesterCode 4 digitNumber
 export const generateStudentId= async (payload: TAcademicSemester)=>{
    // first time
    let currentId= (0).toString(); // by default 0000

    // 2030 01 0001
    const lastStudentId= await findLastStudentId();
    const lastStudentSemesterCode= lastStudentId?.substring(4,6);// 01
    const lastStudentSemesterYear= lastStudentId?.substring(0,4);// 2030

    const currentSemesterCode= payload.code;
    const currentSemesterYear= payload.year;

    if(lastStudentId && lastStudentSemesterCode===currentSemesterCode && lastStudentSemesterYear=== currentSemesterYear){
        currentId= lastStudentId.substring(6);//0001
    }

    let incrementId= (Number(currentId)+1).toString().padStart(4,'0');

    incrementId=`${payload.year}${payload.code}${incrementId}`;
    return incrementId;
      
}