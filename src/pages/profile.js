import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import HodProfile from '@/components/HodProfile';
import FacultyProfile from '@/components/FacultyProfile';
import StudentProfile from '@/components/StudentProfile';
import Navbar from '@/components/Navbar';

const Profile = () => {
  const [hod, setHod] = useState('');
  const router = useRouter();
  const [role, setRole] = useState('');
  const { data: session } = useSession();
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    if (session) {
      setRole(session.user.role);
    }
  }, [session]);

  useEffect(() => {
    if (session && role === 'hod') {
      setHod(hod);
    }
  }, [session]);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar/>
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-end">
          <button
            onClick={() =>{
              setLoading(true);
               signOut()}}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
          >
            Sign Out
          </button>
        </div>
        <br />
        {role === 'hod' ? (
          <HodProfile hod={hod} />
        ) : role === 'faculty' ? (
          <FacultyProfile />
        ) : (
          <StudentProfile />
        )}
      </div>
    </div>
  );
};

export default Profile;
