import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import BikeCard from '../../components/Cards/BikeCard'
import { supabase } from '../../utils/supabaseClient';

const Home = () => {
  const [bike,setBike]=useState([]);
  useEffect(()=>{
    fetcbike()
  },[]);
  const fetcbike = async ()=>{
    const {data,error} = await supabase.from("bikes").select("*");
    if (error){
      console.log("error",error);
    }
    else{
      setBike(data);
    }
  }
  return (
    <div>
      <Navbar/>
      <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Bikes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {bike.map((bike) => (
          <BikeCard key={bike.id} bike={bike} />
        ))}
      </div>
    </div>
    </div>
  )
}

export default Home