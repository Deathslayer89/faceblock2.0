
/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */
import fs from 'fs'
import mongoose from 'mongoose';
export default async function handler(req, res) {
    console.log(req.body);
    const{img}=req.body;
    console.log(img)
    const imgbin=fs.readFileSync(img);
    console.log(imgbin)
    res.status(200).json({imgData:imgbin})

}

