import React from "react";
import { useAuth } from "../../utils/AuthProvider";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogout }) => {
  const { user } = useAuth();
  
  const fullName = user?.user_metadata?.full_name || "Unknown User"; // Fallback if full_name is undefined

  return (
    <div className="flex items-center gap-3 sm:gap-6 sm:flex-row flex-col">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(fullName)} {/* Use dynamic fullName */}
      </div>
      <div className="text-center sm:text-left"> {/* Center text on mobile, left-align on larger screens */}
        {/* Hide the full name on small screens */}
        <p className="text-sm font-medium hidden sm:block">{fullName}</p> {/* The full name will be hidden on screens smaller than 'sm' */}
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
