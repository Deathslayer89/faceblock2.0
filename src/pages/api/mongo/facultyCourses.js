/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */
import connectMongo from "../../../lib/mongodb";
import Course from "../../../models/Course";
import Faculty from "../../../models/Faculty";
export default async function handler(req, res) {
    console.log('connecting....')
    await connectMongo();
    console.log('connected')
    console.log(req.body)
    const {faculty}=req.body
    console.log(faculty)
    try {
        const teacher = await Faculty.findOne({ email:faculty })
        const courseCodes = teacher.CoursesTeaching;
        const courses = await Course.find({ code: { $in: courseCodes } }).exec()
        res.json(courses)
        console.log(courses)
    }
    catch (err) {
        console.error(err)

    }

}

