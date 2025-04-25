import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ProfileInfo from "../../components/Cards/ProfileInfo";
import { useAuth } from "../../utils/AuthProvider";
import supabase from "../../utils/supabaseClient";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navItems = ["Features", "Pricing", "Contact"];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/90 backdrop-blur-sm z-50 px-4 py-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-green-500"
          >
            Ride On
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            {user ? (
              <ProfileInfo onLogout={onLogout} />
            ) : (
              <Link to="/login">
                <button className="bg-green-500 hover:bg-green-400 text-black font-semibold px-4 py-2 rounded-lg transition-colors">
                  Sign In
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
          className={`md:hidden overflow-hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <div className="py-4 space-y-4 px-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            {user ? (
              <ProfileInfo onLogout={onLogout} />
            ) : (
              <Link to="/login">
              <button className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold px-4 py-2 mt-4 rounded-lg transition-colors">
                Sign In
              </button>
              </Link>
            )}
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-32 mt-16">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          Ride On
        </motion.h1>
        <motion.p 
          className="text-lg md:text-2xl max-w-2xl mb-8 text-gray-400"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          Track your bike maintenance. Stay ahead. Ride smarter.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2 }}
        >
          <Link to="/dashboard">
          <button className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 text-lg rounded-xl transition-colors">
            Get Started
          </button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-zinc-900 px-4 py-20">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Smart Features for Smarter Riding
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "Smart Bill Scanner & Service Tracking",
              desc: "AI-powered bill scanning with OCR and automated maintenance history logging. Track services and predict maintenance needs."
            },
            {
              title: "Fuel Prediction & Issue Diagnosis",
              desc: "ML-powered fuel fillup predictions and AI-powered symptom analysis with mechanic tips."
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-zinc-800 rounded-2xl shadow-md hover:bg-zinc-700 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link to="/features">
            <button className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 text-lg rounded-xl transition-colors">
              View All Features
            </button>
          </Link>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-black px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to ride smarter?
          </h2>
          <p className="text-gray-400 mb-8">
            Join now and make your maintenance effortless.
          </p>
          <button className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 text-lg rounded-xl transition-colors">
            Start Using Ride On
          </button>
        </motion.div>
      </section>
    </div>
  );
}