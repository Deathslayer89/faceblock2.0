
/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */
import connectMongo from "../../../lib/mongodb";
import Attendance from "../../../models/Attendance";
export default async function handler(req, res) {

    console.log('connecting....')
    await connectMongo();
    console.log('connected')
    console.log('I AM IN ATTENDANCE DATA')
    console.log(req.body)
    const {selectedCourse}=req.body;
    console.log(selectedCourse)
    
    try {
        const docs = await Attendance.findOne({ 'courseCode' :selectedCourse})

        if (docs) {
            const attendanceData = docs.attendanceData
            const dates=docs.dates
            console.log(attendanceData,dates)
            res.status(200).json({ attendanceData,dates })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'server_error' })
    }





}

