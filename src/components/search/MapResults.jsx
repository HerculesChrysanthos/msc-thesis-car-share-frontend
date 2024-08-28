import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Pin from '../../assets/map/pin.svg';
import Spinner from '../Spinner';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const initialCenter = {
  lat: 37.98381,
  lng: 23.727539,
};

function MapResults() {
  const { searchCars, carIsLoading } = useSelector((state) => state.car);
  let [searchParams, setSearchParams] = useSearchParams();
  const { lat, long } = searchParams;

  const [center, setCenter] = useState(() => {
    return lat && long
      ? {
          lat: lat,
          lng: long,
        }
      : initialCenter;
  });

  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCYAZZw3e-pUDPSHWluC2sbEjRO5FBo-CU',
    libraries: ['places'],
  });

  // if (carIsLoading) return <Spinner />;

  return (
    <div className='map-results'>
      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
          {searchCars.length > 0 &&
            searchCars[0]?.paginatedResults?.map((pin) => (
              <Marker
                key={pin._id}
                position={{
                  lat: pin.address.location.coordinates[1],
                  lng: pin.address.location.coordinates[0],
                }}
                icon={{
                  url: Pin, // Path to your custom icon
                  scaledSize: new google.maps.Size(50, 50), // Scale the icon to desired size
                  origin: new google.maps.Point(0, 0), // Positioning within the image
                  anchor: new google.maps.Point(25, 50), // Anchor point, adjusting the position
                }}
                label={{
                  text: `${pin.price}€`,
                  color: '#ffffff',
                  fontSize: '12px',
                  lineHeight: '14px',
                  fontWeight: '400',
                }}
                // Add any additional props here
              />
            ))}
        </GoogleMap>
      )}
    </div>
  );
}

export default MapResults;
