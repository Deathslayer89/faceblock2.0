// import React, { useEffect, useState } from "react";

// const ViewCourses = ({ program }) => {
//   console.log(program);
//   const [courses, setCourses] = useState([])

//     useEffect(()=>{
//       async function getCourses() {
//         const res = await fetch("/api/mongo/courses", {
//           method: "POST",
//           headers: {
//             "content-Type": "application/json",
//           },
//           body: JSON.stringify({program}),
//         });
//         const courseList = await res.json();
//         setCourses(courseList);
//         console.log(courses);
//       }
//       getCourses();
//     },[])

//   return (

//     <div>
//       {courses.map((course, i) => {
//         return (
//           <div key={i} className="bg-gray-400">
//             {course.name}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ViewCourses;

import React, { useEffect, useState } from "react";

const ViewCourses = ({ program }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function getCourses() {
      const res = await fetch("/api/mongo/courses", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ program }),
      });
      const courseList = await res.json();
      setCourses(courseList);
    }
    getCourses();
  }, []);

  return (
    <div>
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Courses for Program: {program}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {courses.map((course, i) => (
            <div key={i} className="bg-green-400 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
              <p className="text-gray-800">{course.facultyAssigned}</p>
              <p className="text-gray-800">{course.code}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCourses;
