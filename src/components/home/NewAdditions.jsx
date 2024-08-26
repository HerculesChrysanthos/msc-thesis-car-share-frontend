import React from 'react';
import Golf from '../../assets/home/golf-placeholder.png';
import { RiMapPin2Fill } from 'react-icons/ri';
import { FaEuroSign } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';

function NewAdditions() {
  const mocData = [
    {
      img: Golf,
      title: 'Volkswagen Golf',
      distance: 1.5,
      reviews: 7,
      price: 300,
    },
    {
      img: Golf,
      title: 'Volkswagen Golf',
      distance: 1.5,
      reviews: 7,
      price: 300,
    },
    {
      img: Golf,
      title: 'Volkswagen Golf',
      distance: 1.5,
      reviews: 7,
      price: 300,
    },
    {
      img: Golf,
      title: 'Volkswagen Golf',
      distance: 1.5,
      reviews: 7,
      price: 300,
    },
  ];
  return (
    <div className='additions-container'>
      {mocData.map((addition, index) => (
        <div className='addition' key={index}>
          <div className='car-img'>
            <img src={addition.img} alt={`${addition.title} thumbnail`} />
          </div>
          <h2>{addition.title}</h2>
          <div className='distance'>
            <div className='icon'>
              <RiMapPin2Fill />
            </div>
            {addition.distance}
          </div>
          <div className='reviews'>
            <div className='icon'>
              <IoStar fill='#912740' size='18px' />
            </div>
            {addition.reviews} Αξιολογήσεις
          </div>
          <div className='price'>
            {addition.price} <FaEuroSign color={'#912740'} size='16px' />
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewAdditions;
