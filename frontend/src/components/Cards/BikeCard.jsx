import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../../utils/supabaseClient";
import { Trash2 } from "lucide-react";

const BikeCard = ({ bike, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_bike')
        .delete()
        .eq('user_id', user.id)
        .eq('bike_id', bike.id);

      if (error) throw error;
      
      onDelete(bike.id);
    } catch (error) {
      console.error('Error deleting bike:', error);
    }
  };

  return (
    <motion.div 
      onClick={() => navigate(`/bikes/${bike.id}`)}
      className="bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:bg-zinc-700 transition-all duration-300 cursor-pointer relative"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={handleDelete}
        className="absolute top-4 right-4 p-2 bg-red-500/20 hover:bg-red-500/30 rounded-full transition-colors"
        title="Delete bike"
      >
        <Trash2 size={20} className="text-red-500" />
      </button>
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
          <button className="bg-green-500 hover:bg-green-400 text-black font-semibold px-4 py-2 rounded-lg transition-colors">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BikeCard;