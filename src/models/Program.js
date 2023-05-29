import { Schema, models, model } from 'mongoose'

const ProgramSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    maxStrength: {
        type: Number,
        required: true,
    },
    courses: {
        type: [String]
    },
    hod: {
        type: String,
        required: true,
    }
})
const Program = models.Program || model('Program', ProgramSchema)
export default Program