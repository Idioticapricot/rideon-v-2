import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import { validateEmail } from "../../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Invalid Email");
      return;
    }
    setError("")
    if(!password){
      setError("Password is required");
      return;
    }
    setError("")
  };
  
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h1 className="text-2xl mb-7">Login</h1>

            <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-4">
  <input
    type="text"
    placeholder="Email"
    className="w-full text-sm bg-transparent py-3 mr-3 rounded border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</div>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
