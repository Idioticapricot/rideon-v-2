import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import BikeDetails from "./pages/Home/BikeDetails";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./utils/AuthProvider";
import ProtectedRoute from "./utils/ProtectedRoute";
import LandingPage from "./pages/Landing/LandingPage";
import Yourbikes from "./pages/yourbikes/Yourbikes";
import Home from "./pages/Home/Home";

// Define Routes in a function
const AppRoutes = () => {
  return (
    
    <AuthProvider>
      <Routes>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Yourbikes />
          </ProtectedRoute>
        } />
        <Route path="/bikes/:bikeId" element={
          <ProtectedRoute>
           <BikeDetails />
           </ProtectedRoute>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home/>} />
        <Route path="*" element={<NotFound />} /> {/* Put this last */}
      </Routes>
    </AuthProvider>
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
