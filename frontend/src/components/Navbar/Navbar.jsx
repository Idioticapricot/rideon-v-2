import React, { useState } from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery); // You can trigger search logic here
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-white w-full flex items-center justify-between px-6 py-2 drop-shadow">
      <Link to="/dashboard">
        <h2 className="text-xl font-medium text-black py-2">Ride On</h2>
      </Link>

      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
