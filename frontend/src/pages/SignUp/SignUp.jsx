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
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h1 className="text-2xl mb-7">SignUp</h1>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-600 text-sm">{message}</p>}
            <button type="submit" className="btn-primary">
              SignUp
            </button>
            <p className="text-sm text-center mt-4">
              Already registered?
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
