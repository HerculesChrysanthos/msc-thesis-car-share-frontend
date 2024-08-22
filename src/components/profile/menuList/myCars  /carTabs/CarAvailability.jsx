import React, { useRef, useEffect, useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  setHours,
  setMinutes,
  addHours,
  isSameDay,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { el } from 'date-fns/locale';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import { SlCloudUpload } from 'react-icons/sl';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  carUpdateImage,
  carUploadImage,
  carDeleteImage,
} from '../../../../../features/car/carSlice';
import { FaRegTrashAlt } from 'react-icons/fa';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '12px',
};

const initialCenter = {
  lat: 37.98381,
  lng: 23.727539,
};

function CarAvailability({ car }) {
  const now = new Date();
  const nextHour = setMinutes(setHours(now, now.getHours() + 1), 0);

  const [startDate, setStartDate] = useState(nextHour);
  const [endDate, setEndDate] = useState(addHours(nextHour, 1));

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(addHours(date, 1)); // Set end date to one hour after start date
  };

  const { carIsLoading } = useSelector((state) => state.car);
  const autocompleteServiceRef = useRef(null);
  const placesServiceRef = useRef(null);
  const [predictions, setPredictions] = useState([]);
  const [center, setCenter] = useState(() => {
    return car.address.location.coordinates[0] !== 0
      ? {
          lat: car.address.location.coordinates[1],
          lng: car.address.location.coordinates[0],
        }
      : initialCenter;
  });
  const [marker, setMarker] = useState(() => {
    return car.address.location.coordinates[0] !== 0
      ? {
          lat: car.address.location.coordinates[1],
          lng: car.address.location.coordinates[0],
        }
      : null;
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(() => {
    return car.address.location.coordinates[0] !== 0 ? false : true;
  });
  const [selectedPlace, setSelectedPlace] = useState(() => {
    return car.address.location.coordinates[0] !== 0
      ? {
          address_components: [
            { types: ['locality'], long_name: car.address.city || '' },
            { types: ['route'], long_name: car.address.street || '' },
            { types: ['street_number'], long_name: car.address.number || '' },
            { types: ['postal_code'], long_name: car.address.postalCode || '' },
          ],
          geometry: {
            location: {
              lat: () => car.address.location.coordinates[1],
              lng: () => car.address.location.coordinates[0],
            },
          },
        }
      : null;
  });
  const dispatch = useDispatch();
  let initialAddr = '';
  if (car.address.location.coordinates[0] !== 0) {
    const { address } = car;
    if (address) {
      const { city, street, number, postalCode } = address;
      initialAddr = `${street} ${number}, ${city}, ${postalCode}`;
    }
  }
  const [addr, setAddr] = useState(initialAddr);
  const inputRef = useRef(null);

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
      setAddr(place.formatted_address); // Update the input field value
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

  const handleChange = (e) => {
    const value = e.target.value;
    setAddr(value); // Update the addr state when the input changes
    if (value.trim() === '') {
      setPredictions([]); // Clear predictions if input is empty
    } else {
      debouncedHandleSearch(value);
    }
  };

  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCYAZZw3e-pUDPSHWluC2sbEjRO5FBo-CU',
    libraries: ['places'], // Use the constant here
  });

  function formatToISOString(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  }

  const updateAvailability = (e) => {
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
      return;
    }

    if (!street || '') {
      toast.error('Παρακαλώ διαλέξτε διεύθυνση');
      return;
    }

    if (!number || '') {
      toast.error('Παρακαλώ διαλέξτε αριθμό διεύθυνσης');
      return;
    }

    if (!startDate || '') {
      toast.error('Παρακαλώ διαλέξτε αρχική ημερομηνία');
      return;
    }

    if (!startDate || '') {
      toast.error('Παρακαλώ διαλέξτε τελική ημερομηνία');
      return;
    }

    const formattedStartDate = formatToISOString(startDate);
    const formattedEndtDate = formatToISOString(endDate);

    console.log('start: ', formattedStartDate);
    console.log('end: ', formattedEndtDate);

    const address = {
      city,
      street,
      number,
      postalCode,
      lat,
      long,
    };

    console.log(address);
    return;

    dispatch(carUpdate({ carId: car._id, body: { address } }))
      .unwrap()
      .then((res) => {
        setIsButtonDisabled(false);
        setStep(4);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <form onSubmit={updateAvailability}>
      <div className='select-container'>
        <div className='create-input '>
          <div className='input-label'>Διαθέσιμο από</div>
          <DatePicker
            wrapperClassName='datePicker'
            selected={startDate}
            onChange={handleStartDateChange}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={60}
            timeCaption='Ώρα'
            minDate={new Date()}
            minTime={isSameDay(startDate, now) ? nextHour : startOfDay(now)}
            maxTime={setHours(setMinutes(new Date(), 0), 23)}
            injectTimes={
              isSameDay(startDate, now)
                ? [
                    setHours(setMinutes(new Date(), 0), now.getHours() + 1),
                    ...Array.from({ length: 23 - now.getHours() }, (_, i) =>
                      setHours(
                        setMinutes(new Date(), 0),
                        now.getHours() + 2 + i
                      )
                    ),
                  ]
                : []
            }
            dateFormat='MMMM d, yyyy HH:mm'
            locale={el}
          />
        </div>
        <div className='create-input '>
          <div className='input-label'>Διαθέσιμο έως</div>
          <DatePicker
            selected={endDate}
            wrapperClassName='datePicker'
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={60}
            timeCaption='Ώρα'
            minDate={startDate}
            minTime={
              isSameDay(startDate, endDate)
                ? addHours(startDate, 1)
                : startOfDay(startDate)
            }
            maxTime={setHours(setMinutes(new Date(), 0), 23)}
            injectTimes={
              isSameDay(startDate, endDate)
                ? [
                    setHours(
                      setMinutes(new Date(), 0),
                      startDate.getHours() + 1
                    ),
                    ...Array.from(
                      { length: 23 - startDate.getHours() },
                      (_, i) =>
                        setHours(
                          setMinutes(new Date(), 0),
                          startDate.getHours() + 2 + i
                        )
                    ),
                  ]
                : []
            }
            dateFormat='MMMM d, yyyy HH:mm'
            locale={el}
          />
        </div>

        <div className='create-input full-row'>
          <div className='input-label'>Διεύθυνση</div>
          <input
            type='text'
            className='single-input'
            ref={inputRef}
            value={addr}
            onChange={handleChange}
            style={{ width: '90%' }}
            placeholder='Η τοποθεσία μου'
            required={true}
          />
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
        <div className='full-row'>
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
          {carIsLoading ? 'Φόρτωση..' : ' Αποθήκευση'}
        </button>
      </div>
    </form>
  );
}

export default CarAvailability;
