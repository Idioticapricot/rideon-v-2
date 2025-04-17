import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen pt-16">
        <div className="w-96 bg-zinc-900/95 backdrop-blur-sm rounded-2xl px-7 py-10 shadow-xl border border-zinc-800">
          <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
          <p className="text-lg mb-6 text-white">Page Not Found</p>
          <p className="text-sm mb-6 text-gray-400">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/dashboard" className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold px-4 py-2 rounded-lg transition-colors block text-center">
            Go back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
