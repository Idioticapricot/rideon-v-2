import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../../utils/supabaseClient";

const Bikeadd = ({ bike }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
      if (error) console.error("Error fetching user:", error);
    };
    getUser();
  }, []);

  const handleAddBike = async (e) => {
    e.preventDefault(); // prevent page reload or bubbling

    if (!user) {
      console.log("User not logged in");
      return;
    }

    try {
      const { data, error } = await supabase.from("user_bike").insert([
        {
          user_id: user.id,
          bike_id: bike.id,
          mileage: 0, // default value
          name: bike.name || "", // optional - fallback empty string
        },
      ]);

      if (error) {
        console.error("Failed to add bike:", error);
        return;
      }

      console.log("Bike added successfully!", data);
      navigate(`/dashboard`); // navigate to your bikes page after adding
    } catch (err) {
      console.error("Unexpected error adding bike:", err);
    }
  };

  return (
    <motion.div
      onClick={() => navigate('/dashboard')}
      className="bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:bg-zinc-700 transition-all duration-300 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={bike.image}
          alt={bike.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white mb-2">{bike.name}</h2>
        <p className="text-gray-400 text-sm mb-4">{bike.manufacturer}</p>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-4 py-2 rounded-lg transition-colors"
            onClick={handleAddBike}
          >
            Add Bike
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Bikeadd;