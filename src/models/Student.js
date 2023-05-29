import { Schema, models, model } from "mongoose"

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true,
        unique: true
    },
    program: {
        type: String,
        requried: true
    },
    coursesEnrolled: {
        type: [String]
    },
    bloodGroup: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        requried: true
    },role:{
        type:String,
        required:true,
        default:'student'
    }
})
const student = models.Student || model('Student', studentSchema)
export default student