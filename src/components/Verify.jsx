import React, { useState } from "react";
import { getAttendanceData } from "@/lib/web3";

const Verify = ({ rollNo, course }) => {
  const [classNo, setClassNo] = useState(null);
  const [response, setResponse] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await getAttendanceData(course, classNo, rollNo);
    console.log(res);
    if (res) {
      setResponse("Present");
    } else {
      setResponse("Absent");
    }
  };
  const handleClick = () => {
    window.open(
      "https://mumbai.polygonscan.com/address/0x2997590435992c894e1f1561421d659e7a597c6c",
      "_blank"
    );
  };
  return (
    <div className="pt-4">
      <h1 className="text-3xl font-bold mb-4">Verify</h1>
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="flex-row gap-5">
          <input
            className="w-32 border text-black rounded-md p-2 mr-4"
            type="number"
            value={classNo}
            onChange={(e) => setClassNo(e.target.value)}
            placeholder="Class No."
          />
          <button className="bg-blue-500 text-white font-bold rounded-md p-2">
            Submit
          </button>
          
          <button
            className="bg-blue-500 text-white font-bold rounded-md ml-14"
            onClick={handleClick}
          >
            View on Blockchain Explorer
          </button>
        </div>
      </form>
      {response && (
        <p className="text-white text-3xl items-center">{response}</p>
      )}
    </div>
  );
};

export default Verify;
