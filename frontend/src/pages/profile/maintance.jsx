import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar/Navbar';
import { ArrowLeft } from 'lucide-react';
import supabase from '../../utils/supabaseClient';

export default function Maintenance() {
  const [bikes, setBikes] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) fetchBikes();
  }, [user]);

  const fetchBikes = async () => {
    const { data, error } = await supabase
      .from('user_bike')
      .select('*')
      .eq('user_id', user.id);

    if (error) console.error(error);
    else setBikes(data);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-green-500">
            Select a Bike
          </h1>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl">
            Choose a bike to view or manage its maintenance records.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {bikes.map((bike, index) => (
            <motion.button
              key={bike.id}
              onClick={() => navigate(`/maintenance/${bike.id}`)}
              className="bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-800 hover:bg-zinc-800 transition-colors duration-300 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-white">
                {bike.name || 'Unnamed Bike'}
              </h3>
              <p className="text-gray-400">
                Click to view maintenance records
              </p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}