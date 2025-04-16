import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import supabase from '../../utils/supabaseClient';
import ProfileInfo from '../Cards/ProfileInfo';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Import hook to get current path

  const onLogout = () => {
    navigate("/login");
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login'); 
  };

  // Conditionally render ProfileInfo based on the current route
  const showProfileInfo = location.pathname === "/dashboard" || location.pathname === "/bikes/:bikeId"; 

  return (
    <div className="bg-white w-full flex items-center justify-between px-6 py-2 drop-shadow">
      <Link to="/dashboard">
        <h2 className="text-xl font-medium text-black py-2">Ride On</h2>
      </Link>
{/*
      
      {location.pathname === "/dashboard" && (
       <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      )}
    */} 

      {/* Conditionally render ProfileInfo only on specific routes */}
      {showProfileInfo && <ProfileInfo onLogout={handleLogout} />}
    </div>
  );
};

export default Navbar;
