import React, { useEffect, useState } from 'react'
import Verify from './Verify'

const Course = ({ course, attendanceData ,roll}) => {
  const [verifyData, setVerifyData] = useState(false)
  console.log(course,attendanceData,roll);
  console.log(typeof(roll))
  const handleClick = () => {
    setVerifyData(!verifyData)
  }

  const renderAttendanceTable = () => {
    // Extract the attendance data for the selected roll no (index 2)
    const rollNo = roll // Replace with the desired roll no
    const attendance = attendanceData.map((data) => data[rollNo])
  
    // Render table rows
    return attendance.map((attendanceStatus, i) => {
      return (
        <tr key={i}>
          <td className='border px-4 py-2'>{i + 1}</td>
          <td className='border px-4 py-2'>{attendanceStatus === 1 ? 'Present' : 'Absent'}</td>
        </tr>
      )
    })
  }
  
  return (
    <div className='flex flex-col items-center justify-center'>
      <h3 className='text-2xl font-bold mb-6'>Your Attendance Data for Course {course}</h3>
      <table className='border-collapse border border-gray-500'>
        <thead>
          <tr>
            <th className='border px-4 py-2'>Class No.</th>
            <th className='border px-4 py-2'>Attendance</th>
          </tr>
        </thead>
        <tbody>{attendanceData ? renderAttendanceTable() : <tr><td>Loading attendance data...</td></tr>}</tbody>
      </table>
      <div className='mt-10 text-white'>
        If you are suspecting the attendance data, you can verify the same on the blockchain.
        <div className='mt-4'>
          <button
            className='bg-blue-500 text-white font-bold px-4 py-2 rounded-md'
            onClick={handleClick}
          >
            {verifyData ? 'Hide Verification' : 'View on Blockchain'}
          </button>
        </div>
      </div>
      {verifyData && <Verify course={course} rollNo={roll} />}
    </div>
  )
}

export default Course
