import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Maintenance = () => {
  const navigate = useNavigate();
  const [maintenanceItems, setMaintenanceItems] = useState([
    { id: 1, parts: 'Engine Oil', price: '₹500', note: 'Synthetic 10W-40' },
    { id: 2, parts: 'Air Filter', price: '₹300', note: 'High flow performance' },
    { id: 3, parts: 'Brake Pads', price: '₹800', note: 'Front set' },
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
            Maintenance Parts
          </h1>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl">
            Track and manage your bike maintenance parts and costs.
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-500">Parts</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-500">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-500">Note</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceItems.map((item) => (
                  <motion.tr
                    key={item.id}
                    className="border-b border-zinc-800 hover:bg-zinc-800 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 text-white">{item.parts}</td>
                    <td className="px-6 py-4 text-white">{item.price}</td>
                    <td className="px-6 py-4 text-gray-400">{item.note}</td>
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

export default Maintenance;
