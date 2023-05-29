
/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */
import bodyParser from 'body-parser';
import Student from '../../../models/Student'
import connectMongo from '@/lib/mongodb';
import {toByteArray} from 'base64-js'
export default async function handler(req, res) {
  
  req.bodyParser=false;
    await connectMongo();
    console.log('connected')
    const {base64,email,name,password,rollNo,program,bloodGrp} = req.body;
    const decode=toByteArray(base64)
    console.log(decode);
    const buffer=Buffer.from(decode)
  try{
    const doc=await Student.create({name,email,password,bloodGroup:bloodGrp,program,rollNo,image:buffer})
   console.log(doc);
   res.send(200);
  }catch(err){
    console.log(err)
  }
}