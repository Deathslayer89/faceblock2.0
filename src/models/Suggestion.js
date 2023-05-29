import {Schema,models,model} from 'mongoose'

const SuggestionSchema=new Schema({
    suggestion:{
        type:String,
        require:true,
    }
})
const Suggestion=models.Suggestion || model("Suggestion",SuggestionSchema)
export default Suggestion