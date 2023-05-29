import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/2">
            <p className="text-lg">
              &copy; {new Date().getFullYear()} FaceBlock. All Rights Reserved.
            </p>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <div className="flex justify-center items-center">
              <a
                href="https://twitter.com/faceblock"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4"
              >
                <i className="fab fa-twitter text-3xl"></i>
              </a>
              <a
                href="https://www.facebook.com/faceblock"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4"
              >
                <i className="fab fa-facebook-f text-3xl"></i>
              </a>
              <a
                href="https://www.instagram.com/faceblock"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram text-3xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
