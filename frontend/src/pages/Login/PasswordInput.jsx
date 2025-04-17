import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; 

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false); 

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-zinc-700 border border-zinc-600 px-5 rounded-lg mb-4">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent text-white placeholder-gray-400"
      />
      {isShowPassword ? (
        <FaRegEye 
          size={22}
          className="text-green-500 hover:text-green-400 cursor-pointer transition-colors"
          onClick={toggleShowPassword}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-green-500 hover:text-green-400 cursor-pointer transition-colors"
          onClick={toggleShowPassword}
        />
      )}
    </div>
  );
};

export default PasswordInput;
