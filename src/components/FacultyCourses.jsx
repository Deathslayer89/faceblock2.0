import React from 'react'
import { useRouter } from 'next/router'

const Courses = ({ courseList }) => {
  const router = useRouter();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">List of courses assigned:</h2>
      <div className="p-4 rounded-md">
        {courseList.map((course, i) => {
          return (
            <div key={i} className="p-2 mb-2 rounded-md">
              <button
                onClick={() => {
                  router.push(`/course/${course.code}`);
                }}
                className="relative w-full h-12 bg-blur bg-blue-800 border border-blue-500 rounded-md overflow-hidden focus:outline-none"
              >
                <span className="absolute inset-0 flex items-center justify-center text-white hover:text-blue-600 font-medium">
                  {course.name}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Courses
