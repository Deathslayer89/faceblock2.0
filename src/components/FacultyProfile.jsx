
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import FacultyCourses from "./FacultyCourses";
// import { ethers } from "ethers";
// import { useSession } from "next-auth/react";
// import LoadingSpinner from "./LoadingSpinner";

// const FacultyProfile = () => {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [courses, setCourses] = useState(null);
//   const [faculty, setFaculty] = useState("");
//   const [account, setAccount] = useState(null);

//   useEffect(() => {
//     if (session) {
//       setFaculty(session.user.email);
//     }
//   }, []);

//   useEffect(() => {
//     async function getCourses() {
//       const res = await fetch("/api/mongo/facultyCourses", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ faculty }),
//       });
//       const data = await res.json();
//       setCourses(data);
//     }
//     getCourses();
//   }, [faculty]);

//   const connectWallet = async () => {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     await window.ethereum.request({ method: "eth_requestAccounts" });
//     const signer = provider.getSigner();
//     const address = await signer.getAddress();
//     setAccount(address);
//   };

//   if (courses === null) {
//     return(<LoadingSpinner/>);
//   }

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className=" p-8 rounded-lg shadow-md max-w-md">
//         <h1 className="text-3xl font-bold mb-4">Faculty Profile</h1>
//         <div className="flex justify-between items-center mb-4">
//           <button
//             onClick={connectWallet}
//             className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md focus:outline-none hover:bg-blue-600"
//           >
//            {account ? `wallet connected ${account}`: 'connect wallet'}
//           </button>
//         </div>
//         <FacultyCourses courseList={courses} />
//       </div>
//     </div>
//   );
// };

// export default FacultyProfile;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FacultyCourses from "./FacultyCourses";
import { ethers } from "ethers";
import { useSession } from "next-auth/react";
import LoadingSpinner from "./LoadingSpinner";

const FacultyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [courses, setCourses] = useState(null);
  const [faculty, setFaculty] = useState("");
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (session) {
      setFaculty(session.user.email);
    }
  }, []);

  useEffect(() => {
    async function getCourses() {
      const res = await fetch("/api/mongo/facultyCourses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ faculty }),
      });
      const data = await res.json();
      setCourses(data);
    }
    getCourses();
  }, [faculty]);

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
  };

  if (courses === null) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Faculty Profile</h1>
        <div className="mb-4">
          <button
            onClick={connectWallet}
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md focus:outline-none hover:bg-blue-600"
          >
            {account ? `Wallet Connected: ${account}` : "Connect Wallet"}
          </button>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <FacultyCourses courseList={courses} />
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
