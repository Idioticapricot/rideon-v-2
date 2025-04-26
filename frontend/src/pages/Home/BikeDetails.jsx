import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { supabase } from '../../utils/supabaseClient';
import { ArrowLeft } from 'lucide-react';
import "./BikeDetails.css";

const BikeDetails = () => {
  const [bike, setBike] = useState(null);
  const [bikeData, setBikeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bikeId } = useParams();
  const navigate = useNavigate();

  // Fetch bike details
  const fetchBike = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from("bikes")
        .select("*")
        .eq("id", bikeId)
        .single();

      if (supabaseError) throw supabaseError;
      if (!data) throw new Error("Bike not found");

      setBike(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [bikeId]);

  // Fetch services for this bike
  const fetchServices = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("service")
        .select("id, name, description, intervalKm, link, link_name")
        .eq("id", bikeId);

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to load services");
      return [];
    }
  }, [bikeId]);

  const [bikeServices, setBikeServices] = useState([]);

  useEffect(() => {
    fetchBike();
    
    const loadServices = async () => {
      const services = await fetchServices();
      setBikeServices(services);
    };
    
    loadServices();
  }, [fetchBike, fetchServices]);

  // Form data handling
  const currentOdo = bikeData[bikeId]?.currentOdo || "";
  const lastServiceOdo = bikeData[bikeId]?.lastServiceOdo || "";
  const filteredServices = bikeData[bikeId]?.filteredServices || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentOdo || !lastServiceOdo) {
      alert("Please enter both odometer readings");
      return;
    }

    const odoDifference = currentOdo - lastServiceOdo;

    if (odoDifference < 0) {
      alert("Current odometer reading cannot be less than the last service reading");
      return;
    }

    const dueServices = bikeServices.filter(item => 
      item.intervalKm <= odoDifference
    );

    setBikeData({
      ...bikeData,
      [bikeId]: {
        currentOdo,
        lastServiceOdo,
        filteredServices: dueServices,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading bike details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <Navbar />
        <p className="text-red-500 text-xl mt-8">Error: {error}</p>
        <button 
          onClick={() => {
            setError(null);
            fetchBike();
          }}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="text-center p-8">
        <Navbar />
        <p className="text-red-500 text-xl mt-8">Bike not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white pt-8">{bike.name || bike['Image text']}</h1>
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
        </div>
        <div className="relative h-[400px] mt-4 rounded-lg overflow-hidden">
          <img
            src={bike.image}
            alt={bike.name || bike['Image text']}
            className="absolute w-full h-full object-contain bg-[#1a1a1a]"
          />
        </div>

        <div className="form-container mt-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="form-group">
                <label htmlFor="currentOdo" className="block text-lg font-medium mb-2">
                  Current Odometer (km)
                </label>
                <input
                  type="number"
                  id="currentOdo"
                  value={currentOdo}
                  onChange={(e) =>
                    setBikeData({
                      ...bikeData,
                      [bikeId]: {
                        ...bikeData[bikeId],
                        currentOdo: Number(e.target.value),
                      },
                    })
                  }
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastServiceOdo" className="block text-lg font-medium mb-2">
                  Last Service Odometer (km)
                </label>
                <input
                  type="number"
                  id="lastServiceOdo"
                  value={lastServiceOdo}
                  onChange={(e) =>
                    setBikeData({
                      ...bikeData,
                      [bikeId]: {
                        ...bikeData[bikeId],
                        lastServiceOdo: Number(e.target.value),
                      },
                    })
                  }
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              Calculate Due Services
            </button>
          </form>
        </div>

        {filteredServices.length > 0 && (
          <div className="services-list mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-green">Due Services ({filteredServices.length})</h2>
            <div className="space-y-4">
              {filteredServices.map((service) => (
                <div 
                  key={service.id} 
                  className="p-4 rounded-lg shadow-md border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400">{service.name}</h3>
                      <p className="text-gray-300 mt-1">{service.description}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        <span className="font-medium">Interval:</span> Every {service.intervalKm} km
                      </p>
                    </div>
                    
                    {service.link && (
                      <a
                        href={service.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors whitespace-nowrap ml-4"
                      >
                        {service.link_name || 'View Guide'}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BikeDetails;