import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";


const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10 text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
          <p className="text-lg mb-6">Page Not Found</p>
          <p className="text-sm mb-6">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
