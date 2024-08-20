import React from 'react';
import { useSelector } from 'react-redux';
import { IoStar } from 'react-icons/io5';
import { MdStarHalf } from 'react-icons/md';

function MyCarsList({ displayedCar, setDisplayedCar }) {
  const { myCars } = useSelector((state) => state.car);

  return (
    <div className='car-list'>
      {myCars.length > 0 ? (
        <>
          {myCars.map((car) => (
            <div
              key={car?._id}
              className='car'
              onClick={() => setDisplayedCar(car)}
            >
              <div className='car-img'>
                <img src={car?.thumbnail?.url} alt='Car image' />
              </div>
              <div className='car-info'>
                <h2>
                  {car?.make.name} {car?.model.name}
                </h2>
                <div className='rating'>
                  <div className='stars'>
                    <IoStar fill='#912740' size='18px' />
                    <IoStar fill='#912740' size='18px' />
                    <IoStar fill='#912740' size='18px' />
                    <IoStar fill='#912740' size='18px' />
                    <MdStarHalf fill='#912740' size='18px' />
                  </div>
                  <div className='text'>(7) Αξιολογήσεις</div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>Δεν υπάρχουν αυτοκίνητα</div>
      )}
    </div>
  );
}

export default MyCarsList;
