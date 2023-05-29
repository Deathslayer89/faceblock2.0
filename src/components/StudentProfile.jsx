import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Course from "./Course";
import Enroll from "./Enroll"; // Import the Enroll component
import LoadingSpinner from "./LoadingSpinner";

const StudentProfile = () => {
  const { data: session } = useSession();
  const [courses, setCourses] = useState(null);
  const [email, setEmail] = useState(null);
  const [showCourse, setShowCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [showEnroll, setShowEnroll] = useState(false);
  const [showCourses, setShowCourses] = useState(true);
  const [programCourses, setProgramCourses] = useState(null);
  const [rollNo, setRollNo] = useState(null);
  const [uid, setUid] = useState(null);
  const [unEnrolled, setUnEnrolled] = useState(null);
  useEffect(() => {
    if (session) {
      setEmail(session.user.email);
    }
  }, [session]);

  const handleButtonClick = async (course) => {
    setSelectedCourse(course);
    fetchAttendanceData();
    setShowCourse(true);
  };

  const renderCourses = () => {
    return courses.map((course, i) => {
      return (
        <div key={i} className="my-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleButtonClick(course)}
          >
            {course}
          </button>
        </div>
      );
    });
  };

  const fetchAttendanceData = async () => {
    try {
      const res = await fetch(
        "/api/mongo/studentattendance",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({ selectedCourse }),
        }
      );
      const data = await res.json();
      setAttendanceData(data.attendanceData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch(
        "/api/mongo/studentCourses",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );
      const data = await res.json();
      setCourses(data.coursesEnrolled);
      setUnEnrolled(data.unenrolled);
      setUid(data.rollNo)
      var roll =data.rollNo.slice(-2);
      roll = parseInt(roll, 10);
      setRollNo(roll);
      console.log(courses, unEnrolled, rollNo);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEnrollButtonClick = () => {
    
    setShowCourses(false);
    setShowEnroll(true);
  };

  const handleCoursesButtonClick = () => {
    setShowCourses(true);
    setShowEnroll(false);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-2xl font-bold mb-4">Student Profile</div>
        <div>
          <div className="mb-4 justify-center gap-10 flex">
            <div>
              <button
                className={`px-4 py-2 rounded-lg ${
                  showCourses
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
                onClick={() => {
                  handleCoursesButtonClick();
                  fetchCourses();
                }}
              >
                Click for Courses
              </button>
            </div>
            <div>
              <button
                className={`px-4 py-2 rounded-lg ${
                  showEnroll
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
                onClick={handleEnrollButtonClick}
              >
                Enroll Courses
              </button>
            </div>
          </div>
          {showCourses ? (
            <div>
              <h4>List of courses:</h4>
              {courses ? renderCourses() : <LoadingSpinner />}
              <div>
                {showCourse && (
                  <Course
                    course={selectedCourse}
                    attendanceData={attendanceData}
                    roll={rollNo}
                  />
                )}
              </div>
            </div>
          ) : (
            <Enroll unEnrolled={unEnrolled} roll={uid} />
          )}
        </div>
      </div>
    </div>
  );
};
export default StudentProfile;
