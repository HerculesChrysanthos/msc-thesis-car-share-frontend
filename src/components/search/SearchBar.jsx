import LocationSearch from '../home/LocationSearch';
import DatesSearch from '../home/DatesSearch';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  setHours,
  setMinutes,
  setSeconds,
  addHours,
  isSameDay,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { getCarsBySearch } from '../../features/car/carSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import Filters from './Filters';
import { VscSettings } from 'react-icons/vsc';

function formatToISOString(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  // Ensure that seconds are always '00'
  const seconds = '00';

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}
const roundToNearestHalfHour = (date) => {
  const minutes = date.getMinutes();
  const roundedMinutes = minutes < 15 ? 0 : minutes < 45 ? 30 : 60;
  const roundedDate = setMinutes(setSeconds(date, 0), roundedMinutes);

  if (roundedMinutes === 60) {
    return addHours(roundedDate, 1);
  }

  return roundedDate;
};

function SearchBar({
  carsPageNum,
  carsLimit,
  setCenter,
  minPrice,
  maxPrice,
  make,
  model,
  gearboxType,
  setMinPrice,
  setMaxPrice,
  setMake,
  setModel,
  setGearboxType,
}) {
  const navigate = useNavigate();
  const { searchCars } = useSelector((state) => state.car);
  const dispatch = useDispatch();

  const [displayFilters, setDisplayFilters] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const [lat, setLat] = useState(
    searchParams?.get('lat') ? searchParams?.get('lat') : ''
  );
  const [long, setLong] = useState(
    searchParams?.get('long') ? searchParams?.get('long') : ''
  );

  const now = new Date();
  const nextHour = setMinutes(setHours(now, now.getHours() + 1), 0);
  const [startDate, setStartDate] = useState(
    searchParams?.get('startDate')
      ? new Date(searchParams?.get('startDate'))
      : nextHour
  );
  const [endDate, setEndDate] = useState(
    searchParams?.get('startDate')
      ? new Date(searchParams?.get('endDate'))
      : addHours(nextHour, 1)
  );

  useEffect(() => {
    //checkFilterParams()
    submitSearch();
  }, [lat, long, startDate, endDate, searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('lat', lat);
    params.set('long', long);
    setSearchParams(params);
  }, [lat, long]);

  const handleStartDateChange = (date) => {
    const roundedDate = roundToNearestHalfHour(date);
    const plusOneHour = addHours(roundedDate, 1);
    const formatedDate = formatToISOString(roundedDate);
    const formatedOneHourLater = formatToISOString(plusOneHour);

    setStartDate(roundedDate);
    setEndDate(plusOneHour);
    const params = new URLSearchParams(searchParams);
    params.set('startDate', formatedDate);
    params.set('endDate', formatedOneHourLater);
    setSearchParams(params);
  };

  const handleEndDateChange = (date) => {
    // Round the minutes to the nearest :00 or :30
    const roundedDate = roundToNearestHalfHour(date);
    const formatedDate = formatToISOString(roundedDate);

    setEndDate(roundedDate);
    const params = new URLSearchParams(searchParams);
    params.set('endDate', formatedDate);
    setSearchParams(params);
  };

  const submitSearch = (e) => {
    if (!startDate) return;
    if (!endDate) return;
    if (!lat || !long) return;

    const formatedStartDate = formatToISOString(startDate);
    const formatedEndDate = formatToISOString(endDate);

    dispatch(
      getCarsBySearch({
        lat,
        long,
        startDate: formatedStartDate,
        endDate: formatedEndDate,
        maxPrice,
        minPrice,
        make,
        model,
        gearboxType,
        page: carsPageNum,
        limit: carsLimit,
      })
    )
      .unwrap()
      .then((res) => {
        const center = res.searchTerms;
        setCenter({ lat: +center.lat, lng: +center.long });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <form onSubmit={submitSearch} className='hero-search'>
      <div className='search-bar'>
        <LocationSearch setLat={setLat} setLong={setLong} />
        <DatesSearch
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
        />
        <button
          type='button'
          role='button'
          onClick={() => setDisplayFilters(true)}
          className='display-filters'
          disabled={searchCars?.totalCount === 0}
        >
          <VscSettings />
        </button>
        {displayFilters && (
          <Filters
            maxPrice={maxPrice}
            minPrice={minPrice}
            make={make}
            model={model}
            gearboxType={gearboxType}
            setMaxPrice={setMaxPrice}
            setMinPrice={setMinPrice}
            setMake={setMake}
            setModel={setModel}
            setGearboxType={setGearboxType}
            displayFilters={displayFilters}
            setDisplayFilters={setDisplayFilters}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            submitSearch={submitSearch}
          />
        )}
      </div>
    </form>
  );
}

export default SearchBar;
