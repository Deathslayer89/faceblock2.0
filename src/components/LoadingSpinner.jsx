import React from "react";
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon from react-icons library

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <FaSpinner className="animate-spin text-white text-9xl" />
    </div>
  );
};

export default LoadingSpinner;
