import React from "react";

const Introduction = () => {
  return (
    <section className="bg-gray-800 text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-5xl font-semibold mb-4">
              Welcome to FaceBlock
            </h2>
            <p className="text-xl mb-6">
              A cutting-edge face recognition and attendance management system
              powered by blockchain technology. Say goodbye to traditional
              attendance methods and experience the future of secure and
              efficient attendance tracking.
            </p>
            <p className="text-xl mb-6">
              Our advanced facial recognition algorithms ensure accurate and
              reliable attendance tracking, while blockchain technology provides
              tamper-proof and transparent record-keeping for enhanced security.
            </p>
            <p className="text-xl mb-12">
              Join us today and revolutionize attendance management with
              FaceBlock. Get started now!
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 py-3 px-6 rounded-md text-xl font-semibold">
              Get Started
            </button>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <img
              src='/logo.png' // Replace with your own image URL
              alt="Introduction"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
