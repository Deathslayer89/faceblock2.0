/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */

import connectMongo from '../../../lib/mongodb'

import Course from '@/models/Course';
export default async function handler(req, res) {
    console.log('im in view ')
    await connectMongo();
    console.log(req.body)
    const {program}=req.body;
    const courses=await Course.find({program});
    console.log(courses)
    res.json(courses);
}
