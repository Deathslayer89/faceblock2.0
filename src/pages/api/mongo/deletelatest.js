/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
import Attendance from '@/models/Attendance';
import connectMongo from '../../../lib/mongodb';
import Attendance from '@/models/Attendance';
export default async function handler(req, res) {
    // Extract email from request body
    try {
        await connectMongo();
        console.log('im in delete latest');
        console.log(req.body);
        const course = req.body;
        const attendance = await Attendance.findOne({ courseCode: course });
        if (attendance) {
            attendance.dates.pop();
            attendance.attendnaceData.pop();
            await attendance.save();
            console.log(attendance);
        }

        res.json('sucess')
    } catch (err) {
        console.log(err);
    }
}
