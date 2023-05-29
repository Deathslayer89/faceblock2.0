import {Schema,models,model} from 'mongoose'

const MessageSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }

})
const Message=models.Message || model("Message",MessageSchema)
export default Message