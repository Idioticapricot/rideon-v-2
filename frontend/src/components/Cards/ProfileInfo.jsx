import React from "react";
import { useAuth } from "../../utils/AuthProvider";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogout }) => {
  const { user } = useAuth();
  
  const fullName = user?.user_metadata?.full_name || "Unknown User"; // Fallback if full_name is undefined

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(fullName)} {/* Use dynamic fullName */}
      </div>
      <div>
        <p className="text-sm font-medium">{fullName}</p> {/* Display fullName */}
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
