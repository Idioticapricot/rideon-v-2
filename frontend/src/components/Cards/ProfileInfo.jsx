import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../utils/AuthProvider";
import { getInitials } from "../../utils/helper";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ProfileInfo = ({ onLogout }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const fullName = user?.user_metadata?.full_name || "Unknown User";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-10 h-10 flex items-center justify-center rounded-full text-slate-950 font-medium bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"
      >
        {getInitials(fullName)}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-xl bg-zinc-900/95 backdrop-blur-sm border border-zinc-800 shadow-xl"
          >
            <div className="p-3 border-b border-zinc-800">
              <p className="text-sm text-gray-400">Signed in as</p>
              <p className="text-sm font-medium text-white truncate">{fullName}</p>
            </div>

            <div className="p-2">
              <Link 
                to="/profile" 
                className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Profile Settings
              </Link>
              
              <Link 
                to="/bikes" 
                className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                My Bikes
              </Link>

              <Link 
                to="/maintenance" 
                className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Maintenance History
              </Link>

              <button 
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center px-3 py-2 text-sm text-red-500 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileInfo;
