/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */
import connectMongo from "../../../lib/mongodb";
import Attendance from "../../../models/Attendance";
export default async function handler(req, res) {
    await connectMongo();
    console.log(req.body);
    const { courseCode, classIndex, rollNo } = req.body;
    const docs = await Attendance.findOne({ courseCode })
    var attendanceData=docs.attendanceData[classIndex-1]
    console.log(attendanceData.join(''))
    if(attendanceData[rollNo-1]==1){
        console.log(attendanceData[rollNo-1]);
        attendanceData[rollNo-1]=0
    }else{
        console.log(attendanceData[rollNo-1]);
        attendanceData[rollNo-1]=1
    }
    const filter={courseCode}
    const update={
        $set:{
            [`attendanceData.${classIndex-1}`]:attendanceData
        }
    }
    const updateDocument=await Attendance.findOneAndUpdate(filter,update,{new:true});
    const updatedString=updateDocument.attendanceData[classIndex-1].join('')
    console.log(updatedString)
    res.json({newData:updatedString})
}
/**zero indexed attendance */