import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "400px",
  width: "800px"
};

const center = {
  lat: 37.5665,
  lng: 126.9780
};

function LocationSearch({ onSelectLocation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });
    onSelectLocation({ lat, lng });
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className='main-content googleMap'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        onClick={handleMapClick}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>
    </div>
  );
}

export default LocationSearch;
