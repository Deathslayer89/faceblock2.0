/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */
import bcrypt from 'bcrypt'
import connectMongo from '../../../lib/mongodb'
import Faculty from '@/models/Faculty';
import HOD from '@/models/HOD';
export default async function handler(req, res) {
    console.log('im in CreateFacultyapi')
    await connectMongo();
    console.log(req.body)
    const {name,email,password,hod}=req.body;
    const passHash=await bcrypt.hash(password,10)
    const faculty=await Faculty.create({name,email,password:passHash,hod})

    const head=await HOD.findOneAndUpdate({email:hod},{$push:{facultiesUnderControl:email}},{new:true})
    console.log(head)
    console.log(faculty)
    res.json(faculty)
}
