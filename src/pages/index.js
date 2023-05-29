import Head from 'next/head';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Introduction from '../components/Introduction';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [loading, setLoading] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);

 useEffect(()=>{
  if (session) {
    setLoading(true)
    router.push('/profile');
  }

 },[session])
 if(loading){
   return (<LoadingSpinner/>)
 }
  return (
    <div className="bg-gray-900 text-white">
      <Head>
        <title>FaceBlock</title>
        <meta name="description" content="Face recognition and blockchain based attendance management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-6">
        
        <Navbar />
        <Introduction />
        <Footer />
      </div>
    </div>
  );
}
