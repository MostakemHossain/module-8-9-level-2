import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const academicFaculySchema= new Schema<TAcademicFaculty>({
    name:{
        type:String,
        required:[true,"Name is required"],
        unique:true
    }
},
{
    timestamps:true,
})

export const AcademicFaculty= model<TAcademicFaculty>("AcademicFaculty",academicFaculySchema);
