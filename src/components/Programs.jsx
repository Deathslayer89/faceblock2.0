// import {useRouter} from 'next/router'
// import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// const Programs = ({hod}) => {
//   const {data:session}=useSession();
//   const [programs, setPrograms] = useState([])
//   useEffect(()=>{
//     async function getPrograms(){
//       const res=await fetch('/api/mongo/hodPrograms',{
//         method:'POST',
//         headers:{
//           'content-Type':'application/json'
//         },data:JSON.stringify(hod)
//       });
//       const data=await res.json();
//       console.log(data);
//       setPrograms(data)
//     }
//     getPrograms();
//   },[])
//   const router=useRouter();
//   return (
//   <div>
//     <h1>List of all programs</h1>
//     {
//       programs.map((program,i)=>{
//         return(
//           <div key={i} className="bg-gray-400 flex-col gap-7">
//             <button onClick={()=>{
//               router.push(`/program/${program.name}`)
//             }}>
//               {program.name}
//             </button>
//           </div>
//         )
//       })
//     }
//   </div>);
// };

// export default Programs;
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Programs = ({ hod }) => {
  const { data: session } = useSession();
  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    async function getPrograms() {
      const res = await fetch("/api/mongo/hodPrograms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hod),
      });
      const data = await res.json();
      console.log(data);
      setPrograms(data);
    }
    getPrograms();
  }, []);
  const router = useRouter();
  return (
    <div className=" min-h-screen p-4">
      <h1 className="text-3xl font-semibold mb-6 text-white-800">List of all programs</h1>
      <div className="flex flex-col gap-6">
        {programs.map((program, i) => {
          return (
            <div
              key={i}
              className="bg-gray-400 p-4 rounded-md cursor-pointer hover:bg-gray-500 transition duration-200"
            >
              <button
                onClick={() => {
                  router.push(`/program/${program.name}`);
                }}
                className="text-white font-semibold"
              >
                {program.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Programs;
