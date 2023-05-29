import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

const About = () => {
  return (
    <div><Navbar />
      <div className="bg-gray-900 h-max py-10 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">About Us</h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3">
              <p className="mb-6 text-white">
                Welcome to our Technology Website - Your One-Stop Destination for Facial Recognition Attendance System Using Blockchain Technology! At our website, we are dedicated to providing cutting-edge solutions to modern attendance management challenges. Our flagship product is a state-of-the-art facial recognition attendance system that leverages the power of blockchain technology to provide a secure, efficient, and transparent way of managing attendance records for organizations of all sizes.
              </p>
              <p className="mb-6 text-white">
                With years of experience in the technology industry, our team of experts brings a wealth of knowledge and expertise to the table. Our in-depth understanding of facial recognition technology and blockchain technology allows us to design and develop highly secure and efficient attendance management solutions that are tailored to the unique requirements of our clients. We are committed to continuous innovation, research, and development to deliver cutting-edge solutions that cater to the evolving needs of our clients.
              </p>
              <p className="mb-6 text-white">
                Our vision is to revolutionize the way organizations manage attendance by leveraging the power of blockchain technology and facial recognition technology. We believe that by combining these two groundbreaking technologies, we can create a future where attendance management is secure, efficient, and transparent, helping organizations save time and resources while ensuring accurate attendance tracking.
              </p>
            </div>
            <div className="md:w-1/3">
              <img
                src="/about.jpg"
                alt="About Us"
                className="rounded-lg h-auto w-full object-cover flex items-center pl-8"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
