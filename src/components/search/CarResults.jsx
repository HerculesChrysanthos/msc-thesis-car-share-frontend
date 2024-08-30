import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiMapPin2Fill } from 'react-icons/ri';
import { FaEuroSign } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { getCarsBySearch } from '../../features/car/carSlice';
import NoCarsImg from '../../assets/car/no_cars.png';
import Spinner from '../Spinner';

function CarResults({
  selectedPin,
  setSelectedPin,
  carsPageNum,
  setCarsPageNum,
  carsLimit,
}) {
  const { searchCars, carIsLoading } = useSelector((state) => state.car);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changePageNum = (e) => {
    setCarsPageNum(e.selected + 1);

    const params = new URLSearchParams(searchParams);
    params.set('page', e.selected + 1);
    setSearchParams(params);
  };

  if (carIsLoading) return <Spinner />;

  return (
    <div className='cars-search-resutls'>
      {searchCars[0]?.searchTerms && (
        <div className='inline-filters'>
          {Object.entries(searchCars[0].searchTerms).map(
            ([filterName, filterValue]) => {
              // Skip lat, long, startDate, and endDate
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

              // Handle minPrice and maxPrice together
              if (filterName === 'minPrice' || filterName === 'maxPrice') {
                // Check if both minPrice and maxPrice exist
                const minPrice = searchCars[0].searchTerms.minPrice;
                const maxPrice = searchCars[0].searchTerms.maxPrice;

                // Display them together and only once
                if (minPrice && maxPrice && filterName === 'minPrice') {
                  return (
                    <div key='priceRange' className='filter-item'>
                      {`${minPrice}€ - ${maxPrice}€`}
                    </div>
                  );
                }
                return null; // Skip individual rendering
              }

              // Display other filters as is
              return (
                <div key={filterName} className='filter-item'>
                  {filterValue}
                </div>
              );
            }
          )}
        </div>
      )}

      {searchCars[0]?.paginatedResults.length > 0 ? (
        <div className='car-container'>
          {searchCars[0]?.paginatedResults.map((car) => (
            <div
              className={`car ${car._id === selectedPin ? 'car-selected' : ''}`}
              key={car._id}
              onClick={() => navigate(`/car/${car._id}`)}
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

      {Math.ceil(searchCars[0]?.totalCount[0]?.count / carsLimit) > 1 && (
        <ReactPaginate
          breakLabel='...'
          nextLabel={<GoChevronRight size='16px' />}
          onPageChange={changePageNum}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(searchCars[0].totalCount[0].count / carsLimit)}
          previousLabel={<GoChevronLeft size='16px' />}
          renderOnZeroPageCount={null}
          initialPage={carsPageNum - 1} // ReactPaginate is 0-indexed
        />
      )}
    </div>
  );
}

export default CarResults;
