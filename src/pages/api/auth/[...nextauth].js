import connectMongo from '@/lib/mongodb';
import Faculty from '@/models/Faculty';
import HOD from '@/models/HOD';
import Student from '@/models/Student';
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
export default NextAuth({
    session: {
        jwt: true
    },
    secret: "THISISJUSTASAMPLE",
    providers: [
        CredentialsProvider({
            credentials: {
                email: {
                    label: "email",
                    type: "email",
                    placeholder: "jsmith@abc.in",
                },
                password: { label: "Password", type: "password" },
                hod: { label: 'Hod', type: 'checkbox' },
                faculty: { label: "Faculty", type: "checkbox" },
                student: { label: 'Student', type: "checkbox" }

            },
            async authorize(credentials) {
                console.log(typeof (credentials));
                const { email, password, hod, faculty, student } = credentials;
                console.log({ email, password, hod, faculty, student });
                console.log(email, password, hod)

                try {
                    console.log('connecting....')
                    await connectMongo();
                    console.log('connected')
                    if (faculty == 'on' && hod == 'on' || hod == 'on' && student == 'on' || student == 'on' && faculty == 'on') {
                        return;
                    } else {
                        if (hod == 'on') {
                            const hod = await HOD.findOne({ email })
                            const hashpass = hod.password;
                            const ismatch = await bcrypt.compare(password, hashpass)

                            if (ismatch) {
                                return { email: hod.email, role: hod.role }
                            }

                        }
                        if (faculty == 'on') {
                            const faculty = await Faculty.findOne({ email })
                            const hashpass = faculty.password;
                            const ismatch = await bcrypt.compare(password, hashpass)
                            if (ismatch) {
                                return { email: faculty.email, role: faculty.role }
                            }
                        }
                        if (student == 'on') {
                            const student = await Student.findOne({ email })
                            const hashpass = student.password;
                            // const ismatch = await bcrypt.compare(password, hashpass)
                            if (password==hashpass) {
                                return { email: student.email, role: student.role }
                            }
                        }

                    }
                } catch (err) {
                    console.log('im in catch')
                    console.log(err)
                }
            }
        })


    ], callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            if (!session) return;

            session.user = token.user
            return session;
        }
    }

})