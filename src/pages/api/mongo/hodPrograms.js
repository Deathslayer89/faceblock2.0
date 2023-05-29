/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */
import connectMongo from '../../../lib/mongodb'
import Program from '@/models/Program'
export default async function handler(req, res) {
    console.log('im in hodProgramApi')
    try {
        await connectMongo();
        console.log('connect')
        console.log(req.body)
        const programs = await Program.find({});
        console.log(programs)
        res.json(programs)
    } catch (err) {
        console.log(err)
    }
}
