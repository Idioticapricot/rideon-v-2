import { useParams } from "react-router-dom";
import { bikes } from "../../utils/data";
import { service } from "../../utils/service"; 
import Navbar from "../../components/Navbar/Navbar";
import YoutubeEmbed from "../../utils/YoutubeEmbed";
import { useState } from "react";
import "./bikeDetails.css"

const BikeDetails = () => {
  const { bikeId } = useParams();
  const bike = bikes.find((b) => b.id === bikeId);

  const [bikeData, setBikeData] = useState({});

  if (!bike) {
    return <p className="text-center text-red-500">Bike not found!</p>;
  }

 
  const bikeServices = service[bikeId] || [];

 
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
              <label htmlFor="currentOdo">Enter Current Odometer Reading</label>
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastServiceOdo">Enter Last Service Odometer Reading</label>
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
              />
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>

        
        <div className="services-list">
          <h2 className="text-2xl font-bold mt-6">Due Services</h2>
          <ul>
            {filteredServices.map((serviceItem, index) => (
              <li key={index} className="mt-2">{serviceItem.name}: {serviceItem.description}</li>
            ))}
          </ul>
        </div>

        <YoutubeEmbed />
      </div>
    </div>
  );
};

export default BikeDetails;
