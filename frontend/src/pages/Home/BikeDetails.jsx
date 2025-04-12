import { useParams } from "react-router-dom";
import { bikes } from "../../utils/data";
import { service } from "../../utils/service"; 
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import "./bikeDetails.css";

const BikeDetails = () => {
  const { bikeId } = useParams();
  const bike = bikes.find((b) => b.id === bikeId);

  const [bikeData, setBikeData] = useState({});

  if (!bike) {
    return <p className="text-center text-red-500">Bike not found!</p>;
  }

  // Get services specific to the current bike
  const bikeServices = service[bikeId] || [];

  // Get stored state for the current bike
  const currentOdo = bikeData[bikeId]?.currentOdo || "";
  const lastServiceOdo = bikeData[bikeId]?.lastServiceOdo || "";
  const filteredServices = bikeData[bikeId]?.filteredServices || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const odoDifference = currentOdo - lastServiceOdo;

    if (odoDifference < 0) {
      alert("Current odometer reading cannot be less than the last service reading.");
      return;
    }

    // Filter services based on the odometer difference
    const dueServices = bikeServices.filter((item) => item.intervalKm <= odoDifference);

    setBikeData((prevData) => ({
      ...prevData,
      [bikeId]: {
        currentOdo,
        lastServiceOdo,
        filteredServices: dueServices,
      },
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold">{bike.name}</h1>
        <img
          src={bike.image}
          alt={bike.name}
          className="w-full h-60 object-cover rounded-lg mt-4"
        />

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="currentOdo" className="block text-lg font-medium mb-2">Enter Current Odometer Reading</label>
              <input
                type="number"
                id="currentOdo"
                name="currentOdo"
                value={currentOdo}
                onChange={(e) =>
                  setBikeData((prevData) => ({
                    ...prevData,
                    [bikeId]: {
                      ...prevData[bikeId],
                      currentOdo: Number(e.target.value),
                    },
                  }))
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastServiceOdo" className="block text-lg font-medium mb-2">Enter Last Service Odometer Reading</label>
              <input
                type="number"
                id="lastServiceOdo"
                name="lastServiceOdo"
                value={lastServiceOdo}
                onChange={(e) =>
                  setBikeData((prevData) => ({
                    ...prevData,
                    [bikeId]: {
                      ...prevData[bikeId],
                      lastServiceOdo: Number(e.target.value),
                    },
                  }))
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button type="submit" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Submit
            </button>
          </form>
        </div>

        {/* Display due services */}
        {filteredServices.length > 0 && (
          <div className="services-list mt-6">
            <h2 className="text-2xl font-bold">Due Services</h2>
            <ul className="space-y-4">
              {filteredServices.map((serviceItem, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-md">
                  <div>
                    <strong className="text-lg">{serviceItem.name}</strong>: {serviceItem.description}
                  </div>

                  {/* Display video button if links exist */}
                  {serviceItem.links && serviceItem.links.length > 0 && (
                    <button
                      onClick={() => window.open(serviceItem.links[0].url, "_blank")}
                      className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                    >
                      Watch Video
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BikeDetails;
