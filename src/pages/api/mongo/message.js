
/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */
import Message from "@/models/Message";
import connectMongo from "../../../lib/mongodb";
export default async function handler(req, res) {

    console.log('connecting....')
    await connectMongo();
    console.log('connected')
    console.log(req.body)
    const { formData: {
        name, email, message
    }
    } = req.body;
    try {
        const doc = await Message.create({ name, email, message })
        if (doc) {
            res.json('Submitted succesfully')
        } else {
            res.json('failed submitting message')
        }
    }
    catch (err) {
        console.log(err)
    }
    console.log(req.body);

}

