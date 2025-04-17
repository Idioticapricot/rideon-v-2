import React from "react";
import { useAuth } from "../../utils/AuthProvider";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogout }) => {
  const { user } = useAuth();
  const fullName = user?.user_metadata?.full_name || "Unknown User";

  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 flex items-center justify-center rounded-full text-slate-950 font-medium bg-green-500 hover:bg-green-400 transition-colors cursor-pointer">
        {getInitials(fullName)}
      </div>
      <button 
        className="text-sm text-green-500 hover:text-green-400 transition-colors" 
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileInfo;
