import mongoose from "mongoose";
const connectMongo=async()=>mongoose.connect(process.env.MONGOURI
,{
    useUnifiedTopology:true,
})

export default connectMongo