/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */
import Suggestion from "@/models/Suggestion";
import connectMongo from "../../../lib/mongodb";

export default async function handler(req, res) {
    await connectMongo();
    console.log(req.body)
    const{suggestion}=req.body;
    try{
        const sugg=await Suggestion.create({suggestion})
        if(sugg){
            res.json('successfully submitted')
        }else{
            res.json('FAILED TO SUBMIT SUGGESTION')
        }
    }catch(err){
        console.log(err)
    }
}

/**zero indexed attendance */