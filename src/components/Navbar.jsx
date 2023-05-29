import React from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-gray-900 text-white py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 rounded-full mr-4"
          />
          <h1 className="text-xl font-semibold">FaceBlock</h1>
        </div>
        <ul className="flex items-center gap-5">
          <li>
            <Link href="/" passHref>
              <span
                className={`${
                  router.pathname === "/" ? "text-blue-500" : "hover:text-gray-300"
                } cursor-pointer`}
              >
                Home
              </span>
            </Link>
          </li>
          <li>
            <button
              onClick={() => signIn()}
              // className={`${
              //   router.pathname === "/" ? "bg-blue-500" : "hover:text-gray-300"
              // } cursor-pointer`}   
              className="hover:text-gray-300">
              Get Started
            </button>
          </li>
          <li>
            <Link href="/registration" passHref>
              <span
                className={`${
                  router.pathname === "/registration"
                    ? "text-blue-500"
                    : "hover:text-gray-300"
                } cursor-pointer`}
              >
                Registration
              </span>
            </Link>
          </li>
          <li>
            <Link href="/about" passHref>
              <span
                className={`${
                  router.pathname === "/about" ? "text-blue-500" : "hover:text-gray-300"
                } cursor-pointer`}
              >
                About
              </span>
            </Link>
          </li>
          <li>
            <Link href="/contact" passHref>
              <span
                className={`${
                  router.pathname === "/contact" ? "text-blue-500" : "hover:text-gray-300"
                } cursor-pointer`}
              >
                Contact Us
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
