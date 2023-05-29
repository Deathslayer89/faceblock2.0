import { useRouter } from 'next/router';
import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const Enroll = ({ unEnrolled,roll }) => {
  const router=useRouter()
  const [selectedItems, setSelectedItems] = useState([]);
  console.log(roll)
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, value]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== value)
      );
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    // Do something with the selectedItems array, e.g., send it to the server
    console.log(selectedItems)
    // Reset the form
    try{
      const res=await fetch('/api/mongo/enroll',{
        method:'POSt',
        headers:{
          'content-Type':'application/json'
        },
        body:JSON.stringify({selectedItems,roll})
      })
      const response=await res.json()
      console.log(response)
      alert('enrolled');
      router.reload();
    }catch(err){
      console.log(err)
    }
    setSelectedItems([]);
  };
if (unEnrolled==null){
  return (<LoadingSpinner/>)
}
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto rounded-md shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Select Items:</h2>
      {unEnrolled.length > 0 ? (
        unEnrolled.map((item, index) => (
          <label key={index} className="flex items-center mb-2">
            <input
              type="checkbox"
              value={item}
              checked={selectedItems.includes(item)}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <span>{item}</span>
          </label>
        ))
      ) : (
        <p>No items to display.</p>
      )}
      <br />
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default Enroll;
