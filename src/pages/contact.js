import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/router';
const ContactUs = () => {
  const router = useRouter();
  const [suggestion, setSuggestion] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const handleSuggestion = (e) => {
    setSuggestion(e.target.value)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitMessage = async (e) => {
    e.preventDefault();
    console.log('im in submit message')
    console.log(formData)
    try {
      const res = await fetch('/api/mongo/message', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({ formData })
      })
      const response = await res.json();
      console.log(response)
      setFormData({
        name: '',
        email: '',
        message: ''
      })
      alert(response);
      router.reload();
    } catch (err) {
      console.log(err)
    }
  }

  const submitSuggestion = async () => {
    console.log(suggestion)
    try {
      const res = await fetch('/api/mongo/suggest', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({ suggestion })
      })
      const response = await res.json();
      console.log(response)
      setSuggestion('');
      alert(response);
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div><Navbar />
      <div className="bg-gray-900 text-white py-10 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <form onSubmit={submitMessage} className="flex flex-col">
            <label htmlFor="name" className="text-gray-500 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              name="name"
              className="bg-gray-800 border border-gray-700 rounded-md py-2 px-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              placeholder="Your Name"
            />
            <label htmlFor="email" className="text-gray-500 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              name="email"
              className="bg-gray-800 border border-gray-700 rounded-md py-2 px-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              placeholder="Your Email"
            />
            <label htmlFor="message" className="text-gray-500 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="bg-gray-800 border border-gray-700 rounded-md py-2 px-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              placeholder="Your Message"
            ></textarea>
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">Have a suggestion?</h3>
            <p className="text-gray-500 mb-6">
              We welcome your feedback and suggestions. Please feel free to share your thoughts with us using the suggestion box below.
            </p>
            <textarea
              id="suggestion"
              name="suggestion"
              onChange={handleSuggestion}
              value={suggestion}
              rows="4"
              className="bg-gray-800 border border-gray-700 rounded-md py-2 px-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              placeholder="Your Suggestion"
            ></textarea>
            <button
              type="submit"
              onClick={submitSuggestion}
              className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            >
              Submit Suggestion
            </button>
          </div>
          <div className="mt-12">
            <h3 className="text-lg font-bold mb-2">Contact Details</h3>
            <p className="text-gray-500 mb-2">
              Email: info@example.com
            </p>
            <p className="text-gray-500 mb-2">
              Phone: +1 123-456-7890
            </p>
            <p className="text-gray-500 mb-2">
              Address: 1234 Main St, City, State, ZIP Code
            </p>
          </div>
          <div className="mt-12">
            <h3 className="text-lg font-bold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>

  );
}
export default ContactUs