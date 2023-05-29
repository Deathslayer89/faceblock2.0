/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
import student from '@/models/Student';
import connectMongo from '../../../lib/mongodb';
import Course from '@/models/Course';

export default async function handler(req, res) {
    await connectMongo();
  // Extract email from request body
    console.log(req.body)
    const {roll,selectedItems}=req.body
    try{
       
        const UpdatedDoc=await student.findOneAndUpdate({'rollNo':roll},{$push:{coursesEnrolled:{$each:selectedItems}}},{new:true})
        console.log(UpdatedDoc)

        const docs=await Course.updateMany({code:{$in:selectedItems}},{$addToSet:{studentsEnrolled:{$each:[roll]}}});
        console.log(docs);
        res.json('success');
    }catch(err){
        console.log(err);
    }
}
