// import React, { useState } from "react";
// import CreateFaculty from "./CreateFaculty";
// import CreateProgram from "./CreateProgram";
// import Programs from "./Programs";

// const HodProfile = ({hod}) => {
//   const [selectedwork, setSelectedwork] = useState("");
//   const handleButtonClick = (work) => {
//     setSelectedwork(work);
//   };
//   return (
//     <>
//       <div className="flex-col flex items-center justify-center h-screen">
//         {/* <ul className="gap-10">
//             <li><CreateFaculty/></li>
//             <li><CreateProgram/></li>
//             <li><Programs Programs={props.programs}/></li>
//           </ul> 
          

//           <button
//           className={`px-4 py-2 rounded-lg ${
//             selectedButton === "buttonOne"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-300"
//           }`}
//           onClick={() => handleButtonClick("buttonOne")}
//         >
//           Button One
//         </button>
//            */}
          

//         <div className="flex space-x-4">
//           <button onClick={()=>handleButtonClick('createFaculty')}> Create Faculty </button>
//           <button onClick={()=>handleButtonClick('createProgram')}>CreateProgram</button>
//           <button onClick={()=>handleButtonClick('viewPrograms')}>View Programs</button>
//         </div>
          
//         <div className="pt-10">
//         {selectedwork==='createFaculty'&& <CreateFaculty/>}
//         {selectedwork==='createProgram'&&<CreateProgram/>}
//         {selectedwork==='viewPrograms'&&<Programs hod={hod}/>}
//         </div>
//       </div>
//     </>
//   );
// };

// export default HodProfile;

import React, { useState } from "react";
import CreateFaculty from "./CreateFaculty";
import CreateProgram from "./CreateProgram";
import Programs from "./Programs";

const HodProfile = ({ hod }) => {
  const [selectedWork, setSelectedWork] = useState("");

  const handleButtonClick = (work) => {
    setSelectedWork(work);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex space-x-4 mt-8">
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedWork === "createFaculty"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => handleButtonClick("createFaculty")}
        >
          Create Faculty
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedWork === "createProgram"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => handleButtonClick("createProgram")}
        >
          Create Program
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedWork === "viewPrograms"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => handleButtonClick("viewPrograms")}
        >
          View Programs
        </button>
      </div>

      <div className="mt-8">
        {selectedWork === "createFaculty" && <CreateFaculty />}
        {selectedWork === "createProgram" && <CreateProgram />}
        {selectedWork === "viewPrograms" && <Programs hod={hod} />}
      </div>
    </div>
  );
};

export default HodProfile;
