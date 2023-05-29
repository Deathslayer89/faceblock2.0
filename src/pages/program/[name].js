// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import CreateCourse from "@/components/CreateCourse";
// import ViewCourses from "@/components/ViewCourses";
// const program = () => {
//   const [showCreateCourse, setShowCreateCourse] = useState(false);
//   const [showViewCourses, setShowViewCourses] = useState(false);

//   const toggleCreateCourse = () => {
//     setShowCreateCourse(true);
//     setShowViewCourses(false);
//   };
//   const toggleViewCourses = () => {
//     setShowViewCourses(true);
//     setShowCreateCourse(false);
//   };

//   const router = useRouter();
//   const name = router.query.name;
  
  
//   return (
//     <>

//       <div>{name}</div>
//       <div>
//         <button onClick={toggleCreateCourse}>create course</button>
//         <button onClick={toggleViewCourses}>View Courses</button>
//       </div>
//       <div>
//         {showCreateCourse && <CreateCourse program={name} />}
//         {showViewCourses && <ViewCourses program={name} />}
//       </div>
//     </>
//   );
// };

// export default program;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CreateCourse from "@/components/CreateCourse";
import ViewCourses from "@/components/ViewCourses";
import Navbar from "@/components/Navbar";

const Program = () => {
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [showViewCourses, setShowViewCourses] = useState(false);

  const toggleCreateCourse = () => {
    setShowCreateCourse(true);
    setShowViewCourses(false);
  };
  const toggleViewCourses = () => {
    setShowViewCourses(true);
    setShowCreateCourse(false);
  };

  const router = useRouter();
  const name = router.query.name;

  return (
  <div>
    <Navbar/>
    <div className="bg-gray-900 min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="text-3xl font-semibold mb-6 text-white">{name}</div>
      <div className="flex gap-4 mb-4">
        <button
          onClick={toggleCreateCourse}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Create Course
        </button>
        <button
          onClick={toggleViewCourses}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          View Courses
        </button>
      </div>
      <div className="flex items-center justify-center">
        {showCreateCourse && <CreateCourse program={name} />}
        {showViewCourses && <ViewCourses program={name} />}
      </div>
    </div>
    </div>
  );
};

export default Program;
