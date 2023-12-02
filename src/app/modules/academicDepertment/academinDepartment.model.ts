import httpStatus from "http-status";
import { model, Schema } from "mongoose";
import appError from "../../../errors/AppError";
import { TAcademicDepartment } from "./academicDepertment.interface";

const academicDepartmentSchema= new Schema<TAcademicDepartment>({

    name:{
        type:String,
        required:true,
        unique:true,
    },
    academicFaculty:{
        type:Schema.Types.ObjectId,
        ref:"AcademicFaculty"
    },

},
{
    timestamps: true  
})





academicDepartmentSchema.pre('save', async function(next){
    const isDepartmentExists= await AcademicDepartment.findOne({
        name:this.name,
    })
    if(isDepartmentExists){
        throw new appError(httpStatus.NOT_FOUND,"This department is already exists");
    }
    next();
})





export const AcademicDepartment= model('AcademicDepartment',academicDepartmentSchema)

