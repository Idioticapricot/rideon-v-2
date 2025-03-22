import { useParams } from "react-router-dom";
import { bikes } from "../../utils/data";

const BikeDetails = () => {
  const { bikeId } = useParams();
  const bike = bikes.find((b) => b.id === bikeId);

  if (!bike) {
    return <p className="text-center text-red-500">Bike not found!</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{bike.name}</h1>
      <img src={bike.image} alt={bike.name} className="w-full h-60 object-cover rounded-lg mt-4" />
      <p className="mt-4 text-gray-700">{bike.description}</p>
      <p className="mt-2 text-gray-600">Manufacturer: {bike.manufacturer}</p>
    </div>
  );
};

export default BikeDetails;
