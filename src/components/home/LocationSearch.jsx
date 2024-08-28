import React, { useRef, useEffect, useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { RiMapPin2Fill } from 'react-icons/ri';
import { useSearchParams } from 'react-router-dom';

function LocationSearch({ setLat, setLong }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const autocompleteServiceRef = useRef(null);
  const placesServiceRef = useRef(null);
  const [predictions, setPredictions] = useState([]);
  const [addr, setAddr] = useState(
    searchParams?.get('lat') && searchParams?.get('lonh')
      ? initializeAddress
      : ''
  ); // Ensure addr is initialized as an empty string

  const inputRef = useRef(null);

  const options = {
    componentRestrictions: { country: 'gr' },
    fields: ['address_components', 'geometry.location', 'formatted_address'],
    types: ['address'],
  };

  const handlePlaceSelected = (place) => {
    if (place && place.geometry && place.geometry.location) {
      const location = place.geometry.location;
      setAddr(place.formatted_address || ''); // Ensure addr is never undefined
      setLat(location.lat()); // Set latitude
      setLong(location.lng()); // Set longitude
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

  const initializeAddress = () => {
    try {
      const apiKey = 'AIzaSyCYAZZw3e-pUDPSHWluC2sbEjRO5FBo-CU'; // Replace with your actual API key
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`;

      const response = axios.get(geocodeUrl);
      const results = response?.data;

      console.log(results);

      if (results?.length > 0) {
        return results[0].formatted_address; // Return the first (usually most accurate) address
      } else {
        return '';
      }
    } catch (error) {
      console.error('Error fetching address:', error);
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

  const handleChange = (e) => {
    const value = e.target.value;
    setAddr(value); // Update the addr state when the input changes
    if (value.trim() === '') {
      setPredictions([]); // Clear predictions if input is empty
    } else {
      debouncedHandleSearch(value);
    }
  };

  return (
    <div className='search'>
      <div className='input-container'>
        <div className='icon'>
          <RiMapPin2Fill />
        </div>
        <input
          type='text'
          className='single-input'
          ref={inputRef}
          value={addr || ''} // Ensure value is never undefined
          onChange={handleChange}
          style={{ width: '90%' }}
          placeholder='Σημείο παραλαβής'
          required={true}
        />
        {predictions.length > 0 && (
          <ul className='google-autocomplete-suggestions-home'>
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
    </div>
  );
}

export default LocationSearch;
