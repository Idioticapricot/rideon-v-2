import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import supabase from "../../utils/supabaseClient";

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      navigate("/dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen pt-16">
        <div className="w-96 bg-zinc-900/95 backdrop-blur-sm rounded-2xl px-7 py-10 shadow-xl border border-zinc-800">
          <form onSubmit={handleLogin}>
            <h1 className="text-2xl font-bold mb-7 text-green-500">Login</h1>

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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Login
            </button>

            <p className="text-sm text-center mt-4 text-gray-400">
              Not registered yet?{" "}
              <Link to="/signup" className="font-medium text-green-500 hover:text-green-400 transition-colors">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
