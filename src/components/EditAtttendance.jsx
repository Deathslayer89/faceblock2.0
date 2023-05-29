import React, { useState } from "react";
import { editAttendance } from "@/lib/web3";
const EditAttendance = () => {
  const [classIndex, setClassIndex] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [rollNo, setRollNo] = useState("");

   const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic here
    // e.g. make API call, update state, etc.
    try{
       const res= await fetch('/api/mongo/editAttendance',{
        method:'POST',
        headers:{
          'content-Type':'application/json'
        },
        body:JSON.stringify({courseCode,classIndex,rollNo})
       })
       const response=await res.json();
       console.log(response);
       try{
          const web3res=await editAttendance(courseCode,classIndex,response.newData);
          setClassIndex('')
          setCourseCode('')
          setRollNo('');

          if(web3res){
            alert('Edited Successfully!!')
          }else{
            alert('try again');
          }
       }catch(err){
        console.log(err)
       }
    }catch(e){
      console.log(e)
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Attendance</h2>
      <form onSubmit={handleSubmit} className="w-64 mx-auto">
        <div className="mb-4">
          <label htmlFor="classIndex" className="block font-medium mb-2">
            Class No.
          </label>
          <input
            type="text"
            id="classIndex"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring text-black focus:ring-blue-500"
            value={classIndex}
            onChange={(e) => setClassIndex(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="courseCode" className="block font-medium mb-2">
            Course Code
          </label>
          <input
            type="text"
            id="courseCode"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 text-black"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rollNo" className="block font-medium mb-2">
            Roll No
          </label>
          <input
            type="text"
            id="rollNo"
            className="w-full p-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditAttendance;
