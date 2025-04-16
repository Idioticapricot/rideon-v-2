import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import BikeDetails from "./pages/Home/BikeDetails";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./utils/AuthProvider";
import ProtectedRoute from "./utils/ProtectedRoute";

// Define Routes in a function
const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/bikes/:bikeId" element={<BikeDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
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
