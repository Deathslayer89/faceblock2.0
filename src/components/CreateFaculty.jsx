import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function CreateFaculty() {
  const router=useRouter();
  const { data: session } = useSession();
  const [hod, setHod] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    hod: hod,
  });
  useEffect(() => {
    setFormData({ ...formData, hod: hod });
  }, [hod]);
  useEffect(() => {
    setHod(session.user.email);
  }, [session.user.email]);

  const [formErrors, setFormErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const errors = validateFormData(formData);

    if (Object.keys(errors).length === 0) {
      console.log(formData);
      const response = await fetch("/api/mongo/createFaculty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      const { name } = result;
      setFormData({ name: "", email: "", password: "" });
      setFormErrors({});
      alert(name + " is added");
      router.push('/profile');
    } else {
      setFormErrors(errors);
    }
  }

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function validateFormData(data) {
    console.log(data);
    const errors = {};
    if (!data.name) {
      errors.name = "Name is required";
    }
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }
    return errors;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <form className="flex-col max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="block mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 w-full rounded-md text-black"
        />
        {formErrors.name && <div className="error text-red-500 mt-1">{formErrors.name}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 w-full rounded-md text-black"
        />
        {formErrors.email && <div className="error text-red-500 mt-1">{formErrors.email}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="password" className="block mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className=" border-gray-300 px-3 py-2 w-full rounded-md text-black"
          />
          {formErrors.password && <div className="error text-red-500 mt-1">{formErrors.password}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="hod" className="block mb-1">
            HOD
          </label>
          <input
            type="text"
            id="hod"
            name="hod"
            value={hod}
            readOnly
            className="bg-gray-100 border border-gray-300 px-3 py-2 w-full rounded-md text-black"
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
          >
            Add Faculty
          </button>
        </div>
      </form>
    );
  }
  
