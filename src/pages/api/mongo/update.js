/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */
import mongoose from "mongoose";
import connectMongo from "../../../lib/mongodb";
import Attendance from "../../../models/Attendance";
import Program from '../../../models/Program'
export default async function handler(req, res) {
    var today;
    console.log('I AM IN UPDATE')
    await connectMongo();
    console.log('conneted');
    await mongoose.connection.syncIndexes();
    console.log(req.body)
    const { result, data, date } = req.body;
    function deleteFirstTwoDigits(obj) {
        const newObj = {};
        for (const key in obj) {
          const newKey = key.substring(2); 
          newObj[newKey] = obj[key]; 
        }
        return newObj;
      }
    const todayAttendance=deleteFirstTwoDigits(result);    
    console.log(todayAttendance);
    
     try {
        const docs = await Program.findOne({ courses: { $in: [data] } }).select('maxStrength');
        console.log(docs)
        const maxlimit=docs.maxStrength;
        console.log(maxlimit)
         today = Array.from({ length: maxlimit }, (_, i) => {
            const rollNo = Object.keys(todayAttendance).find(key => key.match(new RegExp(`${i + 1}$`)));
            return +(todayAttendance[rollNo] || false);
        });    
        console.log('todaycheck')
        console.log(today);
        try {
            const attendance = await Attendance.findOne({ courseCode: data })

            console.log(attendance)

            if (attendance) {
                console.log('updating ......')
                try {
                    console.log(date)
                    const result1 = await Attendance.findOne({ courseCode:data })
                    if(!result1.dates.includes(date)){
                        const updated = await Attendance.updateOne({ courseCode: data }, { $push: { dates: date,attendanceData:today } }, { new: true })
                        console.log(updated);
                        await mongoose.connection.syncIndexes();
                       

                    }else{
                        console.log('already date registered')
                        res.send(301).json({'msg':"same date already exists"});
                    }

                } catch (err) {
                    console.log(err)
                }
            } else {
                console.log('creating....')
                const attendance = await Attendance.create({ courseCode: data });
                await mongoose.connection.syncIndexes();
                await new Promise(resolve => setTimeout(resolve, 10000));//10 sec wait
                attendance.dates.push(date)
                attendance.attendanceData.push(today);
                const savedDoc = await attendance.save();
                console.log(savedDoc)
                await mongoose.connection.syncIndexes()
             
            }
        } catch (err) {
            console.log(err)
        }
    } catch (err) {
        console.error(err)
    }

    let attendanceValue = today.join('')
    console.log('todaycheck')
    console.log(today)
   
    

    const attendance = await Attendance.findOne({ courseCode: data});
    console.log(attendance)
    const datesLength = attendance.dates.length;
    console.log('attendanceValuecheck')
    console.log(attendanceValue)
    attendanceValue = attendanceValue.toString()
    res.json({ attendanceValue, classIndex: datesLength});

}

/**zero indexed attendance */
