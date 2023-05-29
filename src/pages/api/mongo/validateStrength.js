/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */
import connectMongo from "../../../lib/mongodb";
import Program from '../../../models/Program'
import student from "@/models/Student";
export default async function handler(req, res) {
    await connectMongo();
    console.log(req.body)
    const { selectedProgram } = req.body;
    console.log(selectedProgram)
    try {
        const prog = await Program.findOne({ name: selectedProgram })
        const strength = prog.maxStrength

        const count = await student.countDocuments({ program: selectedProgram });
        console.log(count)
        res.json({
            maxStrength: count < strength,
            count: count
        });
    } catch (err) {
        console.log(err)
    }

}

/**zero indexed attendance */