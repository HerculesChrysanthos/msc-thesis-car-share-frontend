import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiMapPin2Fill } from 'react-icons/ri';
import { FaEuroSign } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { getCarsBySearch } from '../../features/car/carSlice';
import NoCarsImg from '../../assets/car/no_cars.png';
import Spinner from '../Spinner';
import { CgClose } from 'react-icons/cg';

function CarResults({
  selectedPin,
  setSelectedPin,
  carsPageNum,
  setCarsPageNum,
  carsLimit,
  minPrice,
  maxPrice,
  gearboxType,
  setMinPrice,
  setMaxPrice,
  setMake,
  setModel,
  setGearboxType,
}) {
  const { searchCars, carIsLoading } = useSelector((state) => state.car);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate(); // Moved to top level
  const location = useLocation(); // Moved to top level

  const dispatch = useDispatch();

  const changePageNum = (e) => {
    setCarsPageNum(e.selected + 1);

    const params = new URLSearchParams(searchParams);
    params.set('page', e.selected + 1);
    setSearchParams(params);
  };

  function clearFilter(filterName) {
    return () => {
      const urlParams = new URLSearchParams(location.search);
      if (filterName === 'prices') {
        setMinPrice(null);
        setMaxPrice(null);

        urlParams.delete('minPrice');
        urlParams.delete('maxPrice');
      } else if (filterName === 'make') {
        setMake('');
        setModel('');

        urlParams.delete('make');
        urlParams.delete('model');
      } else if (filterName === 'model') {
        setModel('');

        urlParams.delete('model');
      } else if (filterName === 'gearboxType') {
        setGearboxType('');

        urlParams.delete('gearboxType');
      }

      const newUrl = `${location.pathname}?${urlParams.toString()}`;
      navigate(newUrl, { replace: true });
    };
  }

  const navigateToCar = (car) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const lat = queryParameters.get('lat');
    const long = queryParameters.get('long');
    const startDate = queryParameters.get('startDate');
    const endDate = queryParameters.get('endDate');

    if (!lat) return;
    if (!long) return;
    if (!startDate) return;
    if (!endDate) return;

    navigate(
      `/car/${car._id}?lat=${lat}&long=${long}&startDate=${startDate}&endDate=${endDate}`
    );
  };

  if (carIsLoading) return <Spinner />;

  return (
    <div className='cars-search-resutls'>
      {searchCars?.searchTerms && (
        <div className='inline-filters'>
          {Object.entries(searchCars?.searchTerms).map(
            ([filterName, filterValue]) => {
              if (
                [
                  'lat',
                  'long',
                  'startDate',
                  'endDate',
                  'page',
                  'limit',
                ].includes(filterName)
              ) {
                return null;
              }

              if (filterName === 'minPrice' || filterName === 'maxPrice') {
                const minPriceDefault = searchCars?.searchTerms.minPrice;
                const maxPriceDefault = searchCars?.searchTerms.maxPrice;

                if (
                  (minPrice !== minPriceDefault ||
                    maxPrice !== maxPriceDefault) &&
                  filterName === 'minPrice'
                ) {
                  return (
                    <div
                      key='priceRange'
                      className='filter-item'
                      onClick={clearFilter('prices')}
                    >
                      {`${minPrice}€ - ${maxPrice}€`} <CgClose />
                    </div>
                  );
                }
                return null;
              }

              return (
                <div
                  key={filterName}
                  className='filter-item'
                  onClick={clearFilter(filterName)}
                >
                  {filterValue} <CgClose />
                </div>
              );
            }
          )}
        </div>
      )}

      {searchCars?.totalCount > 0 ? (
        <div className='car-container'>
          {searchCars?.paginatedResults.map((car) => (
            <div
              className={`car ${car._id === selectedPin ? 'car-selected' : ''}`}
              key={car._id}
              onClick={() => navigateToCar(car)}
            >
              <div className='car-img'>
                <img src={car?.images[0]?.url} alt={`${car.title} thumbnail`} />
              </div>
              <h2>
                {car.make.name} {car.model.name}
              </h2>
              <div className='distance'>
                <div className='icon'>
                  <RiMapPin2Fill />
                </div>
                {car.distance.toFixed(2)}μ
              </div>
              <div className='reviews'>
                <div className='icon'>
                  <IoStar fill='#912740' size='18px' />
                </div>
                {car.reviews} Αξιολογήσεις
              </div>
              <div className='price'>
                {car.price} <FaEuroSign color={'#912740'} size='16px' />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='no-cars-registered'>
          <h2>Δεν βρέθηκαν αποτελέσματα</h2>
          <p>
            Μπορείς να αφαιρέσεις κάποιο φίλτρο ή να διευρύνεις την περιοχή
            αναζήτησης για να δεις περισσότερα αποτελέσματα.
          </p>
          <div className='img'>
            <img src={NoCarsImg} alt='No cars available' />
          </div>
        </div>
      )}

      {Math.ceil(searchCars?.totalCount / carsLimit) > 1 && (
        <ReactPaginate
          breakLabel='...'
          nextLabel={<GoChevronRight size='16px' />}
          onPageChange={changePageNum}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(searchCars?.totalCount / carsLimit)}
          previousLabel={<GoChevronLeft size='16px' />}
          renderOnZeroPageCount={null}
          initialPage={carsPageNum - 1} // ReactPaginate is 0-indexed
        />
      )}
    </div>
  );
}

export default CarResults;
