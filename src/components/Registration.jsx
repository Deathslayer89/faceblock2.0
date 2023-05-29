import React, { useEffect, useState } from "react";
import { Base64 } from "js-base64";
import { useRouter } from "next/router";
const Registration = ({ program, count }) => {
  const router=useRouter();
  const rollno=generateRollNo(program,count);
  console.log(rollno);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    program: program,
    bloodGrp: "",
    image: "",
  });
  const [binaryImage, setBinaryImage] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
   
    bloodGrp: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    // Read image file as a data URL
    const reader = new FileReader();
    reader.readAsArrayBuffer(imageFile);
    reader.onload = function () {
      const imageData = new Uint8Array(reader.result);
      setBinaryImage(imageData);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const { name, email, password, rollNo, bloodGrp } = formData;
    let formIsValid = true;
    const errorsCopy = { ...errors };

    if (!name) {
      formIsValid = false;
      errorsCopy.name = "Name is required";
    } else {
      errorsCopy.name = "";
    }

    if (!email) {
      formIsValid = false;
      errorsCopy.email = "Email is required";
    } else {
      errorsCopy.email = "";
    }

    if (!password) {
      formIsValid = false;
      errorsCopy.password = "Password is required";
    } else {
      errorsCopy.password = "";
    }

    

    if (!bloodGrp) {
      formIsValid = false;
      errorsCopy.bloodGrp = "Blood Group is required";
    } else {
      errorsCopy.bloodGrp = "";
    }

    setErrors(errorsCopy);
    console.log(binaryImage);
    const base64 = Base64.fromUint8Array(binaryImage);
    if (formIsValid) {
      console.log(base64);
      console.log(rollno)
      console.log(formData)
      const res = await fetch("/api/mongo/registration", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, base64: base64 ,rollNo:rollno}),
      });
      // Perform form submission logic here
      const response = await res.json();
      if (response == 200) {
        alert("successfully registered");
        setFormData({
          name: "",
          email: "",
          password: "",
          program: program,
          rollNo: "",
          bloodGrp: "",
          image: "",
        });
        router.reload();
      }
      console.log("Form submitted:", formData);
    }
  };
  
  function generateRollNo(programName,count){
    let words=programName.split(' ');
    console.log(words);
    var program=words[0]
    var dept=words[1]
    var years=words[2];
    count=count+1
    const rollno=years.substring(2,4)+program+dept+count.toString().padStart(3,'0')
    return rollno
  }

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-8 max-w-md w-full rounded-md shadow-md">
        <h1 className="text-2xl text-white font-semibold mb-4">Registration</h1>
        <form className="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.name && <p className="text-red-500 mt-2">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 mt-2">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.password && (
              <p className="text-red-500 mt-2">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="rollNo" className="block text-white">
              Roll No:
            </label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              value={rollno}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.rollNo && (
              <p className="text-red-500 mt-2">{errors.rollNo}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="bloodGrp" className="block text-white">
              Blood Group:
            </label>
            <input
              type="text"
              id="bloodGrp"
              name="bloodGrp"
              value={formData.bloodGrp}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.bloodGrp && (
              <p className="text-red-500 mt-2">{errors.bloodGrp}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-white">
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {binaryImage == null ? (
              <p className="text-red-500 mt-2">Reupload the image</p>
            ) : (
              <p></p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default Registration;
