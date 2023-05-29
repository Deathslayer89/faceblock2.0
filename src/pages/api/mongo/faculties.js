/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */
import connectMongo from "../../../lib/mongodb";
import Faculty from '../../../models/Faculty.js'
export default async function handler(req, res) {

  console.log('connecting....')
  await connectMongo();
  console.log('connected')
  try {

    const docs = await Faculty.find({})
    res.json(docs)
    console.log(docs)
  }
  catch (err) {
    console.error(err)
  }

}

