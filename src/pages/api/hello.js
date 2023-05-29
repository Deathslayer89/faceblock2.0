/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */
import bcrypt from 'bcrypt'
import connectMongo from '../../lib/mongodb'
import Faculty from '@/models/Faculty';
import HOD from '@/models/HOD';
export default async function handler(req, res) {
    console.log('im in CreateFacultyapi')
    await connectMongo();
    console.log(req.body)
    const {email,password}={email:'sashi@ravenshaw.com',password:'Sashi@123'};
    const passHash=await bcrypt.hash(password,10)
    console.log(passHash)
    
}
