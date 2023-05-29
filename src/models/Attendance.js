import { Schema, models, model } from "mongoose";

const attendanceSchema = new Schema({
    courseCode: {
        type: String,
        unique: true,
        required:true,
        index:true
    },
    dates: {
        type: [String],
        default:[],
        index:true
    },
    attendanceData: {
        type: [[Number]],
        default:[],
        validate: {
            validator: function (arr) {
                // Ensure that the array is 2-dimensional
                return Array.isArray(arr) && arr.every(innerArr => Array.isArray(innerArr));
            },
            message: 'Attendance data must be a 2-dimensional array'
        }
    }
});
const Attendance = models.Attendance || model("Attendance", attendanceSchema)

export default Attendance