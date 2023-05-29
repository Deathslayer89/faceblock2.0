/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
import student from '@/models/Student';
import connectMongo from '../../../lib/mongodb';
import Program from '@/models/Program';

export default async function handler(req, res) {
  // Extract email from request body
  const { email } = req.body;
 console.log(email)
 var programCourses;
 var coursesEnrolled;
 var rollNo;
  try {
    // Connect to MongoDB
    await connectMongo();
    console.log(email);
    // Find student document based on email
    const docs = await student.findOne({'email':email });

    if (docs) {
      console.log(docs.program);
      coursesEnrolled=docs.coursesEnrolled;
      rollNo=docs.rollNo;
      try{
        const program=await Program.findOne({'name':docs.program});
        programCourses=program.courses;
      }catch(err){
        console.log(err)
      }
      console.log({coursesEnrolled,programCourses,rollNo});
      var unenrolled=programCourses.filter((e)=> !coursesEnrolled.includes(e))
      console.log(unenrolled)
      res.json({coursesEnrolled,unenrolled,rollNo});
    } else {
      console.log('Student not found or coursesEnrolled property not found');
      res.status(404).json({ error: 'Student not found or coursesEnrolled property not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
