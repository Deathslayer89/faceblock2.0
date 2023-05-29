/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */
import connectMongo from '../../../lib/mongodb'
import Program from '@/models/Program'
export default async function handler(req, res) {
    console.log('im in CreateFacultyapi')
    try {
        await connectMongo();
        console.log(req.body)
        const { name, maxStrength, hod } = req.body;
        const program = await Program.create({ name, maxStrength, hod });
        console.log(program)
        res.json(program)
    } catch (err) {
        console.log(err)
    }
}
