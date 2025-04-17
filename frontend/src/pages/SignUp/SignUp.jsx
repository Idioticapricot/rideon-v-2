import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../Login/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../utils/supabaseClient";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Confirmation message
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Email validation
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSignUp = async (e) => {
    e.preventDefault();

    setError('');
    setMessage(''); // Reset messages on new submission

    // Validate the fields
    if (!name) {
      setError("Name is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid Email");
      return;
    }

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      const { user, error } = await supabase.auth.signUp({
        name,
        email,
        password,
        options: {
          data: {
            full_name: name, // Store name in user_metadata
          },
        },
      });

      if (error) throw error;

      // Reset form fields
      setEmail("");
      setName("");
      setPassword("");

      // Set confirmation message
      setMessage("Check your inbox for the confirmation email.");

      // Optionally, redirect to login page
      // navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen pt-16">
        <div className="w-96 bg-zinc-900/95 backdrop-blur-sm rounded-2xl px-7 py-10 shadow-xl border border-zinc-800">
          <form onSubmit={handleSignUp}>
            <h1 className="text-2xl font-bold mb-7 text-green-500">Sign Up</h1>
            
            <div className="flex items-center bg-zinc-800 border border-zinc-700 px-5 rounded-lg mb-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full text-sm bg-transparent py-3 mr-3 rounded border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent text-white placeholder-gray-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex items-center bg-zinc-800 border border-zinc-700 px-5 rounded-lg mb-4">
              <input
                type="text"
                placeholder="Email"
                className="w-full text-sm bg-transparent py-3 mr-3 rounded border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent text-white placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

            <button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Sign Up
            </button>

            <p className="text-sm text-center mt-4 text-gray-400">
              Already registered?{" "}
              <Link to="/login" className="font-medium text-green-500 hover:text-green-400 transition-colors">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
