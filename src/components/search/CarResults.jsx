import React from 'react';
import { useSelector } from 'react-redux';
import { RiMapPin2Fill } from 'react-icons/ri';
import { FaEuroSign } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';

function CarResults() {
  const { searchCars } = useSelector((state) => state.car);

  return (
    <div className='car-container'>
      {searchCars[0]?.paginatedResults.length > 0 &&
        searchCars[0]?.paginatedResults.map((car) => (
          <div className='car' key={car._id}>
            <div className='car-img'>
              <img src={car.images[0].url} alt={`${car.title} thumbnail`} />
            </div>
            <h2>{car.title}</h2>
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
  );
}

export default CarResults;
