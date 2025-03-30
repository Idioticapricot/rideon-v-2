import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import BikeDetails from "./pages/Home/BikeDetails";


// Define Routes in a function
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Home />} />
      <Route path="/*" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/bikes/:bikeId" element={<BikeDetails />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes /> {/* Calling the function here */}
    </Router>
  );
};

export default App;