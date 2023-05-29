import {Schema,model,models} from "mongoose";

 const HODSchema=new Schema({
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
    role:{
        type:String,
        default:"hod"
    },
    facultiesUnderControl:{
        type:[String]
    }
});

const HOD = models.HOD || model('HOD',HODSchema);
export default HOD