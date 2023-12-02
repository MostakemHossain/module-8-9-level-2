import { TAcademicDepartment } from "./academicDepertment.interface";
import { AcademicDepartment } from "./academinDepartment.model";


const createAcademicDepartmentIntoDB= async(payload:TAcademicDepartment)=>{
    const result = await AcademicDepartment.create(payload);
    return result;
    
}

const getAllAcademicDepartmentFromDB= async()=>{
    const result= await AcademicDepartment.find();
    return result;
}

const getSingleAcademicDepartmentFromDB= async(id:string)=>{
    const result= await AcademicDepartment.findById(id);
    return result;



}

const updateAcademicDepartmentFromDB= async (id:string,payload:Partial<TAcademicDepartment>)=>{
    const result= AcademicDepartment.findByIdAndUpdate({
        _id : id

    },
    payload,{
        new:true,
    })
    return result;
}

export const AcademicDepartmentServices= {
    createAcademicDepartmentIntoDB,
     getAllAcademicDepartmentFromDB,
     getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentFromDB 

}