import {Schema,models,model} from 'mongoose';
const CourseSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    program:{
        type:String,
        required:true
    },
    code:{
        type:String,
        require:true,
        unique:true
    },
    studentsEnrolled:{
        type:[String]
    },
    facultyAssigned:{
        type:String,
        required:true
    }
})
const Course = models.Course || model("Course",CourseSchema);
export default Course

