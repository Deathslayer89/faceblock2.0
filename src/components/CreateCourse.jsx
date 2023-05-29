
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
function CreateCourse({program}) {
  const [name, setName] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [code, setCode] = useState('');
  const router=useRouter();
  useEffect(() => {
    async function fetchFaculties() {
      try {
        const facultiesResponse = await fetch('/api/mongo/faculties');
        console.log(facultiesResponse)
        const data=await facultiesResponse.json()
        const faculties=data.map((item)=>item.name)
        console.log(faculties)
        setFaculties(faculties);
        setSelectedProgram(program);
        console.log(selectedProgram);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFaculties();
  }, []);

  async function handleSubmit(event) {
    const formData = { name, program: selectedProgram, facultyAssigned: selectedFaculty, code };

    console.log(formData)
    event.preventDefault();
    try{
      const response=await fetch('/api/mongo/createCourse',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(formData)
      });
      const data=await response.json();
      console.log(data)
      alert(data.name +' is created' )
    }catch(err){
      console.log(err)
    }

    setCode('')
    setName('')
    setFaculties([]);
    setSelectedFaculty('');
    setSelectedProgram('');
    router.push('/profile')
  }

  return(
    <div className="flex justify-center items-center h-screen text-white">
      <form onSubmit={handleSubmit} className="w-96 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-8">Create Course</h2>
        <label className="block mb-4">
          Course Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2 mt-2 bg-gray-100 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </label>
        <label className="block mb-4">
          Program: {program}
        </label>
        <label className=" block mb-4">
          Faculty Assigned:
          <select value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)} required className="text-black w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select a faculty</option>
            {faculties.map((faculty,i) => (
              <option key={i} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </label>
        <label className="block mb-4">
          Course Code:
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required className="text-black w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </label>
        <button type="submit" className="block w-full py-2 mt-8 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          Create Course
        </button>
      </form>
    </div>
  );
}

export default CreateCourse;
