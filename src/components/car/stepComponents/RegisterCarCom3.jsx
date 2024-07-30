import React, { useCallback, useState, useEffect, useRef } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  useLoadScript,
} from '@react-google-maps/api';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';

const containerStyle = {
  width: '100%',
  height: '200px',
  borderRadius: '12px',
};

const center = {
  lat: 37.98381,
  lng: 23.727539,
};

function RegisterCarCom3({ step, setStep }) {
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [coordinates, setCoordinates] = useState(center);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { carIsLoading, car } = useSelector((state) => state.car);

  const handleGoBackButton = (e) => {
    setStep(2);
  };

  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCYAZZw3e-pUDPSHWluC2sbEjRO5FBo-CU',
    libraries: ['places'], // Make sure to include the 'places' library
  });

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const onAutocompleteLoad = useCallback((autocomplete) => {
    setAutocomplete(autocomplete);
  }, []);

  // const handlePlaceSelect = () => {
  //   if (autocomplete) {
  //     const place = autocomplete.getPlace();
  //     if (place.geometry) {
  //       setCoordinates({
  //         lat: place.geometry.location.lat(),
  //         lng: place.geometry.location.lng(),
  //       });
  //       map.panTo(place.geometry.location);
  //     }
  //   }
  // };

  const handlePlaceSelect = useCallback(() => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setCoordinates({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        map.panTo(place.geometry.location);
      }
    }
  }, [autocomplete, map]);
  const debouncedHandlePlaceSelect = useRef(
    debounce(handlePlaceSelect, 5000)
  ).current;

  const debounceFun = useRef(
    debounce(() => {
      console.log('hi'), 5000;
    })
  ).current;

  useEffect(() => {
    if (autocomplete) {
      const listener = google.maps.event.addListener(
        autocomplete,
        'place_changed',
        debouncedHandlePlaceSelect
      );

      return () => {
        google.maps.event.removeListener(listener);
      };
    }
  }, [autocomplete, debouncedHandlePlaceSelect]);

  return (
    <div>
      <form>
        <h2>Τοποθεσία αυτοκινήτου</h2>
        <Autocomplete onLoad={onAutocompleteLoad}>
          <input
            type='text'
            placeholder='Search for places'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </Autocomplete>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
          ></GoogleMap>
        )}
        <div className='buttons'>
          <button
            type='submit'
            disabled={isButtonDisabled}
            className='register-car-btn'
          >
            {carIsLoading ? 'Φόρτωση..' : ' Επόμενο'}
          </button>
          <button
            type='button'
            className='go-back-car-btn'
            onClick={handleGoBackButton}
          >
            Προηγούμενο
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterCarCom3;
