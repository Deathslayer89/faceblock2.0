
import { Schema,models,model } from "mongoose";

const FacultySchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    hod:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'faculty',
        required:true
    },
    CoursesTeaching:{
        type:[String]
    }
    
});

const Faculty = models.Faculty ||  model('Faculty',FacultySchema);
export default Faculty