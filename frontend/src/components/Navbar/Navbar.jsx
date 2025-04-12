import React from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';


const Navbar = () => {
  const navigate = useNavigate();
  const onLogout = ()=>{
    navigate("/login");
  }
  return (
    <>
    <div className="bg-white w-full flex items-center justify-between px-6 py-2 drop-shadow">
     <Link to="/dashboard"><h2 className="text-xl font-medium text-black py-2">Ride On</h2></Link>
    <SearchBar/>
      <ProfileInfo onLogout={onLogout}/>
    </div>

    </>
  );
};

export default Navbar;