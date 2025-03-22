import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BikeCard = ({ bike }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95 bg-white p-4 rounded-lg"
      onClick={() => navigate(`/bikes/${bike.id}`)}
    >
      <motion.div 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 0.3 }} 
  className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95 bg-white p-4 rounded-lg"
></motion.div>
      <img src={bike.image} alt={bike.name} className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-lg font-bold mt-2">{bike.name}</h2>
      <p className="text-sm text-gray-600">{bike.manufacturer}</p>
    </div>
  );
};

export default BikeCard;
