import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const FuelLog = () => {
  const navigate = useNavigate();
  const [fuelLogs, setFuelLogs] = useState([
    { id: 1, fuelFilled: '5.2L', price: '₹450', odoKm: '1250' },
    { id: 2, fuelFilled: '4.8L', price: '₹415', odoKm: '1500' },
    { id: 3, fuelFilled: '5.5L', price: '₹475', odoKm: '1750' },
  ]);

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
            Fuel Log
          </h1>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl">
            Track your fuel consumption and expenses.
          </p>
        </motion.div>

        <motion.div
          className="bg-zinc-900 rounded-2xl shadow-lg border border-zinc-800 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-500">Fuel Filled</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-500">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-500">Odometer (km)</th>
                </tr>
              </thead>
              <tbody>
                {fuelLogs.map((log) => (
                  <motion.tr
                    key={log.id}
                    className="border-b border-zinc-800 hover:bg-zinc-800 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 text-white">{log.fuelFilled}</td>
                    <td className="px-6 py-4 text-white">{log.price}</td>
                    <td className="px-6 py-4 text-white">{log.odoKm}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FuelLog;
