import React, { useRef, useEffect, useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { carUpdate } from '../../../features/car/carSlice';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '12px',
};

const initialCenter = {
  lat: 37.98381,
  lng: 23.727539,
};

const MyComponent = ({ setStep }) => {
  const inputRef = useRef(null);
  const autocompleteServiceRef = useRef(null);
  const placesServiceRef = useRef(null);
  const [predictions, setPredictions] = useState([]);
  const [marker, setMarker] = useState(null);
  const [center, setCenter] = useState(initialCenter);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const dispatch = useDispatch();
  const { carIsLoading, car } = useSelector((state) => state.car);

  const options = {
    componentRestrictions: { country: 'gr' },
    fields: ['address_components', 'geometry.location', 'name'],
    types: ['address'],
  };

  const handlePlaceSelected = (place) => {
    setSelectedPlace(place);

    if (place && place.geometry && place.geometry.location) {
      const location = place.geometry.location;
      setMarker({
        lat: location.lat(),
        lng: location.lng(),
      });
      setCenter({
        lat: location.lat(),
        lng: location.lng(),
      });

      setIsButtonDisabled(false);
    }
  };

  const handleSearch = (query) => {
    if (window.google && window.google.maps && autocompleteServiceRef.current) {
      const request = {
        input: query,
        ...options,
      };
      autocompleteServiceRef.current.getPlacePredictions(
        request,
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setPredictions(predictions);
          } else {
            setPredictions([]); // Clear predictions if status is not OK
          }
        }
      );
    }
  };

  const handlePredictionClick = (placeId) => {
    const detailsRequest = { placeId, fields: options.fields };
    placesServiceRef.current.getDetails(detailsRequest, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        handlePlaceSelected(place); // Process the selected place
        setPredictions([]); // Clear predictions after selection
      }
    });
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 750), []);

  useEffect(() => {
    if (window.google && window.google.maps) {
      autocompleteServiceRef.current =
        new window.google.maps.places.AutocompleteService();
      placesServiceRef.current = new window.google.maps.places.PlacesService(
        document.createElement('div')
      );
    }
  }, []);

  const handleGoBackButton = (e) => {
    setStep(2);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.trim() === '') {
      setPredictions([]); // Clear predictions if input is empty
    } else {
      debouncedHandleSearch(value);
    }
  };

  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCYAZZw3e-pUDPSHWluC2sbEjRO5FBo-CU',
    libraries: ['places'],
  });

  const sumbitCarLocation = (e) => {
    e.preventDefault();

    if (!selectedPlace) {
      toast.error('Παρακαλώ διαλέξτε τοποθεσία');
      return;
    }

    //Extract address components and location
    const { address_components = [], geometry } = selectedPlace;
    const location = geometry ? geometry.location : null;

    const city =
      address_components.find((component) =>
        component.types.includes('locality')
      )?.long_name || '';
    const street =
      address_components.find((component) => component.types.includes('route'))
        ?.long_name || '';
    const number =
      +address_components.find((component) =>
        component.types.includes('street_number')
      )?.long_name || '';
    const postalCode =
      address_components.find((component) =>
        component.types.includes('postal_code')
      )?.long_name || '';
    const lat = location ? location.lat() : '';
    const long = location ? location.lng() : '';

    if (!city || '') {
      toast.error('Παρακαλώ διαλέξτε πόλη');
    }

    if (!street || '') {
      toast.error('Παρακαλώ διαλέξτε διεύθυνση');
    }

    if (!number || '') {
      toast.error('Παρακαλώ διαλέξτε αριθμό διεύθυνσης');
    }

    const address = {
      city,
      street,
      number,
      postalCode,
      lat,
      long,
    };

    console.log({ carId: car._id, address: address });

    dispatch(carUpdate({ carId: car._id, address: address }))
      .unwrap()
      .then((res) => {
        console.log(res);
        setIsButtonDisabled(false);
        setStep(3);
      })
      .catch((error) => {
        console.log(error);
        // setErrorMessage(error.message)
        toast.error(error.message);
        // setHasError(true)
        // setIsButtonDisabled(false)
      });
  };

  return (
    <div className='step-three'>
      <form onSubmit={sumbitCarLocation}>
        <h2>Τοποθεσία αυτοκινήτου</h2>
        <div>
          <div className='autocomplete-suggestions'>
            <div className='create-input-auto-complete'>
              <div className='input-label'>Διεύθυνση</div>
              <input
                type='text'
                className='single-input'
                ref={inputRef}
                onChange={handleChange}
                style={{ width: '90%' }}
                placeholder='Η τοποθεσία μου'
                required={true}
              />
            </div>
            {predictions.length > 0 && (
              <ul className='google-autocomplete-suggestions'>
                {predictions.map((prediction) => (
                  <li
                    key={prediction.place_id}
                    onClick={() => handlePredictionClick(prediction.place_id)}
                  >
                    {prediction.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={16}
              >
                {marker && <Marker position={marker} />}
              </GoogleMap>
            )}
          </div>
        </div>
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
};

export default MyComponent;
