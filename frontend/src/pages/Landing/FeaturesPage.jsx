import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { motion } from 'framer-motion';
import { ScanLine, Wrench, Stethoscope, Bike, Settings, Fuel, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabaseClient';

const features = [
  {
    title: "Bike Management",
    desc: "Keep track of all your bikes in one place. View details, add new bikes, and manage your collection easily.",
    icon: Bike,
  },
  {
    title: "Service Tracking",
    desc: "Log past services and calculate upcoming maintenance based on odometer readings and recommended intervals.",
    icon: Settings,
  },
  {
    title: "Smart Bill Scanner",
    desc: "AI-powered bill scanning with OCR automatically logs maintenance history, saving you time and effort.",
    icon: ScanLine,
  },
  {
    title: "Fuel Fillup Prediction",
    desc: "ML model predicts optimal fuel fillup times based on your riding patterns and fuel consumption history.",
    icon: Fuel,
  },
  {
    title: "Issue Diagnosis",
    desc: "AI-powered symptom analysis provides potential diagnoses, mechanic tips, and community-based solutions.",
    icon: Stethoscope,
  },
];

const FeaturesPage = () => {
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-500">
            Our Features
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the tools Ride On offers to help you manage your bike maintenance effortlessly and ride smarter.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-800 flex flex-col items-start hover:bg-zinc-800 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 p-3 bg-green-500/10 rounded-full border border-green-500/30">
                <feature.icon className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-base flex-grow">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesPage;
