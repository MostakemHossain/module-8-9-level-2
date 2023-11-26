import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../../config";
import { TUser } from "./user.interface";

const userSchema= new Schema<TUser>({
    id:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    needsPasswordChange:{
        type:Boolean,
        default:true,
    },
    role:{
        type:String,
        enum:['admin','student','faculty'],
    },
    status:{
        type:String,
        enum:['in-progress','blocked'],
        default:"in-progress"
    },
    isDeleted:{
        type:Boolean,
        default:false,
    } 

},{
    timestamps:true
})

// pre save middleWare/hook: will work on save function and create()
userSchema.pre('save',async function(next){
    
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user= this; // current doc
    user.password= await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds))
    next();
    
  })
  
  // set empty string after saving password
  userSchema.post('save',function(doc,next){
    // console.log(this,'post hook: we  saved our data');
    doc.password=""
    next();
    
  })

export const User= model<TUser>('user',userSchema);