import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import Navbar from '../../components/Navbar/Navbar';
import { motion } from "framer-motion";
import BikeCard from '../../components/Cards/BikeCard';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const Yourbikes = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUserBikes = async () => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('Failed to get user');
      }

      const { data: userBikes, error: bikeIdError } = await supabase
        .from('user_bike')
        .select('bike_id')
        .eq('user_id', user.id);

      if (bikeIdError) throw bikeIdError;

      const bikeIds = userBikes.map((item) => item.bike_id);

      if (bikeIds.length === 0) {
        setBikes([]);
        return;
      }

      const { data: fullBikes, error: bikeError } = await supabase
        .from('bikes')
        .select('*')
        .in('id', bikeIds);

      if (bikeError) throw bikeError;

      setBikes(fullBikes);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBike = (bikeId) => {
    setBikes(bikes.filter(bike => bike.id !== bikeId));
  };

  useEffect(() => {
    fetchUserBikes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <p className="text-xl">Loading your bikes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8 text-center">
        <Navbar />
        <p className="text-red-500 text-xl mt-8">Error: {error}</p>
        <button
          onClick={() => fetchUserBikes()}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (bikes.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-green-500">
              Your Bikes
            </h1>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl">
              You haven't added any bikes yet. Start your collection today!
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <button
              onClick={() => navigate('/bikes/new')}
              className="w-full max-w-md h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-green-500 rounded-lg hover:bg-green-500/10 transition-colors duration-200"
            >
              <FaPlus className="text-4xl text-green-500 mb-2" />
              <span className="text-green-500 text-lg">Add Your First Bike</span>
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-green-500">
            Your Bikes
          </h1>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl">
            Explore your bike collection!
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {bikes.map((bike, index) => (
            <motion.div
              key={bike.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BikeCard bike={bike} onDelete={handleDeleteBike} />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: bikes.length * 0.1 }}
            className="flex items-center justify-center"
          >
            <button
              onClick={() => navigate('/bikes/new')}
              className="w-full h-full min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-green-500 rounded-lg hover:bg-green-500/10 transition-colors duration-200"
            >
              <FaPlus className="text-4xl text-green-500 mb-2" />
              <span className="text-green-500 text-lg">Add a Bike</span>
            </button>
          </motion.div>
        </motion.div>

        {bikes.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-400 text-lg">Loading...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Yourbikes;
