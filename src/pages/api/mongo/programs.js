/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */
import connectMongo from "../../../lib/mongodb";
import Program from "@/models/Program";
export default async function handler(req, res) {
    try {
        console.log('connecting....')
        await connectMongo();
        console.log('connected')
        const data = await Program.find({})
        console.log(data);
        res.send(data);
    } catch (err) {
        console.error(err)
    }

}
