import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import Pin from '../../assets/map/pin.svg';
import SelectedPinIcon from '../../assets/map/pin-selected.svg';
import Spinner from '../Spinner';

const containerStyle = {
  width: '100%',
  height: '100%',
};

function MapResults({ selectedPin, setSelectedPin, center, setCenter }) {
  const { searchCars, carIsLoading } = useSelector((state) => state.car);
  let [searchParams, setSearchParams] = useSearchParams();
  const { lat, long } = searchParams;
  const [libraries] = useState(['places']);

  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCYAZZw3e-pUDPSHWluC2sbEjRO5FBo-CU',
    libraries, // Use the constant here
  });

  const handlePinClick = (pin) => {
    console.log(pin._id);
    setSelectedPin(pin._id);
    setCenter({
      lat: pin.address.location.coordinates[1],
      lng: pin.address.location.coordinates[0],
    });
  };

  console.log(isLoaded);

  // if (carIsLoading) return <Spinner />;

  return (
    <div className='map-results'>
      {isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
          {searchCars.totalCount > 0 &&
            searchCars?.paginatedResults?.map((pin) => {
              return (
                <MarkerF
                  key={pin._id}
                  position={{
                    lat: pin.address.location.coordinates[1],
                    lng: pin.address.location.coordinates[0],
                  }}
                  icon={{
                    url: pin._id === selectedPin ? SelectedPinIcon : Pin,
                    scaledSize: new google.maps.Size(50, 50),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(25, 50),
                  }}
                  label={{
                    text: `${pin.price}€`,
                    color: '#ffffff',
                    fontSize: '12px',
                    lineHeight: '14px',
                    fontWeight: '400',
                  }}
                  onClick={() => handlePinClick(pin)}
                />
              );
            })}
        </GoogleMap>
      ) : (
        <>
          <Spinner />
        </>
      )}
    </div>
  );
}

export default MapResults;
