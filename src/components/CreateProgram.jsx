import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CreateProgram() {
  const { data: session } = useSession();
  const [hod, setHod] = useState("");
  const router=useRouter();
  console.log(session.user.email);
  const [formData, setFormData] = useState({
    name: "",
    maxStrength: "",
    hod: hod,
  });
  useEffect(() => {
    setHod(session.user.email);
  }, [session.user.email]);
  useEffect(() => {
    setFormData({ ...formData, hod: hod });
  }, [hod]);
  const [formErrors, setFormErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const errors = validateFormData(formData);

    if (Object.keys(errors).length === 0) {
      const response = await fetch("/api/mongo/createProgram", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      alert(data.name + " is added");
      setFormData({ name: "", maxStrength: "" });
      setFormErrors({});
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

    if (!data.maxStrength) {
      errors.maxStrength = "Max strength is required";
    }
    return errors;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4">Create Program</h2>
        <form className="flex-col" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ex: Bsc 2020-2023"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
            />
            {formErrors.name && <div className="text-red-500 text-sm mt-1">{formErrors.name}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="maxStrength" className="block mb-2 text-sm font-medium text-gray-700">
              Max strength
            </label>
            <input
              type="number"
              id="maxStrength"
              name="maxStrength"
              value={formData.maxStrength}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
            />
            {formErrors.maxStrength && (
              <div className="text-red-500 text-sm mt-1">{formErrors.maxStrength}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Create Program
          </button>
        </form>
      </div>
    </div>
  );
}
