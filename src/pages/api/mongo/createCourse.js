/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */

import connectMongo from '../../../lib/mongodb'
import Faculty from '@/models/Faculty';
import HOD from '@/models/HOD';
import Course from '@/models/Course';
import Program from '@/models/Program';
import Attendance from '@/models/Attendance';
export default async function handler(req, res) {
    console.log('im in create course api')
    await connectMongo();
    console.log(req.body)
    const { name, code, facultyAssigned, program } = req.body;
    try {
        const course = await Course.create({ name, code, facultyAssigned, program });
        console.log(course);
        const faculty = await Faculty.findOneAndUpdate({ 'name':facultyAssigned }, { $push: { CoursesTeaching: code } }, { new: true })
        console.log(faculty);
        const progr = await Program.findOneAndUpdate({ 'name':program }, { $push: { courses: code } }, { new: true })
        console.log(progr);
        const atten=await Attendance.create({courseCode:code});
        console.log(atten);
        res.json(course)
    } catch (err) {
        console.log(err)
    }
}
