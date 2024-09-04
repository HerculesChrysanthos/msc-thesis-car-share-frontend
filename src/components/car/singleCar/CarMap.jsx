import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '12px',
};

function CarMap({ address }) {
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCYAZZw3e-pUDPSHWluC2sbEjRO5FBo-CU',
    libraries: ['places'],
  });

  const location = {
    lat: parseFloat(address?.location.coordinates[1]),
    lng: parseFloat(address?.location.coordinates[0]),
  };

  return (
    <div className='single-car-location'>
      <h2>Τοποθεσία</h2>
      <div className='map'>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={16}
          >
            {location && <Marker position={location} />}
          </GoogleMap>
        )}
      </div>
    </div>
  );
}

export default CarMap;
