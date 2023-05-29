import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import Registration from '../components/Registration';
import LoadingSpinner from "@/components/LoadingSpinner";

const StudentForm = () => {
  const [programs, setPrograms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('default')
  const [loading, setLoading] = useState(null)
  const [count, setCount] = useState(null)
  useEffect(() => {
    async function fetchPrograms() {
      setLoading(true)
      try {
        const ProgramResponse = await fetch(
          "/api/mongo/programs"
        );
        const data = await ProgramResponse.json();
        const programs = data.map((item) => item.name);
        setPrograms(programs);
        console.log(programs)
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }

    fetchPrograms();
  }, []);

  const handleProgramSelect = (program) => {
    setSelectedProgram(program);
  };
  useEffect(() => {
    async function getStatus() {
      setLoading(true)
      const res = await fetch('/api/mongo/validateStrength', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({ selectedProgram })
      })
      const response = await res.json();
      console.log(response);
      setCount(response.count);
      setShowForm(response.maxStrength);
      setLoading(false)
      if (response == false) {
        alert('Maximum strength of the program is reached')
      }
    }
    getStatus();
  }, [selectedProgram])
  if (loading) {
    return (<LoadingSpinner />)
  }
  return (
    <div className="bg-gray-600 min-h-screen">
      <Navbar />
      <div className="max-w-full mx-auto p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md shadow-md">
        <h2 className="text-2xl text-center mb-6 text-white">Student Registration</h2>
        <label className="block mb-4">
          <span className="block text-white">Program:</span>
          <select
            name="program"
            onChange={(e) => {
              handleProgramSelect(e.target.value)
            }}
            value={selectedProgram}
            className="w-full px-4 py-2 rounded-md bg-gray-700 border-gray-300 text-white focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="default" disabled>
              Select Program
            </option>
            {programs.map((program) => (
              <option key={program} value={program}>
                {program}
              </option>
            ))}
          </select>
        </label>

        {showForm ? (
          <Registration program={selectedProgram} count={count} />
        ) : (
          <h1 className="text-white">
            {selectedProgram === 'default' ? '' : 'Maximum strength reached'}
          </h1>
        )}
      </div>
    </div>
  );

}

export default StudentForm;

