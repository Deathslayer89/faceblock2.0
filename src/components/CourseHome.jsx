import React, { useEffect, useState } from "react";
import AttendanceData from "./AttendanceData";
import { initInstructor, getInstructor, setAttendance } from "../lib/web3";
import EditAttendance from "./EditAtttendance";
import { useRouter } from "next/router";

const CourseHome = ({ course }) => {
  const [attendanceData, setAttendanceData] = useState({});
  const [todaysAttendance, setTodaysAttendance] = useState({});
  const [instructor, setInstructor] = useState("");
  const [selectedWork, setSelectedWork] = useState(null);
  const [date, setDate] = useState(null);
  const router = useRouter();

  const handleButtonClick = (work) => {
    setSelectedWork(work);
  };

  async function startClass() {
    console.log(date, validateDate);
    if (validateDate(date) === false) {
      alert("Enter date in dd-mm-yyyy format and try again.");
      return;
    }
    window.open("https://192.168.240.160:5000", "_blank");
    const response2 = await fetch("https://192.168.240.160:5000/api", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });
    const result = await response2.json();
    console.log(result);
    setTodaysAttendance(result);
    if (Object.keys(result).length == 0) {
      console.log("got empty data");
      const response = await fetch("https://192.168.240.160:5000/api/resend", {
        method: "GET",
      });
      const second_result = await response.json();
      console.log(second_result);
      setTodaysAttendance(second_result);

      const response3 = await fetch("/api/mongo/deletelatest", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });
      const deleteresponse = await response3.json();
      console.log(deleteresponse);
    }
    console.log("sending 2nd fetch");
    const res = await fetch("/api/mongo/update", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        result,
        data: course,
        date: date,
      }),
    });
    const updatedData = await res.json();
    console.log(updatedData);
    if (updatedData === 301) {
      alert("Already a class has been taken on that date.");
    } else {
      try {
        const res = await setAttendance(
          course,
          updatedData.classIndex,
          updatedData.attendanceValue
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  function validateDate(dateString) {
    if (dateString) {
      var regex = /^(\d{2})-(\d{2})-(\d{4})$/;
      var match = dateString.match(regex);

      if (match === null) {
        return false;
      } else {
        var day = parseInt(match[1], 10);
        var month = parseInt(match[2], 10);
        var year = parseInt(match[3], 10);

        if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1000) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return false;
    }
  }

  async function initiate() {
    try {
      console.log(course);
      const response = await initInstructor(course);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    router.reload();
  }

  useEffect(() => {
    async function instructor() {
      try {
        const res = await getInstructor(course);
        setInstructor(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    instructor();
  }, []);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-md">
      <div>
        {instructor !== "0x0000000000000000000000000000000000000000" ? (
          <p className="mb-2">The instructor is set to: {instructor}</p>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Initiate Attendance by Setting Up Instructor
            </h2>
            <button
              className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={initiate}
            >
              Set Up
            </button>
          </div>
        )}
      </div>
      <br />
      <div>
        <h2 className="text-xl font-semibold mb-4">Take a Class of {course}</h2>
        <label htmlFor="date">Select Date:</label>
        <input
          type="text"
          placeholder="dd-mm-yyyy"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <button
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={startClass}
        >
          Start Class
        </button>
      </div>
      <br />
      <div className="justify-center flex flex-row gap-7">
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedWork === "ViewAttendance"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => handleButtonClick("ViewAttendance")}
        >
          View Attendance
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedWork === "EditAttendance"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => handleButtonClick("EditAttendance")}
        >
          Edit Attendance
        </button>
      </div>
      <div className="mt-8">
        {selectedWork === "EditAttendance" && <EditAttendance />}
        {selectedWork === "ViewAttendance" && <AttendanceData />}
      </div>
    </div>
  );
};

export default CourseHome;
