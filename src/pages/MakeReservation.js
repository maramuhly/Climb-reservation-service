import React, { useState } from 'react';
import Header from '../components/Header';
import BrandSelection from '../components/BrandSelection';
import LocationSearch from '../components/LocationSearch';
import ParkRecommendation from '../components/ParkRecommendation';
import ReservationForm from '../components/ReservationForm';

function MakeReservation() {
  const [brand, setBrand] = useState(null);
  const [location, setLocation] = useState(null);
  const [park, setPark] = useState(null);

  return (
    <div>
      <Header />
      {!brand && <BrandSelection onSelectBrand={setBrand} />}
      {brand && !location && <LocationSearch onSelectLocation={setLocation} />}
      {brand && location && !park && <ParkRecommendation brand={brand} location={location} onSelectPark={setPark} />}
      {brand && location && park && <ReservationForm park={park} />}
    </div>
  );
}

export default MakeReservation;
