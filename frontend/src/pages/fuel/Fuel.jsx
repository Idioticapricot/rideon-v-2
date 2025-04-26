import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Fuel = () => {
  const [model, setModel] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [travelWay, setTravelWay] = useState("");
  const [predictedMileage, setPredictedMileage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://a19559d3-ecf9-4c6d-b461-6d04769a253d-00-3671rmwpfyxki.sisko.replit.dev:8080/predict",
        {
          model: model,
          distance: parseFloat(distance),
          duration: parseFloat(duration),
          travel_way: parseFloat(travelWay),
        }
      );
      setPredictedMileage(response.data.predicted_mileage);
      setError(null);
    } catch (err) {
      setError("Error predicting fuel mileage");
      setPredictedMileage(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
        </div>
        <div className="bg-zinc-900 rounded-2xl shadow-lg border border-zinc-800 p-6">
          <h1 className="text-3xl font-bold mb-6 text-green-500">Fuel Mileage Prediction using Machine Learning</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Bike Model Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-green-500">Bike Model</label>
              <div className="flex items-center bg-zinc-800 border border-zinc-700 px-5 rounded-lg">
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full text-sm bg-transparent py-3 mr-3 rounded border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent text-white"
                  required
                >
                  <option value="" className="bg-zinc-800">Select Bike Model</option>
                  <option value="yamaha_fz" className="bg-zinc-800">Yamaha FZ</option>
                  <option value="classic_350" className="bg-zinc-800">Classic 350</option>
                </select>
              </div>
            </div>

            {/* Distance input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-green-500">Distance (km)</label>
              <div className="flex items-center bg-zinc-800 border border-zinc-700 px-5 rounded-lg">
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full text-sm bg-transparent py-3 mr-3 rounded border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter distance in kilometers"
                  required
                />
              </div>
            </div>

            {/* Duration input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-green-500">Duration (hours)</label>
              <div className="flex items-center bg-zinc-800 border border-zinc-700 px-5 rounded-lg">
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full text-sm bg-transparent py-3 mr-3 rounded border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter duration in hours"
                  required
                />
              </div>
            </div>

            {/* Travel Way input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-green-500">Travel Way</label>
              <div className="flex items-center bg-zinc-800 border border-zinc-700 px-5 rounded-lg">
                <select
                  value={travelWay}
                  onChange={(e) => setTravelWay(e.target.value)}
                  className="w-full text-sm bg-transparent py-3 mr-3 rounded border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent text-white"
                  required
                >
                  <option value="" className="bg-zinc-800">Select travel way</option>
                  <option value="0" className="bg-zinc-800">City</option>
                  <option value="1" className="bg-zinc-800">Highway</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Predict Mileage
            </button>
          </form>

          {/* Prediction Result */}
          {predictedMileage && (
            <div className="mt-6 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
              <h2 className="text-xl font-semibold text-green-500 mb-2">Predicted Mileage</h2>
              <p className="text-2xl font-bold text-white">{predictedMileage} km/l</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-500">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fuel;