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
import FeaturesPage from "./pages/Landing/FeaturesPage";
import Maintenance from "./pages/profile/maintance";
import FuelLog from "./pages/profile/fuellog";
import BikeLogs from "./pages/profile/BikeLogs";
import Fuel from "./pages/fuel/Fuel";


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
        <Route path="/features" element={<FeaturesPage/>} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/fuel" element={<Fuel />} />
        <Route path="/bikes/new" element={
          <ProtectedRoute>
            <Home/>
            </ProtectedRoute>} />
        <Route path="/maintenance" element={
          <ProtectedRoute>
            <Maintenance />
          </ProtectedRoute>
        } />
        <Route path="/maintenance/:bikeId" element={<BikeLogs />} />
        <Route path="/fuel-log" element={
          <ProtectedRoute>
            <FuelLog />
          </ProtectedRoute>
        } />
       
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
